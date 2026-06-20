// app/admin/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import { getAdminSecretFromDocument } from "@/lib/admin-secret";
import { ChevronLeft, Trash } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const fetchProducts = async (pageNumber = 1) => {
    const adminSecret =
      new URLSearchParams(window.location.search).get("admin_secret") ??
      getAdminSecretFromDocument();

    if (!adminSecret) {
      setLoading(false);
      return;
    }

    const res = await fetch(
      `/api/admin/products?page=${pageNumber}&limit=10&admin_secret=${adminSecret}`,
    );

    const data = await res.json();

    setProducts(data.products);
    setTotalPages(data.totalPages);
    setPage(data.page);
    setLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchProducts(newPage);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    const adminSecret =
      new URLSearchParams(window.location.search).get("admin_secret") ??
      getAdminSecretFromDocument();

    if (!adminSecret) {
      return;
    }

    await fetch(`/api/admin/products?id=${id}&admin_secret=${adminSecret}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <p className="text-sm text-gray-500">
            Manage your digital products and inventory.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          + Add New Product
        </Link>
      </div>

      {/* Filters */}
      {/* <div className="flex items-center justify-between">
        <input
          placeholder="Search products..."
          className="w-72 px-4 py-2 border border-gray-200 rounded-lg text-sm"
        />

        <div className="flex gap-3">
          <select className="px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <select className="px-3 py-2 border border-gray-200 bg-white rounded-lg text-sm">
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div> */}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const discountedPrice =
                product.originalPrice -
                (product.originalPrice * product.discount) / 100;

              return (
                <tr
                  key={product.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Product */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    {product.imageUrl?.[0] && (
                      <img
                        src={product.imageUrl[0]}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    )}
                    <span className="font-medium text-gray-800">
                      {product.title}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-gray-700">
                    ₹{discountedPrice.toFixed(2)}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(product.createdAt).toLocaleDateString()}
                    <br />
                    <span className="text-xs">
                      {new Date(product.createdAt).toLocaleTimeString()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="px-2 py-1 text-red-500 hover:bg-red-50"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3 py-1 rounded-md text-sm ${
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
