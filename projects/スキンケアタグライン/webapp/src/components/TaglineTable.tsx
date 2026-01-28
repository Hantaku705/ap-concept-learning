"use client"

import { useState, useMemo } from "react"
import {
  taglineData,
  priceCategoryColors,
  type SkincareTagline,
} from "@/data/tagline-data"

type PriceFilter = "all" | "petit" | "middle" | "luxury"
type AxisFilter = "functional" | "emotional" | "basic" | "luxury"
type SortKey = "brand" | "maker" | "priceCategory" | "price" | "tagline" | "xAxis" | "yAxis" | "taglineFC" | "catchcopyFC"
type SortDir = "asc" | "desc"

const categoryLabel = (c: SkincareTagline["priceCategory"]) =>
  c === "petit" ? "プチプラ" : c === "middle" ? "ミドル" : "デパコス"

const categoryOrder: Record<string, number> = { petit: 0, middle: 1, luxury: 2 }

const xLabel = (x: number) => x < 0 ? "成分・機能" : "体験・感性"
const yLabel = (y: number) => y <= 0 ? "ベーシック" : "ラグジュアリー"

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className={`inline-block ml-1 ${active ? "text-gray-900" : "text-gray-300"}`}>
      {active ? (dir === "asc" ? "▲" : "▼") : "▲"}
    </span>
  )
}

