/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import { prisma } from "@/lib/db";
import {
  ChevronLeft,
  CloudDownload,
  Headset,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

export default async function ProductCheckoutPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product || !product.isActive) {
    notFound();
  }

  return (
    <main className=" bg-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <Link
          href={`/product/${product.id}`}
          className="text-sm text-indigo-600 mb-10 flex gap-2 items-center"
        >
          <ChevronLeft className="w-5 h-5" /> Back to product
        </Link>

        <div className="grid lg:grid-cols-2 gap-6 ">
          {/* LEFT: Order Summary */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* Product */}
            <div className="flex gap-4 items-center">
              <img
                src={product.image || "/placeholder.png"}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-500">
                  {product.desc || "No description available"}
                </p>

                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded mt-2 inline-block">
                  Digital Product
                </span>
              </div>
            </div>

            <hr className="mt-4 text-gray-200" />

            {/* Pricing */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹{product.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Quantity</span>
                <span>× 1</span>
              </div>

              <hr className=" text-gray-200" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-indigo-600">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Trust Box */}
            <div className="mt-6 bg-indigo-50 p-4 rounded-lg text-sm text-gray-600 flex gap-2">
              <ShieldCheck className="text-indigo-600" />
              <div>
                <p className="font-medium text-indigo-600 mb-1 flex gap-2">
                  Secure Checkout
                </p>
                <p className="text-xs max-w-72">
                  Your payment information is encrypted and processed securely.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-3 text-center text-xs text-gray-400">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-indigo-50 rounded-full w-fit">
                  <CloudDownload className="text-indigo-600 w-5 h-5" />
                </div>
                <p className="text-gray-800 mt-2 font-medium">
                  Instant Download
                </p>
                <p>Access immediately after payment</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-indigo-50 rounded-full w-fit">
                  <LockKeyhole className="text-indigo-600 w-5 h-5" />
                </div>
                <p className="text-gray-800 mt-2 font-medium">Secure Payment</p>
                <p>256-bit SSL encrypted</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-indigo-50 rounded-full w-fit">
                  <Headset className="text-indigo-600 w-5 h-5" />
                </div>
                <p className="text-gray-800 mt-2 font-medium">24/7 Support</p>
                <p>We&apos;re here to help you</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Checkout Form */}
          <CheckoutForm item={product} type="product" />
        </div>
      </div>
    </main>
  );
}
