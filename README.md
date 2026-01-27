# AP - 社内プロジェクト管理リポジトリ

社内の様々なプロジェクトを管理するモノリポジトリ。マーケティング提案書、Webアプリ、分析資料、Claude Code設定を一元管理。

---

## プロジェクト一覧

| プロジェクト | 内容 | 本番URL |
|-------------|------|---------|
| [concept-learning](projects/concept-learning/) | コンセプト学習Webapp | https://webapp-five-bay.vercel.app |
| [dr.melaxin](projects/dr.melaxin/) | Dr.Melaxin 日本市場マーケティング提案 | https://dr-melaxin-proposal.vercel.app |
| [mascode](projects/mascode/) | MASCODE プロモーション提案 | - |
| [norganic](projects/norganic/) | N organic X戦略提案 | - |
| [phonefarm](projects/phonefarm/) | Phone Farm 脅威インテリジェンス | https://phonefarm-threat-intel.vercel.app |
| [Refa](projects/Refa/) | ReFa プロモーション変遷分析 | https://refa-report.vercel.app |
| [the-room-fx](projects/the-room-fx/) | ANA THE Room FX グローバル広告 | - |
| [NADESHIKO](NADESHIKO/) | 美容系SNSメディア売上管理 | https://nadeshiko-sales.vercel.app |

---

## フォルダ構成

```
AP/
├── projects/               # 全プロジェクト（7件）
│   ├── concept-learning/   # コンセプト学習
│   ├── dr.melaxin/         # Dr.Melaxin
│   ├── mascode/            # MASCODE
│   ├── norganic/           # N organic X戦略
│   ├── phonefarm/          # Phone Farm
│   ├── Refa/               # ReFa プロモーション変遷分析
│   ├── the-room-fx/        # ANA THE Room FX
│   └── workflow/           # プロジェクトワークフローガイド
│
├── NADESHIKO/              # 美容系SNSメディア事業
│
├── _agents/                # Claude Agent SDK
├── _claude-code/           # Claude Code設定リファレンス（multi-agent含む）
├── _archive/               # アーカイブ
│
├── opperation/             # 運用・学習資料
│   ├── CLAUDECODE/         # Claude Code オンボーディングWebapp
│   ├── DynamicBranding/    # 味の素ブランディングフレームワーク
│   ├── サブスク/           # サブスク確認ツール
│   ├── clawdbot/           # Clawdbot AIアシスタント
│   ├── skills-map/         # スキルマップ
│   ├── tiktokスクレイピング/ # TikTokスクレイピング
│   └── なまえデザイン_フォルダ/
│
├── CLAUDE.md               # プロジェクト設定
├── HANDOFF.md              # セッション引き継ぎ
└── README.md               # このファイル
```

---

## 技術スタック

| 技術 | 用途 |
|------|------|
| Next.js 16 + React 19 | Webアプリ |
| TypeScript | 型安全 |
| Tailwind CSS | スタイリング |
| Recharts | データ可視化 |
| Vercel | デプロイ |
| Claude Code | AI開発アシスタント |

---

## 運用ツール

| ツール | URL | 用途 |
|--------|-----|------|
| Claude Code オンボーディング | https://claude-code-onboarding-ten.vercel.app | チームメンバー向け説明会資料 |
| サブスク確認ツール | https://subscription-tracker-ten-iota.vercel.app | Gmail API連携サブスク検出 |
| Claude Code Starter Kit | https://github.com/Hantaku705/claude-code-starter | 1コマンドでプロ環境構築 |
