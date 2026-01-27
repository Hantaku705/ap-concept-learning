import type { TikTokPost } from '@/types/tiktok'

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || ''
const RAPIDAPI_HOST = 'scraptik.p.rapidapi.com'

// RapidAPI ScrapTikのレスポンス型
interface ScrapTikVideo {
  id: string
  desc?: string
  createTime?: number
  stats?: {
    playCount?: number
    diggCount?: number
    commentCount?: number
    shareCount?: number
  }
  video?: {
    cover?: string
    playAddr?: string
  }
  author?: {
    id?: string
    uniqueId?: string
    nickname?: string
    followerCount?: number
  }
  challenges?: Array<{ title: string }>
}

interface ScrapTikResponse {
  itemList?: ScrapTikVideo[]
  items?: ScrapTikVideo[]
  hasMore?: boolean
  cursor?: string
}

// ハッシュタグで検索
export async function scrapeTikTokByHashtag(hashtag: string, count = 30): Promise<ScrapTikVideo[]> {
  const cleanHashtag = hashtag.replace(/^#/, '')

  const response = await fetch(
    `https://${RAPIDAPI_HOST}/hashtag/posts?name=${encodeURIComponent(cleanHashtag)}&count=${count}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`RapidAPI error: ${response.status} ${response.statusText}`)
  }

  const data: ScrapTikResponse = await response.json()
  return data.itemList || data.items || []
}

// キーワードで検索
export async function scrapeTikTokByKeyword(keyword: string, count = 30): Promise<ScrapTikVideo[]> {
  const response = await fetch(
    `https://${RAPIDAPI_HOST}/search/video?keyword=${encodeURIComponent(keyword)}&count=${count}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`RapidAPI error: ${response.status} ${response.statusText}`)
  }

  const data: ScrapTikResponse = await response.json()
  return data.itemList || data.items || []
}

// ScrapTikレスポンスをTikTokPost型に変換
export function convertToPost(
  item: ScrapTikVideo,
  keywordMatched: string
): Omit<TikTokPost, 'id' | 'created_at'> {
  return {
    video_id: item.id,
    video_url: `https://www.tiktok.com/@${item.author?.uniqueId || 'unknown'}/video/${item.id}`,
    thumbnail_url: item.video?.cover || null,
    caption: item.desc || null,
    play_count: item.stats?.playCount || 0,
    like_count: item.stats?.diggCount || 0,
    comment_count: item.stats?.commentCount || 0,
    share_count: item.stats?.shareCount || 0,
    author_id: item.author?.id || null,
    author_name: item.author?.nickname || item.author?.uniqueId || null,
    author_followers: item.author?.followerCount || null,
    posted_at: item.createTime
      ? new Date(item.createTime * 1000).toISOString()
      : new Date().toISOString(),
    keyword_matched: keywordMatched,
    hashtags: item.challenges?.map(c => c.title) || [],
  }
}
