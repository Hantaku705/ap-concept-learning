import { ApifyClient } from 'apify-client'
import type { ApifyTikTokItem, TikTokPost } from '@/types/tiktok'

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
})

// ハッシュタグでスクレイピング
export async function scrapeTikTokByHashtag(hashtag: string, resultsLimit = 100): Promise<ApifyTikTokItem[]> {
  // #を除去
  const cleanHashtag = hashtag.replace(/^#/, '')

  const input = {
    hashtags: [cleanHashtag],
    resultsPerPage: resultsLimit,
  }

  try {
    const run = await client.actor('clockworks/tiktok-hashtag-scraper').call(input)
    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    return items as unknown as ApifyTikTokItem[]
  } catch (error) {
    console.error('Apify scraping failed:', error)
    throw error
  }
}

// キーワード検索でスクレイピング（キャプション検索）
export async function scrapeTikTokByKeyword(keyword: string, resultsLimit = 100): Promise<ApifyTikTokItem[]> {
  const input = {
    searchQueries: [keyword],
    resultsPerPage: resultsLimit,
  }

  try {
    const run = await client.actor('clockworks/tiktok-scraper').call(input)
    const { items } = await client.dataset(run.defaultDatasetId).listItems()
    return items as unknown as ApifyTikTokItem[]
  } catch (error) {
    console.error('Apify keyword search failed:', error)
    throw error
  }
}

// ApifyレスポンスをTikTokPost型に変換
export function convertApifyItemToPost(
  item: ApifyTikTokItem,
  keywordMatched: string
): Omit<TikTokPost, 'id' | 'created_at'> {
  return {
    video_id: item.id,
    video_url: item.webVideoUrl || `https://www.tiktok.com/@${item.authorMeta?.name}/video/${item.id}`,
    thumbnail_url: item.covers?.[0] || null,
    caption: item.desc || null,
    play_count: item.playCount || 0,
    like_count: item.diggCount || 0,
    comment_count: item.commentCount || 0,
    share_count: item.shareCount || 0,
    author_id: item.authorMeta?.id || null,
    author_name: item.authorMeta?.nickName || item.authorMeta?.name || null,
    author_followers: item.authorMeta?.fans || null,
    posted_at: item.createTime
      ? new Date(item.createTime * 1000).toISOString()
      : new Date().toISOString(),
    keyword_matched: keywordMatched,
    hashtags: item.hashtags?.map(h => h.name) || [],
  }
}
