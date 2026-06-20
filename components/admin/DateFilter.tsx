"use client";

import { useState } from "react";

export function DateFilter({ onChange }: any) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleChange = (m: number, y: number) => {
    setMonth(m);
    setYear(y);
    onChange({ month: m, year: y });
  };

  return (
    <div className="flex gap-2">
      <select
        value={month}
        onChange={(e) => handleChange(Number(e.target.value), year)}
        className="px-3 py-2 border border-gray-200 bg-white rounded-md text-sm"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <option key={i} value={i}>
            {new Date(0, i).toLocaleString("default", {
              month: "short",
            })}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => handleChange(month, Number(e.target.value))}
        className="px-3 py-2 border bg-white border-gray-200 rounded-md text-sm"
      >
        {[2024, 2025, 2026].map((y) => (
          <option key={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
