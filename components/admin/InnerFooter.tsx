import Link from "next/link";

export default function InnerFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-3 h-14 bg-white border-t border-gray-200 text-sm text-gray-500 flex items-center justify-between">
      <p>© {currentYear} downlodia.in. All rights reserved.</p>

      {/* SHAKDBEE CREDIT */}
      <div className="relative group inline-block">
        {/* LINK */}
        <Link
          href="https://www.shakdbee.com/"
          target="_blank"
          className="transition-colors text-sm text-gray-500 hover:text-gray-600 hover:underline"
        >
          Crafted with precision by{" "}
          <span className="font-semibold text-gray-600">Shakdbee</span>
        </Link>

        {/* HOVER CARD */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-4 text-left">
            {/* Title */}
            <p className="text-sm font-semibold text-gray-900 mb-1">Shakdbee</p>

            {/* Description */}
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Premium web design & development studio crafting modern,
              high-performing digital experiences.
            </p>
          </div>

          {/* Arrow */}
          <div className="w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45 absolute left-1/2 -translate-x-1/2 top-full -mt-1"></div>
        </div>
      </div>
    </footer>
  );
}
