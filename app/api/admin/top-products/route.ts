import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    let dateFilter: any = {};

    // ✅ Apply month/year filter
    if (monthParam !== null && yearParam !== null) {
      const month = Number(monthParam);
      const year = Number(yearParam);

      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 1);

      dateFilter = {
        createdAt: {
          gte: start,
          lt: end,
        },
      };
    }

    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        orders: {
          where: {
            paymentStatus: "PAID",
            ...dateFilter,
          },
          select: {
            amount: true,
          },
        },
      },
    });

    const result = products
      .map((product) => {
        const totalSales = product.orders.length;

        const revenue =
          product.orders.reduce(
            (sum, order) => sum + order.amount,
            0
          );

        return {
          id: product.id,
          name: product.title,
          image: product.image,
          sales: totalSales,
          revenue,
        };
      })
      .filter((p) => p.sales > 0) // remove unsold products
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch top products" },
      { status: 500 }
    );
  }
}