import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();

    // Normalize "now" to end of day
    now.setHours(23, 59, 59, 999);

    // ✅ Last 30 days (current period)
    const currentStart = new Date();
    currentStart.setDate(now.getDate() - 30);
    currentStart.setHours(0, 0, 0, 0);

    // ✅ Previous 30 days
    const prevStart = new Date();
    prevStart.setDate(now.getDate() - 60);
    prevStart.setHours(0, 0, 0, 0);

    const prevEnd = new Date(currentStart);

    const [currentOrders, prevOrders, totalProducts] = await Promise.all([
      prisma.order.findMany({
        where: {
          paymentStatus: "PAID",
          createdAt: {
            gte: currentStart,
            lte: now, // ✅ important fix
          },
        },
        select: {
          amount: true,
          customerEmail: true,
        },
      }),

      prisma.order.findMany({
        where: {
          paymentStatus: "PAID",
          createdAt: {
            gte: prevStart,
            lt: prevEnd,
          },
        },
        select: {
          amount: true,
          customerEmail: true,
        },
      }),

      prisma.product.count(),
    ]);

    // 🔧 Helpers
    const sum = (orders: any[]) =>
      orders.reduce((s, o) => s + o.amount, 0);

    const uniqueCustomers = (orders: any[]) =>
      new Set(orders.map((o) => o.customerEmail)).size;

    const calcChange = (current: number, prev: number) => {
      if (prev === 0) return current > 0 ? 100 : 0;
      return ((current - prev) / prev) * 100;
    };

    // ✅ Current values
    const totalSales = sum(currentOrders);
    const totalOrders = currentOrders.length;
    const totalCustomers = uniqueCustomers(currentOrders);
    const conversionRate =
      totalProducts > 0 ? (totalOrders / totalProducts) * 100 : 0;

    // ✅ Previous values
    const prevSales = sum(prevOrders);
    const prevOrdersCount = prevOrders.length;
    const prevCustomers = uniqueCustomers(prevOrders);
    const prevConversion =
      totalProducts > 0
        ? (prevOrdersCount / totalProducts) * 100
        : 0;

        
    return NextResponse.json({
      totalSales,
      totalOrders,
      totalCustomers,
      conversionRate: conversionRate.toFixed(2),

      changes: {
        sales: calcChange(totalSales, prevSales),
        orders: calcChange(totalOrders, prevOrdersCount),
        customers: calcChange(totalCustomers, prevCustomers),
        conversion: calcChange(conversionRate, prevConversion),
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}