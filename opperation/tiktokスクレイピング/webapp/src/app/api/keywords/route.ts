import { NextResponse } from 'next/server'
import { getKeywords, createKeyword, updateKeyword, deleteKeyword } from '@/lib/supabase'

// キーワード一覧取得
export async function GET() {
  try {
    const keywords = await getKeywords()
    return NextResponse.json({ keywords })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// キーワード追加
export async function POST(request: Request) {
  try {
    const { keyword, type } = await request.json()

    if (!keyword || !type) {
      return NextResponse.json(
        { error: 'keyword and type are required' },
        { status: 400 }
      )
    }

    if (!['hashtag', 'caption'].includes(type)) {
      return NextResponse.json(
        { error: 'type must be "hashtag" or "caption"' },
        { status: 400 }
      )
    }

    const newKeyword = await createKeyword(keyword, type)
    return NextResponse.json({ keyword: newKeyword })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// キーワード更新
export async function PATCH(request: Request) {
  try {
    const { id, is_active } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const updated = await updateKeyword(id, { is_active })
    return NextResponse.json({ keyword: updated })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// キーワード削除
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    await deleteKeyword(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
