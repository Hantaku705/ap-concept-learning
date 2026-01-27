# workflow - プロジェクトワークフローガイド

APリポジトリ内の各プロジェクトで実践されてきた標準ワークフローを体系化したガイド。

---

## 概要

| 項目 | 内容 |
|------|------|
| 目的 | 与件（PDF/CSV/メモ）からWebappデプロイまでの標準フローを定義 |
| 対象 | 提案書作成、分析レポート、戦略立案、教育コンテンツ |
| 分析元 | 7プロジェクト（concept-learning, dr.melaxin, phonefarm, Refa, the-room-fx, norganic, mascode） |

---

## 5段階ワークフロー

```
与件 → Markdown → TypeScript → React → Vercel
```

| Stage | 名称 | 出力物 |
|-------|------|--------|
| 1 | INPUT CAPTURE | `source/`, `docs/brief.md`, `CLAUDE.md` |
| 2 | STRATEGIC DOC | `docs/proposal.md`（300-700行） |
| 3 | DATA STRUCTURE | `webapp/src/data/*.ts`（8-37KB） |
| 4 | UI MAPPING | React + Recharts コンポーネント |
| 5 | DEPLOY | Vercel公開URL |

---

## ファイル構成

```
projects/workflow/
├── CLAUDE.md           # このファイル
└── workflow.md         # ワークフローガイド本体（約400行）
```

---

## 関連ファイル

| ファイル | 用途 |
|---------|------|
| `workflow.md` | ワークフローガイド本体（5段階詳細、パターン、テンプレート） |
| `_claude-code/skills/project-workflow.md` | `/project-workflow` スキル（クイックリファレンス） |

---

## 使い方

1. 新規プロジェクト開始時に `workflow.md` を参照
2. `/project-workflow` スキルでクイックリファレンス
3. 5段階に沿ってプロジェクトを進行

---

## プロジェクト別適用例

| プロジェクト | 問い/与件 | 適用Stage | 成果物 |
|-------------|----------|-----------|--------|
| concept-learning | コンセプト教育 | 1-5 | 学習Webapp |
| dr.melaxin | $10M予算提案 | 1-5 | 提案書Webapp（7チャート） |
| phonefarm | 脅威対策 | 1-5 | レポートWebapp |
| Refa | ブランド変遷分析 | 1-5 | ダッシュボード |
| the-room-fx | 広告配信提案 | 1-5 | 13セクション提案書 |
| norganic | X戦略立案 | 1-5 | 5タブWebapp |
| mascode | プロモーション提案 | 1-2 | 静的提案書 |

---

## 更新履歴

- 2026-01-26: 初版作成（7プロジェクト分析に基づく）
