// TikTok投稿データ型
export interface TikTokPost {
  id: string
  video_id: string
  video_url: string
  thumbnail_url: string | null
  caption: string | null
  play_count: number
  like_count: number
  comment_count: number
  share_count: number
  author_id: string | null
  author_name: string | null
  author_followers: number | null
  posted_at: string
  keyword_matched: string
  hashtags: string[]
  created_at: string
}

// キーワード型
export interface Keyword {
  id: string
  keyword: string
  type: 'hashtag' | 'caption'
  is_active: boolean
  created_at: string
}

// スクレイプログ型
export interface ScrapeLog {
  id: string
  keyword: string
  status: 'success' | 'error'
  posts_found: number
  posts_new: number
  error_message: string | null
  created_at: string
}

// Apifyレスポンス型
export interface ApifyTikTokItem {
  id: string
  webVideoUrl: string
  covers?: string[]
  desc?: string
  playCount?: number
  diggCount?: number
  commentCount?: number
  shareCount?: number
  authorMeta?: {
    id?: string
    name?: string
    nickName?: string
    fans?: number
  }
  createTime?: number
  hashtags?: Array<{ name: string }>
}

// ダッシュボード統計型
export interface DashboardStats {
  total_posts: number
  total_plays: number
  total_likes: number
  avg_engagement: number
  posts_today: number
  top_author: string | null
}

// 日別統計型
export interface DailyStats {
  date: string
  post_count: number
  total_plays: number
  total_likes: number
}
