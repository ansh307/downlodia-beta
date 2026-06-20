import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    let buckets: { start: Date; end: Date; label: string }[] = [];

    // ✅ Monthly → group into weeks
    if (monthParam !== null && yearParam !== null) {
      const month = Number(monthParam);
      const year = Number(yearParam);

      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 1);

      let current = new Date(start);

      while (current < end) {
        const next = new Date(current);
        next.setDate(current.getDate() + 7);

        buckets.push({
          start: new Date(current),
          end: new Date(next),
          label: `${current.getDate()}-${Math.min(
            next.getDate() - 1,
            new Date(year, month + 1, 0).getDate()
          )}`,
        });

        current = next;
      }
    } else {
      // ✅ Last 7 days (keep daily)
      const days = 7;
      const today = new Date();

      for (let i = days - 1; i >= 0; i--) {
        const start = new Date();
        start.setDate(today.getDate() - i);
        start.setHours(0, 0, 0, 0);

        const end = new Date(start);
        end.setDate(start.getDate() + 1);

        buckets.push({
          start,
          end,
          label: start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        });
      }
    }

    // Fetch orders once
    const orders = await prisma.order.findMany({
      where: {
        paymentStatus: "PAID",
        createdAt: {
          gte: buckets[0].start,
        },
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    // Aggregate
    const result = buckets.map((bucket) => {
      const sales =
        orders
          .filter(
            (o) =>
              o.createdAt >= bucket.start &&
              o.createdAt < bucket.end
          )
          .reduce((sum, o) => sum + o.amount, 0) ;

      return {
        name: bucket.label,
        sales,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    );
  }
}