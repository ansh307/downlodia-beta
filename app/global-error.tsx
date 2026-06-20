"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-white text-black">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            {/* Title */}
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">
              Something went wrong
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              An unexpected error occurred. Please try again or refresh the
              page.
            </p>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Refresh
              </button>
            </div>

            {/* Debug (optional in dev) */}
            {process.env.NODE_ENV === "development" && (
              <pre className="mt-6 text-left text-xs text-red-500 bg-gray-100 p-3 rounded">
                {error.message}
              </pre>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
