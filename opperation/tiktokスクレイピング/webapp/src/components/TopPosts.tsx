'use client'

import { Play, Heart, Crown, ExternalLink } from 'lucide-react'
import type { TikTokPost } from '@/types/tiktok'

interface TopPostsProps {
  posts: TikTokPost[]
  type: 'plays' | 'likes'
  limit?: number
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export default function TopPosts({ posts, type, limit = 10 }: TopPostsProps) {
  const sortedPosts = [...posts]
    .sort((a, b) => {
      return type === 'plays'
        ? b.play_count - a.play_count
        : b.like_count - a.like_count
    })
    .slice(0, limit)

  if (sortedPosts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        投稿がありません
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex items-center gap-2">
        <Crown className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold">
          {type === 'plays' ? '再生数' : 'いいね数'}ランキング TOP{limit}
        </h3>
      </div>
      <div className="divide-y">
        {sortedPosts.map((post, index) => (
          <div key={post.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
            {/* ランク */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0
                  ? 'bg-yellow-400 text-white'
                  : index === 1
                  ? 'bg-gray-300 text-white'
                  : index === 2
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {index + 1}
            </div>

            {/* サムネイル */}
            <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
              {post.thumbnail_url ? (
                <img
                  src={post.thumbnail_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                  No Image
                </div>
              )}
            </div>

            {/* 情報 */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                @{post.author_name || 'unknown'}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {post.caption || 'No caption'}
              </p>
              <div className="flex items-center gap-4 mt-1 text-sm">
                <span className="flex items-center gap-1 text-blue-500">
                  <Play className="w-4 h-4" />
                  {formatNumber(post.play_count)}
                </span>
                <span className="flex items-center gap-1 text-rose-500">
                  <Heart className="w-4 h-4" />
                  {formatNumber(post.like_count)}
                </span>
              </div>
            </div>

            {/* リンク */}
            <a
              href={post.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-blue-500"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
