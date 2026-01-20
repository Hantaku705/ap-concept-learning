# AP - 社内プロジェクト管理リポジトリ

社内の様々なプロジェクトを管理するリポジトリ。

---

## フォルダ構成

```
AP/
├── _claude-code/           # Claude Code設定リファレンス
│   ├── agents/             # Subagent定義
│   ├── commands/           # Skillコマンド定義
│   ├── rules/              # ルール定義
│   ├── skills/             # Skill定義
│   ├── hooks/              # Hook定義
│   ├── mcp-configs/        # MCP設定
│   ├── plugins/            # プラグイン
│   └── examples/           # 設定例
│
├── concept-learning/       # コンセプト学習プロジェクト
│   ├── webapp/             # Next.js Webアプリ
│   ├── docs/               # 学習資料（Markdown）
│   └── knowledge/          # PDF資料
│
├── mascode/                # MASCODEプロジェクト
│   ├── proposal.pdf        # 提案資料
│   └── media-plan/         # メディアプラン
│
├── phonefarm/              # Phone Farmプロジェクト
│
├── dr.melaxin/             # Dr.Melaxinプロジェクト
│   ├── CLAUDE.md           # プロジェクト概要
│   ├── docs/               # 戦略ドキュメント
│   │   ├── budget-proposal-10m.md  # メイン資料
│   │   ├── proposal.md
│   │   └── research.md
│   ├── media-plan/         # メディアプラン
│   │   ├── annual.md
│   │   ├── march.md
│   │   └── june.md
│   ├── source/             # 元ファイル（PDF/PPTX/CSV/slides）
│   └── webapp/             # Next.js Webアプリ
│
├── _archive/               # アーカイブ（用途不明ファイル）
│
├── CLAUDE.md               # このファイル
├── HANDOFF.md              # セッション引き継ぎ
└── README.md               # リポジトリ概要
```

---

## プロジェクト別詳細

### concept-learning（コンセプト学習）

マーケティングコンセプト学習のWebアプリと資料。

**本番URL**: https://webapp-five-bay.vercel.app

**技術スタック**:
- Next.js 16.1.3 (App Router)
- React 19
- TypeScript
- Tailwind CSS

**ページ構成**:
| パス | 内容 |
|-----|------|
| `/` | トップページ |
| `/concept` | コンセプト学習トップ（2セクション） |
| `/concept/textbook` | コンセプトの教科書（全6章） |
| `/concept/examples` | 事例一覧（15件） |
| `/concept/examples/[slug]` | 事例詳細（14項目評価） |

**Key Files**:
| ファイル | 用途 |
|---------|------|
| `concept-learning/webapp/src/data/concept-data.json` | コンセプトデータ（※手動同期） |
| `concept-learning/docs/concept-data.json` | マスターデータ（こちらを編集） |

**開発コマンド**:
```bash
cd concept-learning/webapp
npm run dev
```

**デプロイ**:
```bash
cd concept-learning/webapp
vercel --prod --yes
```

---

### mascode（MASCODEプロジェクト）

MASCODE BEAUTYのプロモーション提案・メディアプラン。

**ファイル**:
| ファイル | 内容 |
|---------|------|
| `mascode/proposal.pdf` | 2026SS-AWプロモーション提案 |
| `mascode/media-plan/` | メディアプラン資料 |

---

### phonefarm（Phone Farmプロジェクト）

TikTok等のPhone Farm不正業者の脅威インテリジェンスレポート。

**本番URL**: https://phonefarm-threat-intel.vercel.app

**技術スタック**:
- Next.js 15.5.9 (App Router)
- React 19
- TypeScript
- Tailwind CSS

**ページ構成**:
| パス | 内容 |
|-----|------|
| `/` | 脅威インテリジェンスレポート |
| `/setup-guide` | 初心者向け0→1セットアップガイド |

**Key Files**:
| ファイル | 用途 |
|---------|------|
| `phonefarm/webapp/src/data/report-data.ts` | レポートデータ（ハードウェア、ソフトウェア、検出戦略等） |
| `phonefarm/webapp/src/data/setup-guide-data.ts` | セットアップガイドデータ（買い物リスト、手順等） |
| `phonefarm/webapp/src/app/page.tsx` | レポートページ |
| `phonefarm/webapp/src/app/setup-guide/page.tsx` | セットアップガイドページ |

**開発コマンド**:
```bash
cd phonefarm/webapp
npm run dev
```

**デプロイ**:
```bash
cd phonefarm/webapp
vercel --prod --yes
```

---

### dr.melaxin（Dr.Melaxinプロジェクト）

BRAND501 Corp.のスキンケアブランド「Dr.Melaxin」の日本市場マーケティング提案。

**本番URL**: https://dr-melaxin-proposal.vercel.app

**目標**: 日本市場でGMV 120億円をASAPで達成

**技術スタック**:
- Next.js 16.1.4 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Recharts（グラフ可視化）

**ページ構成**:
| パス | 内容 |
|-----|------|
| `/` | 提案書（9セクション、グラフ4種） |
| `/research` | 競合リサーチ（6セクション） |

