'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { RefreshCw, Settings, Hash } from 'lucide-react'
import StatsCards from '@/components/StatsCards'
import PostList from '@/components/PostList'
import TrendChart from '@/components/TrendChart'
import TopPosts from '@/components/TopPosts'
import type { TikTokPost, DashboardStats, DailyStats, Keyword } from '@/types/tiktok'

type Tab = 'posts' | 'trends' | 'ranking'

export default function Dashboard() {
  const [posts, setPosts] = useState<TikTokPost[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [selectedKeyword, setSelectedKeyword] = useState<string>('')
  const [activeTab, setActiveTab] = useState<Tab>('posts')
  const [loading, setLoading] = useState(true)
  const [scraping, setScraping] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [postsRes, statsRes, dailyRes, keywordsRes] = await Promise.all([
        fetch(`/api/posts?limit=100${selectedKeyword ? `&keyword=${selectedKeyword}` : ''}`),
        fetch('/api/stats?type=dashboard'),
        fetch('/api/stats?type=daily&days=30'),
        fetch('/api/keywords'),
      ])

      const [postsData, statsData, dailyData, keywordsData] = await Promise.all([
        postsRes.json(),
        statsRes.json(),
        dailyRes.json(),
        keywordsRes.json(),
      ])

      setPosts(postsData.posts || [])
      setStats(statsData.stats || null)
      setDailyStats(dailyData.dailyStats || [])
      setKeywords(keywordsData.keywords || [])
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedKeyword])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleScrape = async () => {
    setScraping(true)
    try {
      const response = await fetch('/api/scrape', { method: 'GET' })
      const result = await response.json()
      console.log('Scrape result:', result)
      await fetchData()
    } catch (error) {
      console.error('Scrape failed:', error)
    } finally {
      setScraping(false)
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'posts', label: '投稿一覧' },
    { id: 'trends', label: 'トレンド' },
    { id: 'ranking', label: 'ランキング' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hash className="w-8 h-8 text-pink-500" />
            <h1 className="text-xl font-bold">TikTok監視ダッシュボード</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleScrape}
              disabled={scraping}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${scraping ? 'animate-spin' : ''}`} />
              {scraping ? '取得中...' : '今すぐ取得'}
            </button>
            <Link
              href="/keywords"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Settings className="w-4 h-4" />
              キーワード管理
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 統計カード */}
        {stats && <StatsCards stats={stats} />}

        {/* フィルター */}
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm text-gray-600">キーワード:</label>
          <select
            value={selectedKeyword}
            onChange={(e) => setSelectedKeyword(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">すべて</option>
            {keywords.map((kw) => (
              <option key={kw.id} value={kw.keyword}>
                {kw.keyword}
              </option>
            ))}
          </select>
        </div>

        {/* タブ */}
        <div className="flex gap-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-pink-500 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* コンテンツ */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400" />
            <p className="mt-2 text-gray-500">読み込み中...</p>
          </div>
        ) : (
          <>
            {activeTab === 'posts' && <PostList posts={posts} />}
            {activeTab === 'trends' && <TrendChart data={dailyStats} />}
            {activeTab === 'ranking' && (
              <div className="grid md:grid-cols-2 gap-6">
                <TopPosts posts={posts} type="plays" />
                <TopPosts posts={posts} type="likes" />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
