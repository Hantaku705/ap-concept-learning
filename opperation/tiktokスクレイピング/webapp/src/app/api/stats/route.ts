import { NextResponse } from 'next/server'
import { getDashboardStats, getDailyStats, getScrapeLogs } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'dashboard'

    if (type === 'dashboard') {
      const stats = await getDashboardStats()
      return NextResponse.json({ stats })
    }

    if (type === 'daily') {
      const days = searchParams.get('days')
        ? parseInt(searchParams.get('days')!, 10)
        : 30
      const dailyStats = await getDailyStats(days)
      return NextResponse.json({ dailyStats })
    }

    if (type === 'logs') {
      const limit = searchParams.get('limit')
        ? parseInt(searchParams.get('limit')!, 10)
        : 20
      const logs = await getScrapeLogs(limit)
      return NextResponse.json({ logs })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
