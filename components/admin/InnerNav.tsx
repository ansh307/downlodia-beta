"use client";

import { Bell } from "lucide-react";

export default function InnerNav() {
  return (
    <div className="flex items-center justify-end px-6 py-4 pr-10 bg-white border-b border-gray-200">
      {/* Right */}
      <div className="flex items-center gap-10">
        {/* <button className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-md text-sm">
          ⚡ Quick Actions
        </button> */}

        {/* <Bell className="text-gray-600" size={20} /> */}

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
            A
          </div>
          <div className="text-sm leading-tight">
            <p className="font-medium">Admin</p>
            <p className="text-gray-500 text-xs">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
