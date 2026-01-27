import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get('keyword') || undefined
    const minPlays = searchParams.get('minPlays')
      ? parseInt(searchParams.get('minPlays')!, 10)
      : undefined
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!, 10)
      : 50
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!, 10)
      : 0

    const posts = await getPosts({ keyword, minPlays, limit, offset })

    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
