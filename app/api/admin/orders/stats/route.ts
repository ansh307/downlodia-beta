import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();

    // Current 30 days
    const currentStart = new Date();
    currentStart.setDate(now.getDate() - 30);

    // Previous 30 days
    const prevStart = new Date();
    prevStart.setDate(now.getDate() - 60);

    const prevEnd = currentStart;

    const [currentOrders, prevOrders] = await Promise.all([
      prisma.order.findMany({
        where: {
          createdAt: { gte: currentStart },
        },
      }),
      prisma.order.findMany({
        where: {
          createdAt: {
            gte: prevStart,
            lt: prevEnd,
          },
        },
      }),
    ]);

    // Helper
    const calcChange = (current: number, prev: number) => {
      if (prev === 0) return current > 0 ? 100 : 0;
      return ((current - prev) / prev) * 100;
    };

    const stats = {
      total: {
        value: currentOrders.length,
        change: calcChange(currentOrders.length, prevOrders.length),
      },
      completed: {
        value: currentOrders.filter(o => o.paymentStatus === "PAID").length,
        change: calcChange(
          currentOrders.filter(o => o.paymentStatus === "PAID").length,
          prevOrders.filter(o => o.paymentStatus === "PAID").length
        ),
      },
      pending: {
        value: currentOrders.filter(o => o.paymentStatus === "PENDING").length,
        change: calcChange(
          currentOrders.filter(o => o.paymentStatus === "PENDING").length,
          prevOrders.filter(o => o.paymentStatus === "PENDING").length
        ),
      },
      cancelled: {
        value: currentOrders.filter(o => o.paymentStatus === "FAILED").length,
        change: calcChange(
          currentOrders.filter(o => o.paymentStatus === "FAILED").length,
          prevOrders.filter(o => o.paymentStatus === "FAILED").length
        ),
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}