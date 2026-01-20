# source/ - 元ファイル・データ

Dr.Melaxin提案に使用した元ファイル（PDF/PPTX/CSV）と画像変換データ。

---

## ファイル一覧

### 提案書

| ファイル | 内容 | サイズ |
|---------|------|--------|
| `proposal.pdf` | 元の提案書PDF（65ページ） | 20.8MB |
| `proposal-compressed.pdf` | 圧縮版 | 2.5MB |

※ PowerPoint版（proposal.pptx）は容量が大きいため除外

### GTMデータ

| ファイル | 内容 |
|---------|------|
| `gtm-original.csv` | 元GTMスプレッドシート（月別計画） |
| `gtm-10m.csv` | $10M版月別投資・GMV計画 |

### 画像

| フォルダ | 内容 |
|---------|------|
| `slides/` | PDF→PNG変換画像（65枚、150 DPI） |

---

## 変換コマンド

PDF→PNG変換（poppler使用）:
```bash
pdftoppm -png -r 150 proposal.pdf slides/slide
```

---

## 注意事項

- 大容量ファイル（特にpptx）はGit LFSで管理推奨
- 編集はPowerPointで行い、PDFに再書き出し
- GTM更新時は新しいCSVを追加し、古いものは残す（履歴管理）