**提案書セクション**（9セクション）:
| # | セクション | 内容 |
|---|-----------|------|
| 1 | 概要 | 基本情報、目標GMV |
| 2 | 戦略方針 | Plan A vs Plan B比較 |
| 3 | 財務計画 | 投資38億円、ROAS 316%、累計売上グラフ |
| 4 | 投資内訳 | Outbound Mass / EC / Offline、円グラフ |
| 5 | チャネル戦略 | Qoo10、TikTok Shop、チャネル別棒グラフ |
| 6 | GTMロードマップ | 四半期別投資/売上比較グラフ |
| 7 | 競合分析 | Anua、medicube比較 |
| 8 | プロモーション戦略 | オンライン/オフライン施策 |
| 9 | KOL・TikTok Shop | KOL Pick戦略、事例 |

**リサーチセクション**（6セクション）:
| # | セクション | 内容 |
|---|-----------|------|
| 1 | 市場概況 | ブランドTier別売上、購買傾向 |
| 2 | 成功パターン | 通常期・メガ割の勝ちパターン |
| 3 | 競合分析（詳細） | Dalba、Medicube、LAKA |
| 4 | マーケティング手法 | ホワイト/グレー施策、RT部隊 |
| 5 | JT代理店情報 | LAKA/朝鮮美人の課題感 |
| 6 | Dr.Melaxinへの示唆 | Top Tier共通点、必要アクション |

**フォルダ構成**:
```
dr.melaxin/
├── CLAUDE.md               # プロジェクト概要
├── docs/                   # 戦略ドキュメント
│   ├── budget-proposal-10m.md  # メイン資料（$10M予算提案書、704行）
│   ├── proposal.md         # 提案書サマリー（332行）
│   ├── research.md         # 競合リサーチ（6セクション）
│   ├── brief.md            # 案件ブリーフ
│   └── memo.md             # 社内ミーティングメモ
├── media-plan/             # メディアプラン
│   ├── annual.md           # 年間計画
│   ├── march.md            # 3月メガ割（GMV 5-7億円）
│   └── june.md             # 6月メガ割（GMV 10億円、ジョングク）
├── source/                 # 元ファイル・データ
│   ├── proposal.pdf        # 元PDF（65ページ）
│   ├── proposal.pptx       # PowerPoint
│   ├── gtm-original.csv    # 元GTM
│   ├── gtm-10m.csv         # $10M版GTM
│   └── slides/             # PDF画像（65枚）
└── webapp/                 # Next.js提案書可視化アプリ
```

**Key Files**:
| ファイル | 用途 |
|---------|------|
| `dr.melaxin/docs/budget-proposal-10m.md` | **メイン資料**（$10M予算提案書、704行） |
| `dr.melaxin/docs/research.md` | 競合リサーチ（整理済み、6セクション） |
| `dr.melaxin/media-plan/annual.md` | 年間メディアプラン |
| `dr.melaxin/media-plan/march.md` | 3月メガ割詳細プラン |
| `dr.melaxin/media-plan/june.md` | 6月メガ割詳細プラン |
| `dr.melaxin/webapp/src/data/proposal-data.ts` | 提案書データ（構造化） |

**開発コマンド**:
```bash
cd dr.melaxin/webapp
npm run dev
```

**デプロイ**:
```bash
cd dr.melaxin/webapp
vercel --prod --yes
```

**提案概要（元提案 38億円）**:
| 項目 | 値 |
|------|-----|
| マーケティング投資 | 38億円 |
| 売上目標 | 120億円 |
| ROAS | 316% |
| 主力チャネル | Qoo10（売上の55%） |
| 主力製品 | Serum（美容液） |

**$10M予算提案（15.8億円）**:
| 項目 | 値 |
|------|-----|
| マーケティング投資 | $10M USD（約15.8億円） |
| 売上目標 | 約45-50億円 |
| ROAS | 289%（Scenario 2） |
| 3シナリオ | パフォーマンス重視 / バランス型 / ハイブリッド |
| 推奨 | Scenario 2（バランス型）- Ambassador 3億円 + パフォーマンス |

**戦略**: Plan B（Vertical Launch）- 初期から積極投資で美容液市場を攻める

**勝ちパターン**: 「通常期で話題を作り、メガ割で刈り取る」

---

### _claude-code（Claude Code設定）

Claude Codeの設定リファレンス実装。

**ディレクトリ**:
| フォルダ | 内容 |
|---------|------|
| `agents/` | Subagent定義 |
| `commands/` | Skillコマンド定義 |
| `rules/` | ルール定義 |
| `skills/` | Skill定義 |
| `hooks/` | Hook定義 |
| `mcp-configs/` | MCP設定 |
| `examples/` | 設定例（CLAUDE.md等） |

---

## 更新履歴

- 2026-01-20: Dr.Melaxin フォルダ構造整理（docs/, media-plan/, source/に分離）
- 2026-01-20: Dr.Melaxin メディアプラン作成（年間/3月メガ割/6月メガ割）
- 2026-01-20: Dr.Melaxin $10M USD予算提案書作成（budget-proposal-10m.md, 704行）
- 2026-01-20: Dr.Melaxin 競合リサーチページ追加（/research、6セクション）
- 2026-01-20: Dr.Melaxin Webアプリ作成（9セクション、グラフ4種）
- 2026-01-20: Dr.Melaxin提案書分析・proposal.md作成（GTM詳細含む332行）
- 2026-01-20: Phone Farm脅威インテリジェンスレポート・セットアップガイド作成
- 2026-01-20: フォルダ構造を整理（プロジェクト別に分離）
- 2026-01-20: GitHubリポジトリ移行（Hantaku705/ap-concept-learning）
- 2026-01-20: 事例15件に拡張、評価項目14項目に統合
- 2026-01-19: コンセプト学習Webアプリ追加
