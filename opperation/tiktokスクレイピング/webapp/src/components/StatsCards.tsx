'use client'

import { Play, Heart, FileText, TrendingUp, User, Calendar } from 'lucide-react'
import type { DashboardStats } from '@/types/tiktok'

interface StatsCardsProps {
  stats: DashboardStats
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toFixed(0)
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: '総投稿数',
      value: formatNumber(stats.total_posts),
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      title: '総再生数',
      value: formatNumber(stats.total_plays),
      icon: Play,
      color: 'bg-green-500',
    },
    {
      title: '総いいね数',
      value: formatNumber(stats.total_likes),
      icon: Heart,
      color: 'bg-rose-500',
    },
    {
      title: '平均エンゲージメント',
      value: formatNumber(stats.avg_engagement),
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: '今日の投稿',
      value: formatNumber(stats.posts_today),
      icon: Calendar,
      color: 'bg-orange-500',
    },
    {
      title: 'トップ投稿者',
      value: stats.top_author || '-',
      icon: User,
      color: 'bg-cyan-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-lg shadow p-4 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded ${card.color}`}>
              <card.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-500">{card.title}</span>
          </div>
          <span className="text-2xl font-bold truncate" title={card.value}>
            {card.value}
          </span>
        </div>
      ))}
    </div>
  )
}
