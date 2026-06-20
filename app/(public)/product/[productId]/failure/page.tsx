import Link from "next/link";

export default async function FailurePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params; // ✅ FIX
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-red-50 px-6">
      <div className="text-center max-w-xl w-full">
        {/* Error Icon */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="relative bg-red-500 text-white w-20 h-20 flex items-center justify-center rounded-full text-3xl ">
            ✕
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Payment Failed
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-6">
          Something went wrong while processing your payment.
        </p>

        {/* Reason */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            This could be due to a network issue, insufficient balance, or the
            payment was cancelled. Please try again.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href={`/product/${productId}/checkout`}
            className="bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Try Again
          </Link>

          <Link
            href="/all-products"
            className="border border-gray-200 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Browse Products
          </Link>
        </div>

        {/* Help */}
        <p className="text-xs text-gray-400 mt-6">
          If the issue persists, please contact support.
        </p>
      </div>
    </div>
  );
}
