'use client'

import { useState } from 'react'
import { ExternalLink, Play, Heart, MessageCircle, Share2 } from 'lucide-react'
import type { TikTokPost } from '@/types/tiktok'

interface PostListProps {
  posts: TikTokPost[]
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function PostList({ posts }: PostListProps) {
  const [sortBy, setSortBy] = useState<'posted_at' | 'play_count' | 'like_count'>('posted_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const sortedPosts = [...posts].sort((a, b) => {
    const aVal = sortBy === 'posted_at' ? new Date(a[sortBy]).getTime() : a[sortBy]
    const bVal = sortBy === 'posted_at' ? new Date(b[sortBy]).getTime() : b[sortBy]
    return sortOrder === 'desc' ? bVal - aVal : aVal - bVal
  })

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        投稿がありません
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* ソートボタン */}
      <div className="flex gap-2">
        <button
          onClick={() => handleSort('posted_at')}
          className={`px-3 py-1 rounded text-sm ${
            sortBy === 'posted_at' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          投稿日 {sortBy === 'posted_at' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
        <button
          onClick={() => handleSort('play_count')}
          className={`px-3 py-1 rounded text-sm ${
            sortBy === 'play_count' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          再生数 {sortBy === 'play_count' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
        <button
          onClick={() => handleSort('like_count')}
          className={`px-3 py-1 rounded text-sm ${
            sortBy === 'like_count' ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          いいね {sortBy === 'like_count' && (sortOrder === 'desc' ? '↓' : '↑')}
        </button>
      </div>

      {/* 投稿一覧 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow border overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* サムネイル */}
            <div className="relative aspect-[9/16] bg-gray-100">
              {post.thumbnail_url ? (
                <img
                  src={post.thumbnail_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
              <a
                href={post.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
              >
                <Play className="w-16 h-16 text-white" fill="white" />
              </a>
            </div>

            {/* 情報 */}
            <div className="p-4 space-y-2">
              {/* 投稿者 */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm truncate">
                  @{post.author_name || 'unknown'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(post.posted_at)}
                </span>
              </div>

              {/* キャプション */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.caption || 'No caption'}
              </p>

              {/* 統計 */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  {formatNumber(post.play_count)}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {formatNumber(post.like_count)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {formatNumber(post.comment_count)}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  {formatNumber(post.share_count)}
                </span>
              </div>

              {/* ハッシュタグ */}
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.hashtags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.hashtags.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{post.hashtags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* リンク */}
              <a
                href={post.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline"
              >
                TikTokで見る <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
