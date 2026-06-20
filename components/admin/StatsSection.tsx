"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

export default function StatsSection() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/admin/dashboard-stats`)
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard
        title="Total Sales"
        value={`₹${stats.totalSales.toLocaleString()}`}
        change={stats.changes.sales}
        icon={<DollarSign />}
        color="bg-indigo-100 text-indigo-600"
      />

      <StatCard
        title="Total Orders"
        value={stats.totalOrders}
        change={stats.changes.orders}
        icon={<ShoppingCart />}
        color="bg-indigo-100 text-indigo-600"
      />

      <StatCard
        title="Total Customers"
        value={stats.totalCustomers}
        change={stats.changes.customers}
        icon={<Users />}
        color="bg-green-100 text-green-600"
      />

      <StatCard
        title="Conversion Rate"
        value={`${stats.conversionRate}%`}
        change={stats.changes.conversion}
        icon={<TrendingUp />}
        color="bg-orange-100 text-orange-600"
      />
    </div>
  );
}

function StatCard({ title, value, change, icon, color }: any) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h3 className="text-xl font-semibold text-gray-800">{value}</h3>

        <p
          className={`text-sm mt-1 ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(1)}%
          <span className="text-gray-400 text-xs ml-1">vs last 30 days</span>
        </p>
      </div>

      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
    </div>
  );
}
