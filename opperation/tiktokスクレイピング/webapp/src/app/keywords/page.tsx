'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Hash, Search, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react'
import type { Keyword, ScrapeLog } from '@/types/tiktok'

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [logs, setLogs] = useState<ScrapeLog[]>([])
  const [newKeyword, setNewKeyword] = useState('')
  const [keywordType, setKeywordType] = useState<'hashtag' | 'caption'>('hashtag')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [keywordsRes, logsRes] = await Promise.all([
        fetch('/api/keywords'),
        fetch('/api/stats?type=logs&limit=10'),
      ])
      const [keywordsData, logsData] = await Promise.all([
        keywordsRes.json(),
        logsRes.json(),
      ])
      setKeywords(keywordsData.keywords || [])
      setLogs(logsData.logs || [])
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd = async () => {
    if (!newKeyword.trim()) return

    setAdding(true)
    try {
      const response = await fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: newKeyword.trim(),
          type: keywordType,
        }),
      })

      if (response.ok) {
        setNewKeyword('')
        await fetchData()
      }
    } catch (error) {
      console.error('Failed to add keyword:', error)
    } finally {
      setAdding(false)
    }
  }

  const handleToggle = async (id: string, currentActive: boolean) => {
    try {
      await fetch('/api/keywords', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentActive }),
      })
      await fetchData()
    } catch (error) {
      console.error('Failed to toggle keyword:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('このキーワードを削除しますか？')) return

    try {
      await fetch(`/api/keywords?id=${id}`, { method: 'DELETE' })
      await fetchData()
    } catch (error) {
      console.error('Failed to delete keyword:', error)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">キーワード管理</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* キーワード追加 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-4">新規キーワード追加</h2>
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setKeywordType('hashtag')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
                  keywordType === 'hashtag'
                    ? 'bg-pink-50 border-pink-500 text-pink-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Hash className="w-4 h-4" />
                ハッシュタグ
              </button>
              <button
                onClick={() => setKeywordType('caption')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
                  keywordType === 'caption'
                    ? 'bg-pink-50 border-pink-500 text-pink-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Search className="w-4 h-4" />
                キャプション検索
              </button>
            </div>
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder={keywordType === 'hashtag' ? '#アスタリフト' : 'アスタリフト'}
              className="flex-1 px-4 py-2 border rounded-lg min-w-[200px]"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <button
              onClick={handleAdd}
              disabled={adding || !newKeyword.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              追加
            </button>
          </div>
        </div>

        {/* キーワード一覧 */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold">登録済みキーワード</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-gray-400" />
            </div>
          ) : keywords.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              キーワードが登録されていません
            </div>
          ) : (
            <div className="divide-y">
              {keywords.map((kw) => (
                <div key={kw.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded ${
                        kw.type === 'hashtag' ? 'bg-pink-100' : 'bg-blue-100'
                      }`}
                    >
                      {kw.type === 'hashtag' ? (
                        <Hash className="w-4 h-4 text-pink-600" />
                      ) : (
                        <Search className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium">{kw.keyword}</span>
                      <span className="ml-2 text-xs text-gray-400">
                        {kw.type === 'hashtag' ? 'ハッシュタグ' : 'キャプション'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(kw.id, kw.is_active)}
                      className={`p-2 rounded ${
                        kw.is_active ? 'text-green-500' : 'text-gray-400'
                      }`}
                      title={kw.is_active ? '有効' : '無効'}
                    >
                      {kw.is_active ? (
                        <ToggleRight className="w-6 h-6" />
                      ) : (
                        <ToggleLeft className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(kw.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 最近のログ */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold">最近の取得ログ</h2>
          </div>

          {logs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              ログがありません
            </div>
          ) : (
            <div className="divide-y">
              {logs.map((log) => (
                <div key={log.id} className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-medium">{log.keyword}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {formatDate(log.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {log.status === 'success' ? (
                      <>
                        <span className="text-sm text-gray-500">
                          {log.posts_found}件取得 / {log.posts_new}件新規
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          成功
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-red-500 truncate max-w-[200px]">
                          {log.error_message}
                        </span>
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                          エラー
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
