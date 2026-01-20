# webapp/ - 提案書可視化アプリ

Dr.Melaxinマーケティング提案書を可視化するNext.jsアプリ。

---

## 基本情報

| 項目 | 値 |
|------|-----|
| 本番URL | https://dr-melaxin-proposal.vercel.app |
| フレームワーク | Next.js 16.1.4 (App Router) |
| UI | Tailwind CSS |
| グラフ | Recharts |

---

## ページ構成

| パス | 内容 |
|-----|------|
| `/` | 提案書（9セクション、グラフ4種） |
| `/research` | 競合リサーチ（6セクション） |

### 提案書セクション

1. 概要（基本情報、目標GMV）
2. 戦略方針（Plan A vs Plan B比較）
3. 財務計画（投資38億円、ROAS 316%、累計売上グラフ）
4. 投資内訳（Outbound Mass / EC / Offline、円グラフ）
5. チャネル戦略（Qoo10、TikTok Shop、チャネル別棒グラフ）
6. GTMロードマップ（四半期別投資/売上比較グラフ）
7. 競合分析（Anua、medicube比較）
8. プロモーション戦略（オンライン/オフライン施策）
9. KOL・TikTok Shop（KOL Pick戦略、事例）

---

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# デプロイ
vercel --prod --yes
```

---

## Key Files

| ファイル | 用途 |
|---------|------|
| `src/data/proposal-data.ts` | 提案書データ（構造化） |
| `src/data/research-data.ts` | 競合リサーチデータ |
| `src/components/charts/` | グラフコンポーネント（4種） |
| `src/app/page.tsx` | 提案書ページ |
| `src/app/research/page.tsx` | リサーチページ |

---

## 更新時の注意

- データ更新は `src/data/` のファイルを編集
- グラフ追加は `src/components/charts/` にコンポーネント作成
- デプロイ前に `npm run build` で確認
