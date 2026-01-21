#!/usr/bin/env python3
"""
THE Room FX - 6ターゲット分析スクリプト
3層×2マーケット = 6ターゲットの優先順位とインサイトを分析
"""

import pandas as pd
import json
from pathlib import Path
from collections import Counter
import re

# パス設定
BASE_DIR = Path(__file__).parent
PROCESSED_DIR = BASE_DIR / "processed"
ANALYSIS_DIR = BASE_DIR / "analysis"

# 入力ファイル
INPUT_FILE = PROCESSED_DIR / "clean.csv"

# Z/Y世代判定キーワード
ZY_KEYWORDS = [
    "gen z", "genz", "millennial", "student", "college", "university",
    "grad", "young", "20s", "30s", "youth", "teenager", "teen",
    "zoomer", "generation", "undergrad", "freshman", "sophomore",
    "junior", "senior", "alumni"
]

# 訪日検討層キーワード（Japan Interest拡張）
JAPAN_KEYWORDS = [
    "japan", "japanese", "tokyo", "osaka", "kyoto", "anime", "manga",
    "日本", "東京", "visit japan", "japan trip", "japan travel",
    "nihon", "nippon", "sushi", "ramen", "samurai", "geisha", "cherry blossom",
    "sakura", "shinkansen", "onsen", "kimono", "shibuya", "akihabara"
]

# BC渡航層キーワード
BC_KEYWORDS = [
    "business class", "first class", "premium cabin", "lie flat",
    "business travel", "frequent flyer", "status", "elite", "upgrade",
    "lounge access", "priority boarding", "premium economy"
]

# ターゲット国
NA_COUNTRIES = ["US", "CA"]  # 北米
EU_COUNTRIES = ["UK", "DE", "FR", "IT"]  # 欧州


def load_data():
    """データを読み込む"""
    print("Loading data...")
    df = pd.read_csv(INPUT_FILE, encoding='utf-8')
    print(f"Loaded {len(df)} rows")
    return df


def classify_generation(text):
    """Z/Y世代かどうかを判定"""
    if pd.isna(text):
        return False
    text_lower = str(text).lower()
    for kw in ZY_KEYWORDS:
        if kw in text_lower:
            return True
    return False


def classify_japan_interest(row):
    """訪日検討層かどうかを判定"""
    # プロフィールまたは投稿内容をチェック
    profile = str(row.get('author_description', '')).lower() if pd.notna(row.get('author_description')) else ''
    content = str(row.get('content', '')).lower() if pd.notna(row.get('content')) else ''
    combined = profile + ' ' + content

    for kw in JAPAN_KEYWORDS:
        if kw in combined:
            return True
    return False


def classify_bc_traveler(row):
    """BC渡航層かどうかを判定"""
    # プロフィールまたは投稿内容をチェック
    profile = str(row.get('author_description', '')).lower() if pd.notna(row.get('author_description')) else ''
    content = str(row.get('content', '')).lower() if pd.notna(row.get('content')) else ''
    combined = profile + ' ' + content

    for kw in BC_KEYWORDS:
        if kw in combined:
            return True
    return False


def get_market(country):
    """マーケットを判定"""
    if country in NA_COUNTRIES:
        return "NA"
    elif country in EU_COUNTRIES:
        return "EU"
    return None


def analyze_targets(df):
    """6ターゲットを分析"""
    print("\nAnalyzing 6 targets...")

    # 層の判定
    df['is_zy_gen'] = df['author_description'].apply(classify_generation)
    df['is_japan_interest'] = df.apply(classify_japan_interest, axis=1)
    df['is_bc_traveler'] = df.apply(classify_bc_traveler, axis=1)

    # マーケットの判定
    df['market'] = df['target_country'].apply(get_market)

    # ターゲット地域のみフィルタ
    target_df = df[df['market'].notna()].copy()
    print(f"Target region data: {len(target_df)} rows")

    # 6ターゲットの結果格納
    results = []

    # 各ターゲットを分析
    targets = [
        ("ZY_NA", "Z/Y世代 × 北米", "is_zy_gen", "NA"),
        ("ZY_EU", "Z/Y世代 × 欧州", "is_zy_gen", "EU"),
        ("JP_NA", "訪日検討層 × 北米", "is_japan_interest", "NA"),
        ("JP_EU", "訪日検討層 × 欧州", "is_japan_interest", "EU"),
        ("BC_NA", "BC渡航層 × 北米", "is_bc_traveler", "NA"),
        ("BC_EU", "BC渡航層 × 欧州", "is_bc_traveler", "EU"),
    ]

    for code, name, layer_col, market in targets:
        # フィルタ
        subset = target_df[(target_df[layer_col] == True) & (target_df['market'] == market)]

        if len(subset) == 0:
            results.append({
                'code': code,
                'name': name,
                'post_count': 0,
                'unique_authors': 0,
                'avg_followers': 0,
                'total_impressions': 0,
                'total_engagement': 0,
                'avg_sentiment': 0,
                'top_topic': '-',
                'top_airline': '-'
            })
            continue

        # 集計
        post_count = len(subset)
        unique_authors = subset['author_name'].nunique()
        avg_followers = subset['author_followers'].mean()
        total_impressions = subset['impressions'].sum()
        total_engagement = subset['engagement'].sum()
        avg_sentiment = subset['sentiment'].mean()

        # トップトピック
        all_topics = []
        for topics_str in subset['topics']:
            if pd.notna(topics_str):
                try:
                    topics_list = json.loads(topics_str) if isinstance(topics_str, str) else topics_str
                    all_topics.extend(topics_list)
                except:
                    pass
        top_topic = Counter(all_topics).most_common(1)[0][0] if all_topics else '-'

        # トップ航空会社
        airline_counts = subset['airline'].value_counts()
        top_airline = airline_counts.index[0] if len(airline_counts) > 0 else '-'

        results.append({
            'code': code,
            'name': name,
            'post_count': post_count,
            'unique_authors': unique_authors,
            'avg_followers': round(avg_followers, 0),
            'total_impressions': total_impressions,
            'total_engagement': total_engagement,
            'avg_sentiment': round(avg_sentiment, 2),
            'top_topic': top_topic,
            'top_airline': top_airline
        })

    return pd.DataFrame(results), df


