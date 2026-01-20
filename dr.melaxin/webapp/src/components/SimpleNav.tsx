"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { strategyMeta } from "@/data/strategy-data";

export default function SimpleNav() {
  const pathname = usePathname();

  const isMediaPlanPage = pathname === "/mediaplan";
  const isStrategyPage = pathname === "/strategy";
  const isHomePage = pathname === "/";

  return (
    <nav className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-200 overflow-y-auto z-50">
      <div className="p-5">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="block">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">
                $10M
              </span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 hover:text-sky-600 transition-colors">
              {strategyMeta.brand}
            </h1>
            <p className="text-xs text-gray-500">マーケティング提案書</p>
          </Link>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          {/* Home */}
          <Link
            href="/"
            className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${
              isHomePage
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            Home
          </Link>

          {/* Strategy */}
          <Link
            href="/strategy"
            className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${
              isStrategyPage
                ? "bg-sky-100 text-sky-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Strategy
          </Link>

          {/* Media Plan */}
          <Link
            href="/mediaplan"
            className={`block px-3 py-2.5 text-sm rounded-lg transition-colors ${
              isMediaPlanPage
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Media Plan
          </Link>

          {/* Other pages */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            <p className="px-3 py-1 text-xs font-medium text-gray-400 uppercase">
              Other
            </p>
            <Link
              href="/research"
              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                pathname === "/research"
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              Research
            </Link>
            <Link
              href="/dashboard"
              className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                pathname === "/dashboard"
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">年間目標</p>
            <div className="space-y-1">
              <p>
                <span className="text-gray-400">GMV:</span>{" "}
                <span className="text-sky-600 font-semibold">{strategyMeta.targetGmv}</span>
              </p>
              <p>
                <span className="text-gray-400">投資:</span>{" "}
                <span className="font-medium">{strategyMeta.budget}</span>
              </p>
              <p>
                <span className="text-gray-400">ROAS:</span>{" "}
                <span className="font-medium text-emerald-600">{strategyMeta.roas}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
