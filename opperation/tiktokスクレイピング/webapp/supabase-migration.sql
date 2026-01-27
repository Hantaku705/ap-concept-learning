-- TikTokスクレイピング用テーブル
-- Supabase SQL Editorで実行

-- キーワードテーブル
CREATE TABLE IF NOT EXISTS keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('hashtag', 'caption')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 投稿テーブル
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id TEXT NOT NULL UNIQUE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  play_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  author_id TEXT,
  author_name TEXT,
  author_followers INTEGER,
  posted_at TIMESTAMPTZ,
  keyword_matched TEXT,
  hashtags TEXT[],
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- スクレイプログテーブル
CREATE TABLE IF NOT EXISTS scrape_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'error')),
  posts_found INTEGER DEFAULT 0,
  posts_new INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_posts_video_id ON posts(video_id);
CREATE INDEX IF NOT EXISTS idx_posts_keyword_matched ON posts(keyword_matched);
CREATE INDEX IF NOT EXISTS idx_posts_posted_at ON posts(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_play_count ON posts(play_count DESC);
CREATE INDEX IF NOT EXISTS idx_scrape_logs_created_at ON scrape_logs(created_at DESC);

-- RLS（Row Level Security）を有効化
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_logs ENABLE ROW LEVEL SECURITY;

-- 公開読み取りポリシー（認証なしで読み取り可能）
DROP POLICY IF EXISTS "Public read keywords" ON keywords;
CREATE POLICY "Public read keywords" ON keywords FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read posts" ON posts;
CREATE POLICY "Public read posts" ON posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read scrape_logs" ON scrape_logs;
CREATE POLICY "Public read scrape_logs" ON scrape_logs FOR SELECT USING (true);

-- サービスロール用ポリシー（書き込み）
DROP POLICY IF EXISTS "Service role manage keywords" ON keywords;
CREATE POLICY "Service role manage keywords" ON keywords FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role manage posts" ON posts;
CREATE POLICY "Service role manage posts" ON posts FOR ALL USING (true);

DROP POLICY IF EXISTS "Service role manage scrape_logs" ON scrape_logs;
CREATE POLICY "Service role manage scrape_logs" ON scrape_logs FOR ALL USING (true);

-- 初期キーワード（アスタリフト）
INSERT INTO keywords (keyword, type, is_active)
VALUES ('#アスタリフト', 'hashtag', true)
ON CONFLICT (keyword) DO NOTHING;