def calculate_priority_score(row):
    """優先度スコアを計算"""
    # ボリューム（正規化）
    volume_score = min(row['post_count'] / 100, 1) * 30

    # 影響力（正規化）
    impression_score = min(row['total_impressions'] / 1000000, 1) * 30

    # エンゲージメント（正規化）
    engagement_score = min(row['total_engagement'] / 10000, 1) * 20

    # センチメント（-5〜+5を0〜1に正規化、プラスほど高い）
    sentiment_score = ((row['avg_sentiment'] + 5) / 10) * 20

    return round(volume_score + impression_score + engagement_score + sentiment_score, 1)


def create_personas():
    """6ターゲットのペルソナを作成"""
    personas = {
        "ZY_NA": {
            "name": "Alex (アレックス)",
            "age": "28歳",
            "occupation": "テック企業のプロダクトマネージャー（サンフランシスコ）",
            "profile": "スタートアップで働くミレニアル世代。年収$150K。旅行好きでInstagramでライフスタイルを発信。マイル・ポイント活用に詳しい。",
            "interests": "テクノロジー、トラベルハック、グルメ、フィットネス",
            "bc_motivation": "長距離フライトでの快適性、到着後すぐに仕事できる状態でいたい",
            "pain_points": "American Airlinesのサービス品質に不満、古い機材が多い",
            "appeal": "最新テクノロジー搭載のキャビン、WiFi、アプリ連携、日本の先進性"
        },
        "ZY_EU": {
            "name": "Emma (エマ)",
            "age": "32歳",
            "occupation": "金融機関のコンサルタント（ロンドン）",
            "profile": "ヨーロッパ各地への出張が多いY世代。週末は旅行を楽しむ。サステナビリティに関心。",
            "interests": "サステナビリティ、ウェルネス、アート、ワイン",
            "bc_motivation": "出張後の疲労回復、プライベートな空間で仕事",
            "pain_points": "British Airwaysの老朽化、サービスの質のばらつき",
            "appeal": "日本式おもてなし、静かで落ち着いた空間、質の高い機内食"
        },
        "JP_NA": {
            "name": "Michael (マイケル)",
            "age": "35歳",
            "occupation": "IT企業のエンジニア（ニューヨーク）",
            "profile": "日本文化に深い関心を持つ。アニメ・ゲームがきっかけで日本に興味。年1回は日本旅行。日本語学習中。",
            "interests": "アニメ、ゲーム、日本食、温泉、テクノロジー",
            "bc_motivation": "日本への長時間フライトを快適に、到着後すぐに観光を楽しみたい",
            "pain_points": "日本行き直行便の選択肢が少ない、機内での日本体験がない",
            "appeal": "日本を感じられる機内体験、ANAの日本品質、成田/羽田への直行便"
        },
        "JP_EU": {
            "name": "Sophie (ソフィー)",
            "age": "29歳",
            "occupation": "ファッション業界のバイヤー（パリ）",
            "profile": "日本のファッション・デザインに関心。年2回の東京出張。日本の美意識に共感。",
            "interests": "ファッション、デザイン、日本建築、茶道、京都",
            "bc_motivation": "長距離フライトでの美容・スキンケア、到着時のコンディション",
            "pain_points": "欧州から日本への直行便の乗り継ぎ、機内の乾燥",
            "appeal": "ANAの美意識、スキンケアアメニティ、日本の「おもてなし」"
        },
        "BC_NA": {
            "name": "David (デイビッド)",
            "age": "45歳",
            "occupation": "製造業の副社長（シカゴ）",
            "profile": "月2回以上の海外出張。ステータス会員。効率と快適性を重視。家族との時間を大切にしたい。",
            "interests": "ゴルフ、ビジネス、投資、家族",
            "bc_motivation": "移動時間の有効活用、睡眠の質、到着後のパフォーマンス",
            "pain_points": "American Airlinesの遅延・サービス低下、価値に見合わない",
            "appeal": "定時運航率、ビジネスに集中できる環境、疲れない座席"
        },
        "BC_EU": {
            "name": "Thomas (トーマス)",
            "age": "42歳",
            "occupation": "自動車メーカーのエグゼクティブ（フランクフルト）",
            "profile": "アジア（特に日本）との取引が多い。品質と効率を重視。Lufthansaのステータス会員だが不満も。",
            "interests": "自動車、品質管理、日本文化、ビジネス",
            "bc_motivation": "日本出張時の快適性、時差ボケ対策、機内での仕事",
            "pain_points": "Lufthansaの最近のサービス低下、ストライキ",
            "appeal": "日本品質のサービス、静粛性、時差ボケ対策のサポート"
        }
    }
    return personas


