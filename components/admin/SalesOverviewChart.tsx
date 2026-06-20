"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesOverviewChart({ filter }: { filter: any }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const url = `/api/admin/sales?month=${filter.month}&year=${filter.year}`;

    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [filter]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#f1f5f9" vertical={false} />

          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
            tickFormatter={(v) =>
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                notation: "compact",
              }).format(v)
            }
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
            formatter={(value) => {
              if (Array.isArray(value)) {
                return [value.join(", "), "Sales"];
              }

              if (typeof value === "number") {
                return [`₹${value.toLocaleString()}`, "Sales"];
              }

              return [value ?? "", "Sales"];
            }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
