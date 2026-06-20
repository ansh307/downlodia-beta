"use client";

import { DateFilter } from "@/components/admin/DateFilter";
import SalesOverviewChart from "@/components/admin/SalesOverviewChart";
import StatsSection from "@/components/admin/StatsSection";
import TopProducts from "@/components/admin/TopProducts";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [filter, setFilter] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Date */}
        <DateFilter onChange={setFilter} />
      </div>

      {/* Stats */}
      <StatsSection />

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-4">
        {/* Sales Overview */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-gray-800">Sales Overview</h2>
          </div>

          <SalesOverviewChart filter={filter} />
        </div>

        {/* Top Products */}
        <TopProducts filter={filter} />
      </div>
    </div>
  );
}
