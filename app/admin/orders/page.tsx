// app/admin/orders/page.tsx
"use client";
import { useEffect, useState } from "react";
import { getAdminSecretFromDocument } from "@/lib/admin-secret";
import {
  ChevronLeft,
  Clock,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  X,
} from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  paymentStatus: string;
  createdAt: string;
  customerMobile: string;
  product: {
    title: string;
  };
  bundle: {
    title: string;
  };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  console.log(orders);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchOrders(1);
  }, []);

  useEffect(() => {
    fetch("/api/admin/orders/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  const fetchOrders = async (pageNumber = 1) => {
    const adminSecret =
      new URLSearchParams(window.location.search).get("admin_secret") ??
      getAdminSecretFromDocument();

    if (!adminSecret) {
      setLoading(false);
      return;
    }

    const res = await fetch(
      `/api/admin/orders?page=${pageNumber}&limit=10&admin_secret=${adminSecret}`,
    );

    const data = await res.json();

    setOrders(data.orders);
    setPage(data.page);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchOrders(newPage);
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
        <p className="text-sm text-gray-500">
          Manage and track customer orders.
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="Total Orders"
            value={stats.total.value}
            change={stats.total.change}
            icon={<ShoppingBag />}
            color="bg-indigo-100 text-indigo-600"
            days={30}
          />

          <StatCard
            title="Completed"
            value={stats.completed.value}
            change={stats.completed.change}
            icon={<TrendingUp />}
            color="bg-green-100 text-green-600"
            days={30}
          />

          <StatCard
            title="Pending"
            value={stats.pending.value}
            change={stats.pending.change}
            icon={<Clock />}
            color="bg-yellow-100 text-yellow-600"
            days={30}
          />

          <StatCard
            title="Cancelled"
            value={stats.cancelled.value}
            change={stats.cancelled.change}
            icon={<X />}
            color="bg-red-100 text-red-600"
            days={30}
          />
        </div>
      )}

      {/* Filters */}
      {/* <div className="flex items-center justify-between">
        <input
          placeholder="Search by order ID, customer or email..."
          className="w-80 px-4 py-2 border border-gray-200 rounded-lg text-sm"
        />

        <div className="flex gap-3">
          <select className="px-3 py-2 border rounded-lg text-sm">
            <option>All Status</option>
            <option>PAID</option>
            <option>PENDING</option>
            <option>FAILED</option>
          </select>

          <button className="px-3 py-2 border rounded-lg text-sm">
            Filters
          </button>
        </div>
      </div> */}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Number</th>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
              {/* <th className="px-6 py-3 text-right">Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Order ID */}
                <td className="px-6 py-4 font-medium text-indigo-600">
                  #{order.id.slice(-6)}
                </td>

                {/* Customer */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium">
                    {order.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-medium">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.customerEmail}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">{order.customerMobile}</td>

                {/* Product */}
                <td className="px-6 py-4 text-gray-700">
                  {order?.product?.title || order?.bundle?.title}
                </td>

                {/* Amount */}
                <td className="px-6 py-4 text-gray-800 font-medium">
                  ₹{order.amount.toLocaleString()}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                  <br />
                  <span className="text-xs">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </span>
                </td>

                {/* Actions */}
                {/* <td className="px-6 py-4 text-right">
                  <button className="px-2 py-1 border rounded-md hover:bg-gray-100">
                    ⋮
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {orders.length === 0 && (
          <div className="text-center py-10 text-sm text-gray-500">
            No orders found
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 text-sm text-gray-500">
          <span>
            Page {page} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded-full disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {Array.from({
              length: totalPages === 0 ? totalPages + 1 : totalPages,
            }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3 py-1 rounded-md ${
                    page === p
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-300"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded-full disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, color, days }: any) {
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
          <span className="text-gray-400 text-xs ml-1">
            vs last {days} days
          </span>
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
