"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminSecretCookie } from "@/lib/admin-secret";

export default function AdminAccess() {
  const [secret, setSecret] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSecret = secret.trim();

    if (trimmedSecret) {
      setAdminSecretCookie(trimmedSecret);
      router.replace("/admin/products");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter admin secret key"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Access Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}
