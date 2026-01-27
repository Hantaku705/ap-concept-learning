# Multi-Agent System

YAMLベースの拡張可能なマルチエージェントシステム。

---

## 概要

| 項目 | 値 |
|------|-----|
| システム名 | Multi-Agent System |
| バージョン | 1.0.0 |
| 環境 | macOS |
| ダッシュボードURL | http://localhost:3001 |

## アーキテクチャ

```
User
  │
  ▼
┌──────────────────────────────────────────┐
│  Orchestrator (司令塔)                    │
│  ・タスク受付                             │
│  ・Coordinatorへの委譲                    │
│  ・システム監視・自己修復                  │
└──────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────┐
│  Coordinator (調整役)                     │
│  ・タスク分解（最大8分割）                 │
│  ・SubAgent管理                          │
│  ・Skills自動生成                         │
└──────────────────────────────────────────┘
  │
  ▼
┌──────────────────────────────────────────┐
│  SubAgent × 8 (実行者)                    │
│  ・割り当てタスクのみ実行                  │
│  ・完了報告                               │
│  ・パターン記録                            │
└──────────────────────────────────────────┘
```

## フォルダ構成

```
multi-agent/
├── CLAUDE.md                    # このファイル
├── README.md                    # セットアップガイド
├── dashboard.md                 # Markdownダッシュボード
│
├── config/                      # YAML設定
│   ├── agents.yaml             # エージェント定義
│   ├── skills.yaml             # スキル定義
│   ├── workflows.yaml          # ワークフロー定義
│   └── settings.yaml           # 全体設定
│
├── instructions/                # エージェント指示書
│   ├── orchestrator.md         # Orchestrator
│   ├── coordinator.md          # Coordinator
│   └── subagent.md             # SubAgent
│
├── queue/                       # 通信ファイル（YAML）
│   ├── tasks/                  # Coordinator → SubAgent
│   └── reports/                # SubAgent → Coordinator
│
├── skills/                      # スキル定義
│   ├── builtin/                # 組み込みスキル
│   └── auto-generated/         # 自動生成スキル
│
├── memory/                      # Memory MCPストレージ
├── logs/                        # 監査ログ
│
├── scripts/
│   ├── setup.sh                # 初期セットアップ
│   ├── start.sh                # 起動
│   └── stop.sh                 # 停止
│
└── dashboard/                   # Web UIダッシュボード
    ├── package.json
    └── app/
        ├── page.tsx            # ダッシュボードUI
        └── api/status/route.ts # APIエンドポイント
```

## クイックスタート

```bash
# 1. セットアップ
cd opperation/multi-agent
./scripts/setup.sh

# 2. ダッシュボード依存関係インストール
cd dashboard && npm install && cd ..

# 3. 起動
./scripts/start.sh

# 4. 停止
./scripts/stop.sh
```

## エージェント

| エージェント | 役割 | モデル | ツール |
|------------|------|--------|--------|
| Orchestrator | タスク受付、全体統括 | opus | Read, Write, Bash, Task |
| Coordinator | タスク分解、SubAgent管理 | opus | Read, Write, Bash |
| SubAgent (×8) | タスク実行 | sonnet | Read, Write, Edit, Bash, Grep, Glob |

## 通信プロトコル

### タスク送信（YAML）

```yaml
# queue/tasks/task_001_subagent_1.yaml
task_id: task_001
subtask_id: subtask_001
subagent_id: 1
command: create_component
target: Button.tsx
details:
  description: 再利用可能なButtonコンポーネントを作成
priority: high
```

### 完了報告（YAML）

```yaml
# queue/reports/task_001_subagent_1_report.yaml
task_id: task_001
subtask_id: subtask_001
subagent_id: 1
status: completed
result:
  summary: Buttonコンポーネント作成完了
  files_created:
    - src/components/ui/Button.tsx
duration: 120
```

## Skills自動生成

タスク完了パターンから自動的にスキルを生成:

```yaml
# skills/auto-generated/auto-button-creation.yaml
skill_id: auto-button-creation
pattern:
  trigger: "ボタンコンポーネント|Button component"
  steps:
    - コンポーネントファイル作成
    - Props型定義
    - バリアント実装
success_rate: 0.95
usage_count: 3
```

## ワークフロー

| ワークフロー | トリガー | フェーズ |
|-------------|---------|---------|
| feature-implementation | `機能実装` | Planning → Task Decomposition → Parallel Execution → Integration → Review |
| bug-fix | `バグ修正` | Investigation → Fix Implementation → Parallel Fix → Verification |
| refactoring | `リファクタリング` | Analysis → Safe Refactor → Incremental Changes |

## ダッシュボード

### Markdown版

`dashboard.md` を直接参照:
```bash
cat dashboard.md
```

### Web UI版

```bash
cd dashboard
npm run dev
# http://localhost:3001 でアクセス
```

## tmuxセッション構成

| Window | 名前 | 内容 |
|--------|------|------|
| 0 | orchestrator | Orchestrator |
| 1 | coordinator | Coordinator |
| 2 | subagents | SubAgent × 8（8ペイン） |
| 3 | dashboard | Web UIダッシュボード |
| 4 | logs | ログビューア |

## 参考

- 元リポジトリ: https://github.com/yohey-w/multi-agent-shogun
- 解説記事: https://zenn.dev/shio_shoppaize/articles/5fee11d03a11a1

## 更新履歴

- 2026-01-27: 初版作成（Enterprise版、YAML拡張、Skills自動生成、Web UIダッシュボード）
