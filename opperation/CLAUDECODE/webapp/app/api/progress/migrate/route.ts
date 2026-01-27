import { createClient } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 })
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { localProgress } = await request.json()

  // 既存のクラウドデータを取得
  const { data: existing } = await supabase
    .from('user_progress')
    .select('progress')
    .eq('user_id', user.id)
    .single()

  // マージ: localProgress をベースに、クラウドが優先（競合時）
  const mergedProgress = {
    ...localProgress,
    ...(existing?.progress || {}),
  }

  // 保存
  const { error } = await supabase
    .from('user_progress')
    .upsert(
      { user_id: user.id, progress: mergedProgress },
      { onConflict: 'user_id' }
    )

  if (error) {
    console.error('Error migrating progress:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ progress: mergedProgress })
}
