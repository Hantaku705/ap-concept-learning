# skills-map - Claude Code スキル可視化ダッシュボード

## 概要

`AP/_claude-code/` 内のスキル・コマンド・エージェント・ルールを可視化するWebアプリ。
検索・フィルター・詳細表示機能を備えたダッシュボード形式で、Claude Code設定の全体像を把握できる。

---

## 本番URL

（Vercelデプロイ後に記載）

---

## 技術スタック

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 16.1.5 | App Router |
| React | 19.2.3 | UI |
| TypeScript | 5.x | 型安全 |
| Tailwind CSS | 4.x | スタイリング |
| clsx + tailwind-merge | - | className結合 |

---

## フォルダ構成

```
skills-map/
├── src/app/
│   ├── components/
│   │   ├── ui/              # 共通UIコンポーネント
│   │   │   ├── Badge.tsx    # バッジ（統計表示用）
│   │   │   ├── Card.tsx     # カードコンポーネント
│   │   │   ├── SearchInput.tsx  # 検索入力
│   │   │   ├── TabButton.tsx    # タブボタン
│   │   │   └── index.ts     # バレルエクスポート
│   │   └── tabs/            # タブコンポーネント
│   │       ├── CategoryTab.tsx  # カテゴリタブ
│   │       ├── ItemDetail.tsx   # アイテム詳細モーダル
│   │       ├── ItemGrid.tsx     # アイテムグリッド
│   │       └── index.ts     # バレルエクスポート
│   ├── data/
│   │   └── skills-data.ts   # 静的データ（skills, commands, agents, rules）
│   ├── hooks/
│   │   └── useSearch.ts     # 検索・フィルターカスタムフック
│   ├── lib/
│   │   └── cn.ts            # classNames結合ユーティリティ
│   ├── types/
│   │   └── index.ts         # 型定義（BaseItem, SkillItem, CommandItem等）
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # レイアウト
│   └── page.tsx             # メインページ
├── public/                  # 静的ファイル
├── CLAUDE.md                # このファイル
├── package.json             # 依存関係
├── tsconfig.json            # TypeScript設定
└── next.config.ts           # Next.js設定
```

---

## 開発コマンド

```bash
# 開発サーバー起動
cd opperation/skills-map
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# ESLint
npm run lint
```

---

## データ更新方法

### 手動更新

データは `src/app/data/skills-data.ts` に静的に定義されている。

1. `_claude-code/` 内のファイルを追加・変更
2. `skills-data.ts` を手動で同期
3. ビルド確認

### データ構造

| カテゴリ | 配列名 | 型 | データソース |
|---------|--------|-----|-------------|
| Skills | `skillsData` | `SkillItem[]` | `_claude-code/skills/*.md` |
| Commands | `commandsData` | `CommandItem[]` | `_claude-code/commands/*.md` |
| Agents | `agentsData` | `AgentItem[]` | `_claude-code/agents/*.md` |
| Rules | `rulesData` | `RuleItem[]` | `_claude-code/rules/*.md` |

### 新しいアイテム追加例

```typescript
// skills-data.ts
export const skillsData: SkillItem[] = [
  // 既存データ...
  {
    id: 'skill-new-skill',
    name: 'New Skill',
    description: '新しいスキルの説明',
    filePath: '_claude-code/skills/new-skill.md',
    source: 'project',
    category: 'skills',
    fileName: 'new-skill',
  },
];
```

---

## Key Files

| ファイル | 用途 |
|---------|------|
| `src/app/page.tsx` | メインページ（タブ切り替え、検索、フィルター） |
| `src/app/data/skills-data.ts` | 全データ（Skills 11件、Commands 13件、Agents 9件、Rules 8件） |
| `src/app/types/index.ts` | 型定義（BaseItem, ConfigItem等） |
| `src/app/hooks/useSearch.ts` | 検索・フィルターカスタムフック |
| `src/app/components/tabs/ItemDetail.tsx` | アイテム詳細モーダル |

---

## 機能一覧

| 機能 | 説明 |
|------|------|
| タブ切り替え | Skills / Commands / Agents / Rules |
| 検索 | 名前・説明に対する部分一致検索 |
| ソースフィルター | All / Project / Global |
| 詳細表示 | モーダルでアイテム詳細表示 |
| 統計表示 | Total / Project / Global 件数バッジ |
| レスポンシブ | モバイル対応 |
| ダークモード | システム設定に追従 |

---

## 統計（2026-01-27時点）

| カテゴリ | 件数 |
|---------|------|
| Skills | 11 |
| Commands | 13 |
| Agents | 9 |
| Rules | 8 |
| **合計** | **41** |

---

## デプロイ

```bash
# Vercel CLIでデプロイ
cd opperation/skills-map
vercel --prod --yes
```

---

## 今後の改善案

1. **自動データ同期**: `_claude-code/` からの自動生成スクリプト
2. **ファイル内容表示**: 詳細モーダルで.mdファイル内容をプレビュー
3. **グローバル設定対応**: `~/.claude/` のデータも取得
4. **タグフィルター**: タグベースのフィルタリング