export default function TaglineTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all")
  const [axisFilters, setAxisFilters] = useState<Set<AxisFilter>>(new Set())
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const toggleAxisFilter = (f: AxisFilter) => {
    setAxisFilters((prev) => {
      const next = new Set(prev)
      if (next.has(f)) { next.delete(f) } else { next.add(f) }
      return next
    })
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir(key === "xAxis" || key === "yAxis" ? "desc" : "asc")
    }
  }

  const filtered = useMemo(() => {
    let data = taglineData
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      data = data.filter((d) => d.brand.toLowerCase().includes(q))
    }
    if (priceFilter !== "all") {
      data = data.filter((d) => d.priceCategory === priceFilter)
    }
    if (axisFilters.size > 0) {
      data = data.filter((d) => {
        if (axisFilters.has("functional") && d.x >= 0) return false
        if (axisFilters.has("emotional") && d.x < 0) return false
        if (axisFilters.has("basic") && d.y > 0) return false
        if (axisFilters.has("luxury") && d.y <= 0) return false
        return true
      })
    }
    return data
  }, [searchQuery, priceFilter, axisFilters])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case "brand": cmp = a.brand.localeCompare(b.brand, "ja"); break
        case "maker": cmp = a.maker.localeCompare(b.maker, "ja"); break
        case "priceCategory": cmp = categoryOrder[a.priceCategory] - categoryOrder[b.priceCategory]; break
        case "price": cmp = a.price - b.price; break
        case "tagline": cmp = a.tagline.localeCompare(b.tagline, "ja"); break
        case "xAxis": cmp = a.x - b.x; break
        case "yAxis": cmp = a.y - b.y; break
        case "taglineFC": cmp = (a.taglineFC ? 1 : 0) - (b.taglineFC ? 1 : 0); break
        case "catchcopyFC": cmp = ((a.catchcopyFC ?? false) ? 1 : 0) - ((b.catchcopyFC ?? false) ? 1 : 0); break
      }
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const priceFilters: { label: string; value: PriceFilter }[] = [
    { label: "すべて", value: "all" },
    { label: "プチプラ", value: "petit" },
    { label: "ミドル", value: "middle" },
    { label: "デパコス", value: "luxury" },
  ]

  const axisOptions: { label: string; value: AxisFilter }[] = [
    { label: "成分・機能訴求", value: "functional" },
    { label: "体験・感性訴求", value: "emotional" },
    { label: "ベーシック", value: "basic" },
    { label: "ラグジュアリー", value: "luxury" },
  ]

  const thClass = "py-2 px-3 font-medium text-gray-500 cursor-pointer select-none hover:text-gray-700 transition-colors"

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ブランド名で検索..."
          className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
      </div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {priceFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setPriceFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              priceFilter === f.value
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {axisOptions.map((f) => (
          <button
            key={f.value}
            onClick={() => toggleAxisFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              axisFilters.has(f.value)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-500 border-gray-300 hover:border-gray-400"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="text-xs text-gray-400 ml-2">{sorted.length}件</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className={`text-left ${thClass}`} onClick={() => handleSort("brand")}>
                ブランド<SortIcon active={sortKey === "brand"} dir={sortDir} />
              </th>
              <th className={`text-left ${thClass}`} onClick={() => handleSort("maker")}>
                メーカー<SortIcon active={sortKey === "maker"} dir={sortDir} />
              </th>
              <th className={`text-left ${thClass}`} onClick={() => handleSort("priceCategory")}>
                価格帯<SortIcon active={sortKey === "priceCategory"} dir={sortDir} />
              </th>
              <th className={`text-right ${thClass}`} onClick={() => handleSort("price")}>
                価格<SortIcon active={sortKey === "price"} dir={sortDir} />
              </th>
              <th className="text-left py-2 px-3 font-medium text-gray-500">キャッチコピー</th>
              <th className={`text-left ${thClass}`} onClick={() => handleSort("tagline")}>
                タグライン<SortIcon active={sortKey === "tagline"} dir={sortDir} />
              </th>
              <th className={`text-center ${thClass}`} onClick={() => handleSort("xAxis")}>
                訴求軸<SortIcon active={sortKey === "xAxis"} dir={sortDir} />
              </th>
              <th className={`text-center ${thClass}`} onClick={() => handleSort("yAxis")}>
                世界観<SortIcon active={sortKey === "yAxis"} dir={sortDir} />
              </th>
              <th className={`text-center ${thClass}`} onClick={() => handleSort("catchcopyFC")}>
                CC<SortIcon active={sortKey === "catchcopyFC"} dir={sortDir} />
              </th>
              <th className={`text-center ${thClass}`} onClick={() => handleSort("taglineFC")}>
                TL<SortIcon active={sortKey === "taglineFC"} dir={sortDir} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((d) => (
              <tr key={d.brand} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-3 font-medium">
                  {d.url ? (
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                      {d.brand}
                    </a>
                  ) : d.brand}
                </td>
                <td className="py-2 px-3 text-gray-600">{d.maker}</td>
                <td className="py-2 px-3">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${priceCategoryColors[d.priceCategory]}15`,
                      color: priceCategoryColors[d.priceCategory],
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: priceCategoryColors[d.priceCategory] }}
                    />
                    {categoryLabel(d.priceCategory)}
                  </span>
                </td>
                <td className="py-2 px-3 text-right text-gray-600">
                  {d.price.toLocaleString()}円
                </td>
                <td className="py-2 px-3 text-gray-500 text-xs">
                  {d.catchcopy || <span className="text-gray-300">-</span>}
                </td>
                <td className="py-2 px-3 text-gray-800 italic">{d.tagline}</td>
                <td className="py-2 px-3 text-center">
                  <span className="text-xs text-gray-500 whitespace-nowrap">{xLabel(d.x)} ({d.x > 0 ? `+${d.x}` : d.x})</span>
                </td>
                <td className="py-2 px-3 text-center">
                  <span className="text-xs text-gray-500 whitespace-nowrap">{yLabel(d.y)} ({d.y > 0 ? `+${d.y}` : d.y})</span>
                </td>
                <td className="py-2 px-3 text-center">
                  {d.catchcopy ? (
                    d.catchcopyFC ? (
                      d.catchcopySourceUrl ? (
                        <a href={d.catchcopySourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs hover:bg-green-200 transition-colors" title="キャッチコピーFC済み（クリックでソースへ）">&#10003;</a>
                      ) : (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs" title="キャッチコピーFC済み">&#10003;</span>
                      )
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-100 text-yellow-500 text-xs" title="未検証">?</span>
                    )
                  ) : (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-300 text-xs" title="キャッチコピーなし">-</span>
                  )}
                </td>
                <td className="py-2 px-3 text-center">
                  {d.taglineFC ? (
                    d.taglineSourceUrl ? (
                      <a href={d.taglineSourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs hover:bg-green-200 transition-colors" title="タグラインFC済み（クリックでソースへ）">&#10003;</a>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 text-xs" title="タグラインFC済み">&#10003;</span>
                    )
                  ) : (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-xs" title="未確認">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
