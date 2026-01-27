# Phone Farm - 脅威インテリジェンス

TikTok等のPhone Farm不正業者の脅威インテリジェンスレポート。

---

## 概要

| 項目 | 値 |
|------|-----|
| 本番URL | https://phonefarm-threat-intel.vercel.app |
| 技術スタック | Next.js 15.1.3 + React 19 + TypeScript + Tailwind CSS |

---

## フォルダ構成

```
projects/phonefarm/
├── CLAUDE.md                              # このファイル
├── docs/
│   ├── proposal/                          # 提案資料
│   │   └── howto.md                       # セットアップ方法
│   └── analysis/                          # 分析・リサーチ
│       ├── 3c.md                          # 3C分析
│       └── threat-intelligence-beginner-phonefarm.md  # 脅威インテリジェンス詳細
└── webapp/                                # Next.js Webアプリ
    ├── src/app/                           # App Router
    ├── src/data/                          # レポートデータ
    └── package.json
```

---

## Webapp

### ページ構成

| パス | 内容 |
|-----|------|
| `/` | 脅威インテリジェンスレポート |
| `/setup-guide` | 初心者向け0→1セットアップガイド |

### 開発コマンド

```bash
cd projects/phonefarm/webapp
npm run dev
```

### デプロイ

```bash
cd projects/phonefarm/webapp
vercel --prod --yes
```

---

## Key Files

| ファイル | 用途 |
|---------|------|
| `webapp/src/data/report-data.ts` | レポートデータ（ハードウェア、ソフトウェア、検出戦略等） |
| `webapp/src/data/setup-guide-data.ts` | セットアップガイドデータ（買い物リスト、手順等） |
| `docs/analysis/3c.md` | 3C分析（Customer、Competitor、Company） |
| `docs/analysis/threat-intelligence-beginner-phonefarm.md` | 脅威インテリジェンス詳細レポート |

---

## 更新履歴

- 2026-01-22: CLAUDE.md作成
