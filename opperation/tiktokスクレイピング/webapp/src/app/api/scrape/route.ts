import { NextResponse } from 'next/server'
import { scrapeTikTokByHashtag, scrapeTikTokByKeyword, convertToPost } from '@/lib/tiktok-api'
import { getKeywords, upsertPost, getPostByVideoId, createScrapeLog } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { keyword, type } = await request.json()

    if (!keyword) {
      return NextResponse.json({ error: 'keyword is required' }, { status: 400 })
    }

    // スクレイピング実行
    const items = type === 'caption'
      ? await scrapeTikTokByKeyword(keyword)
      : await scrapeTikTokByHashtag(keyword)

    let newPosts = 0

    // 各アイテムをDBに保存
    for (const item of items) {
      const existing = await getPostByVideoId(item.id)
      if (!existing) {
        const postData = convertToPost(item, keyword)
        await upsertPost(postData)
        newPosts++
      }
    }

    // ログ記録
    await createScrapeLog({
      keyword,
      status: 'success',
      posts_found: items.length,
      posts_new: newPosts,
      error_message: null,
    })

    return NextResponse.json({
      success: true,
      keyword,
      posts_found: items.length,
      posts_new: newPosts,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // エラーログ記録
    try {
      const body = await request.clone().json()
      await createScrapeLog({
        keyword: body.keyword || 'unknown',
        status: 'error',
        posts_found: 0,
        posts_new: 0,
        error_message: errorMessage,
      })
    } catch {
      // ログ記録失敗は無視
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// 全アクティブキーワードをスクレイピング
export async function GET() {
  try {
    const keywords = await getKeywords(true)

    if (keywords.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No active keywords',
        results: [],
      })
    }

    const results = []

    for (const kw of keywords) {
      try {
        const items = kw.type === 'caption'
          ? await scrapeTikTokByKeyword(kw.keyword)
          : await scrapeTikTokByHashtag(kw.keyword)

        let newPosts = 0

        for (const item of items) {
          const existing = await getPostByVideoId(item.id)
          if (!existing) {
            const postData = convertToPost(item, kw.keyword)
            await upsertPost(postData)
            newPosts++
          }
        }

        await createScrapeLog({
          keyword: kw.keyword,
          status: 'success',
          posts_found: items.length,
          posts_new: newPosts,
          error_message: null,
        })

        results.push({
          keyword: kw.keyword,
          posts_found: items.length,
          posts_new: newPosts,
        })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'

        await createScrapeLog({
          keyword: kw.keyword,
          status: 'error',
          posts_found: 0,
          posts_new: 0,
          error_message: errorMessage,
        })

        results.push({
          keyword: kw.keyword,
          error: errorMessage,
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
