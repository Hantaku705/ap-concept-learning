# data - トライブ分析データ

ANA THE Room FXプロジェクトのSNSデータ分析フォルダ。

---

## 概要

| 項目 | 値 |
|------|-----|
| データソース | Meltwater（SNSモニタリング） |
| キーワード | 「ビジネスクラス 海外」 |
| 総投稿数 | 5,795件 |
| ターゲット地域投稿数 | 2,623件（US/UK/FR/DE/IT/CA） |
| 分析期間 | 2024年1月〜2026年1月 |

---

## フォルダ構成

```
data/
├── raw/                              # 元データ（変更なし）
│   └── export_AnyMindGroup_*.csv
├── processed/                        # 加工データ
│   ├── clean.csv                     # クリーンデータ（全件）
│   ├── clean.json
│   ├── target_region.csv             # ターゲット地域のみ
│   └── target_region.json
├── summary/                          # サマリー
│   ├── tribe_distribution.csv        # トライブ分布
│   ├── region_tribe_matrix.csv       # 地域×トライブ（投稿数）
│   ├── region_tribe_matrix_engagement.csv  # 地域×トライブ（エンゲージメント）
│   ├── topic_analysis.csv            # トピック分析
│   ├── airline_stats.csv             # 航空会社別統計
│   ├── author_profiles.csv           # 著者プロファイル
│   └── daily_stats.csv               # 日別統計
├── analysis/                         # 分析結果
│   ├── tribe_insights.md             # インサイトレポート ★メイン成果物
│   ├── influencers_by_tribe.csv      # インフルエンサーリスト（394名）
│   ├── influencers_by_tribe.json
│   └── top_voices.csv                # トライブ別トップ発言者
├── process_data.py                   # データ処理スクリプト
├── .venv/                            # Python仮想環境
└── CLAUDE.md                         # このファイル
```

---

## 主要ファイル

| ファイル | 説明 |
|---------|------|
| **analysis/tribe_insights.md** | インサイトレポート（クライアント報告用） |
| processed/clean.csv | 全データの整理版 |
| processed/target_region.csv | US/UK/FR/DE/IT/CAのみ |
| summary/region_tribe_matrix.csv | 地域×トライブのクロス集計 |
| analysis/influencers_by_tribe.csv | 10,000フォロワー以上のインフルエンサー |

---

## トライブ分類

| トライブ | キーワード | 投稿数 |
|---------|-----------|--------|
| Tech/Digital | tech, developer, startup | 922 |
| Travel Enthusiast | travel, aviation, miles | 794 |
| Business Traveler | business, executive, CEO | 616 |
| Creative | creator, writer, photographer | 205 |
| Luxury Lifestyle | luxury, premium, VIP | 67 |
| Japan Interest | japan, tokyo, anime | 12 |
| Unclassified | 該当なし | 3,179 |

---

## 主要インサイト

### 攻めるべきトライブ（WHO）

1. **Travel Enthusiast** - 唯一ポジティブ、欧州で強い
2. **Tech/Digital** - 最大ボリューム、拡散力高
3. **Business Traveler** - エンゲージメント最高、高購買力

### 競合分析

- **American Airlines**: センチメント最低（-2.49）、不満層をANAへ
- **Lufthansa/Air France**: ほぼ中立、差別化必要
- **ANA**: 言及ほぼなし（2件）、認知度向上の余地大

---

## 再実行方法

```bash
cd "/Users/hantaku/Downloads/AP/The Room FX/data"
source .venv/bin/activate
python process_data.py
```

---

## 更新履歴

- 2026-01-21: トライブ分析完了、インサイトレポート作成
