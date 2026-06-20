"use client";

import { useEffect, useState } from "react";

function ProductItem({ name, price, sales }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-700">{name}</p>
        <p className="text-xs text-gray-400">{sales} sales</p>
      </div>

      <p className="text-sm font-medium text-gray-800">
        ₹{price.toLocaleString()}
      </p>
    </div>
  );
}

export default function TopProducts({ filter }: { filter: any }) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/admin/top-products?month=${filter.month}&year=${filter.year}`)
      .then((res) => res.json())
      .then(setProducts);
  }, [filter]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium text-gray-800">Top Selling Products</h2>
        <button className="text-sm text-indigo-600">View all</button>
      </div>

      <div className="space-y-4">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductItem
              key={p.id}
              name={p.name}
              price={p.revenue}
              sales={p.sales}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-gray-500 text-sm">
              No products sold in this period
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try selecting a different month or year
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
