import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { TikTokPost, Keyword, ScrapeLog, DashboardStats, DailyStats } from '@/types/tiktok'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// クライアントを遅延初期化（ビルド時のエラー回避）
let _supabase: SupabaseClient | null = null

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Supabase environment variables are not configured')
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 投稿関連
export async function getPosts(options?: {
  keyword?: string
  minPlays?: number
  limit?: number
  offset?: number
}): Promise<TikTokPost[]> {
  let query = supabase
    .from('posts')
    .select('*')
    .order('posted_at', { ascending: false })

  if (options?.keyword) {
    query = query.eq('keyword_matched', options.keyword)
  }
  if (options?.minPlays) {
    query = query.gte('play_count', options.minPlays)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function upsertPost(post: Omit<TikTokPost, 'id' | 'created_at'>): Promise<TikTokPost> {
  const { data, error } = await supabase
    .from('posts')
    .upsert(post as never, { onConflict: 'video_id' })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getPostByVideoId(videoId: string): Promise<TikTokPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('video_id', videoId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// キーワード関連
export async function getKeywords(activeOnly = false): Promise<Keyword[]> {
  let query = supabase.from('keywords').select('*').order('created_at', { ascending: true })

  if (activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createKeyword(keyword: string, type: 'hashtag' | 'caption'): Promise<Keyword> {
  const { data, error } = await supabase
    .from('keywords')
    .insert({ keyword, type } as never)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateKeyword(id: string, updates: Partial<Keyword>): Promise<Keyword> {
  const { data, error } = await supabase
    .from('keywords')
    .update(updates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteKeyword(id: string): Promise<void> {
  const { error } = await supabase.from('keywords').delete().eq('id', id)
  if (error) throw error
}

// ログ関連
export async function createScrapeLog(log: Omit<ScrapeLog, 'id' | 'created_at'>): Promise<ScrapeLog> {
  const { data, error } = await supabase
    .from('scrape_logs')
    .insert(log as never)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getScrapeLogs(limit = 20): Promise<ScrapeLog[]> {
  const { data, error } = await supabase
    .from('scrape_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

// 統計関連
export async function getDashboardStats(): Promise<DashboardStats> {
  const today = new Date().toISOString().split('T')[0]

  const { data: posts, error } = await supabase.from('posts').select('*')
  if (error) throw error

  const allPosts = posts || []
  const todayPosts = allPosts.filter(p => p.posted_at?.startsWith(today))

  const totalPlays = allPosts.reduce((sum, p) => sum + (p.play_count || 0), 0)
  const totalLikes = allPosts.reduce((sum, p) => sum + (p.like_count || 0), 0)

  // トップ投稿者を集計
  const authorCounts: Record<string, number> = {}
  allPosts.forEach(p => {
    if (p.author_name) {
      authorCounts[p.author_name] = (authorCounts[p.author_name] || 0) + 1
    }
  })
  const topAuthor = Object.entries(authorCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null

  return {
    total_posts: allPosts.length,
    total_plays: totalPlays,
    total_likes: totalLikes,
    avg_engagement: allPosts.length > 0 ? totalLikes / allPosts.length : 0,
    posts_today: todayPosts.length,
    top_author: topAuthor,
  }
}

export async function getDailyStats(days = 30): Promise<DailyStats[]> {
  const { data: posts, error } = await supabase.from('posts').select('*')
  if (error) throw error

  const dailyMap: Record<string, DailyStats> = {}

  ;(posts || []).forEach(post => {
    const date = post.posted_at?.split('T')[0]
    if (!date) return

    if (!dailyMap[date]) {
      dailyMap[date] = { date, post_count: 0, total_plays: 0, total_likes: 0 }
    }
    dailyMap[date].post_count++
    dailyMap[date].total_plays += post.play_count || 0
    dailyMap[date].total_likes += post.like_count || 0
  })

  return Object.values(dailyMap)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-days)
}
