import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        {/* 404 */}
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-black mb-2">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go Home
          </Link>

          {/* <button
            onClick={() => history.back()}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Go Back
          </button> */}
        </div>
      </div>
    </div>
  );
}