def main():
    """メイン処理"""
    print("=" * 60)
    print("THE Room FX - 6 Target Analysis")
    print("=" * 60)

    # データ読み込み
    df = load_data()

    # 6ターゲット分析
    results_df, enriched_df = analyze_targets(df)

    # 優先度スコア計算
    results_df['priority_score'] = results_df.apply(calculate_priority_score, axis=1)

    # 優先度順にソート
    results_df = results_df.sort_values('priority_score', ascending=False).reset_index(drop=True)
    results_df['rank'] = range(1, len(results_df) + 1)

    # 保存
    results_df.to_csv(ANALYSIS_DIR / "6target_analysis.csv", index=False, encoding='utf-8')

    print("\n" + "=" * 60)
    print("6 Target Analysis Results")
    print("=" * 60)

    # 結果表示
    print("\n📊 6ターゲット優先順位:")
    print("-" * 80)
    for _, row in results_df.iterrows():
        print(f"#{row['rank']} {row['name']}")
        print(f"   投稿数: {row['post_count']}, 著者数: {row['unique_authors']}, "
              f"インプレ: {row['total_impressions']:,}, センチ: {row['avg_sentiment']}")
        print(f"   スコア: {row['priority_score']}, トップ話題: {row['top_topic']}, "
              f"トップ航空: {row['top_airline']}")
        print()

    # ペルソナ作成
    personas = create_personas()

    # ペルソナレポート保存
    persona_report = "# THE Room FX - 6ターゲット ペルソナ\n\n"

    for _, row in results_df.iterrows():
        code = row['code']
        persona = personas.get(code, {})

        persona_report += f"## #{row['rank']} {row['name']}\n\n"
        persona_report += f"### データサマリー\n\n"
        persona_report += f"| 指標 | 値 |\n"
        persona_report += f"|------|-----|\n"
        persona_report += f"| 投稿数 | {row['post_count']} |\n"
        persona_report += f"| ユニーク著者数 | {row['unique_authors']} |\n"
        persona_report += f"| 平均フォロワー | {row['avg_followers']:,.0f} |\n"
        persona_report += f"| 総インプレッション | {row['total_impressions']:,} |\n"
        persona_report += f"| 総エンゲージメント | {row['total_engagement']:,} |\n"
        persona_report += f"| 平均センチメント | {row['avg_sentiment']} |\n"
        persona_report += f"| トップトピック | {row['top_topic']} |\n"
        persona_report += f"| トップ航空会社 | {row['top_airline']} |\n"
        persona_report += f"| 優先度スコア | {row['priority_score']} |\n\n"

        if persona:
            persona_report += f"### ペルソナ: {persona['name']}\n\n"
            persona_report += f"| 項目 | 内容 |\n"
            persona_report += f"|------|------|\n"
            persona_report += f"| 年齢 | {persona['age']} |\n"
            persona_report += f"| 職業 | {persona['occupation']} |\n"
            persona_report += f"| プロフィール | {persona['profile']} |\n"
            persona_report += f"| 関心事 | {persona['interests']} |\n"
            persona_report += f"| BC利用動機 | {persona['bc_motivation']} |\n"
            persona_report += f"| ペインポイント | {persona['pain_points']} |\n"
            persona_report += f"| **訴求ポイント** | **{persona['appeal']}** |\n\n"

        persona_report += "---\n\n"

    with open(ANALYSIS_DIR / "6target_personas.md", 'w', encoding='utf-8') as f:
        f.write(persona_report)

    print(f"\nSaved: {ANALYSIS_DIR / '6target_analysis.csv'}")
    print(f"Saved: {ANALYSIS_DIR / '6target_personas.md'}")

    return results_df


if __name__ == "__main__":
    main()
