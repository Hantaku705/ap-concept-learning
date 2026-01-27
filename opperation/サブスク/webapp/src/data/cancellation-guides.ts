export interface CancellationGuide {
  serviceName: string;
  url: string;
  steps: string[];
  notes?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

export const cancellationGuides: Record<string, CancellationGuide> = {
  'Netflix': {
    serviceName: 'Netflix',
    url: 'https://www.netflix.com/cancelplan',
    steps: [
      'Netflix.comにログイン',
      '右上のプロフィールアイコンをクリック',
      '「アカウント」を選択',
      '「メンバーシップのキャンセル」をクリック',
      '「キャンセル手続きの完了」をクリック',
    ],
    notes: [
      'キャンセル後も請求期間終了まで視聴可能',
      '再開はいつでも可能',
    ],
    difficulty: 'easy',
    estimatedTime: '1分',
  },
  'Amazon Prime': {
    serviceName: 'Amazon Prime',
    url: 'https://www.amazon.co.jp/gp/primecentral',
    steps: [
      'Amazon.co.jpにログイン',
      '「アカウント＆リスト」→「Amazonプライム会員情報」',
      '「プライム会員資格を終了する」をクリック',
      '確認画面で「会員資格を終了する」をクリック',
    ],
    notes: [
      '年間プランの場合、使用日数に応じて返金される場合あり',
      'Prime特典（配送、Prime Video等）がすべて終了',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'Spotify': {
    serviceName: 'Spotify',
    url: 'https://www.spotify.com/account/subscription/',
    steps: [
      'Spotify.comにログイン',
      'アカウントページの「プランを変更」をクリック',
      '「プレミアムをキャンセル」を選択',
      '確認画面で「キャンセル」をクリック',
    ],
    notes: [
      'キャンセル後も請求期間終了まで利用可能',
      '無料プランに自動移行',
    ],
    difficulty: 'easy',
    estimatedTime: '1分',
  },
  'YouTube Premium': {
    serviceName: 'YouTube Premium',
    url: 'https://www.youtube.com/paid_memberships',
    steps: [
      'YouTube.comにログイン',
      '右上のプロフィール→「購入とメンバーシップ」',
      '「メンバーシップを管理」をクリック',
      '「無効にする」を選択',
    ],
    notes: [
      'ファミリープランの場合、管理者のみ解約可能',
      '広告なし、オフライン再生が利用不可に',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'Apple Music': {
    serviceName: 'Apple Music',
    url: 'https://support.apple.com/ja-jp/HT202039',
    steps: [
      'iPhoneの「設定」アプリを開く',
      '上部の自分の名前をタップ',
      '「サブスクリプション」をタップ',
      'Apple Musicを選択し「サブスクリプションをキャンセル」',
    ],
    notes: [
      'Webからも解約可能（appleid.apple.com）',
      'ダウンロードした曲は解約後に再生不可',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'Disney+': {
    serviceName: 'Disney+',
    url: 'https://www.disneyplus.com/account/subscription',
    steps: [
      'DisneyPlus.comにログイン',
      'プロフィールアイコン→「アカウント」',
      '「サブスクリプション」セクションで「Disney+」をクリック',
      '「サブスクリプションをキャンセル」を選択',
    ],
    notes: [
      '請求期間終了まで視聴可能',
      '年間プランは返金なし',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'Adobe Creative Cloud': {
    serviceName: 'Adobe Creative Cloud',
    url: 'https://account.adobe.com/plans',
    steps: [
      'account.adobe.comにログイン',
      '「プランを管理」をクリック',
      '「プランを解約」を選択',
      '解約理由を選択して続行',
      '最終確認画面で「解約を確定」',
    ],
    notes: [
      '年間プランの途中解約は残り期間の50%の違約金が発生',
      '解約前にファイルをバックアップ推奨',
    ],
    difficulty: 'medium',
    estimatedTime: '5分',
  },
  'Microsoft 365': {
    serviceName: 'Microsoft 365',
    url: 'https://account.microsoft.com/services',
    steps: [
      'account.microsoft.comにログイン',
      '「サービスとサブスクリプション」をクリック',
      'Microsoft 365の「管理」をクリック',
      '「サブスクリプションをキャンセル」を選択',
    ],
    notes: [
      '解約後もOneDriveのファイルは保持（容量制限あり）',
      'Officeアプリは読み取り専用モードに',
    ],
    difficulty: 'easy',
    estimatedTime: '3分',
  },
  'Notion': {
    serviceName: 'Notion',
    url: 'https://www.notion.so/my-account',
    steps: [
      'Notion.soにログイン',
      '左サイドバーの「設定」→「プラン」',
      '「プランをダウングレード」をクリック',
      '無料プランを選択',
    ],
    notes: [
      'データは保持される',
      '一部機能が制限される',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'ChatGPT Plus': {
    serviceName: 'ChatGPT Plus',
    url: 'https://chat.openai.com/settings/subscription',
    steps: [
      'ChatGPT（chat.openai.com）にログイン',
      '左下の自分の名前→「My plan」',
      '「Manage my subscription」をクリック',
      '「Cancel plan」を選択',
    ],
    notes: [
      '解約後も請求期間終了まで利用可能',
      '無料版に自動移行',
    ],
    difficulty: 'easy',
    estimatedTime: '1分',
  },
  'GitHub': {
    serviceName: 'GitHub',
    url: 'https://github.com/settings/billing',
    steps: [
      'GitHub.comにログイン',
      '右上のプロフィール→「Settings」',
      '左メニューの「Billing and plans」',
      '「Cancel plan」をクリック',
    ],
    notes: [
      'プライベートリポジトリは無料枠内なら継続利用可',
      'GitHub Actionsの無料枠が減少',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'Google One': {
    serviceName: 'Google One',
    url: 'https://one.google.com/settings',
    steps: [
      'one.google.comにログイン',
      '左メニューの「設定」',
      '「メンバーシップをキャンセル」をクリック',
      '確認画面で「キャンセル」',
    ],
    notes: [
      '無料の15GBを超えるデータがある場合、ダウンロードが必要',
      'ファミリーメンバーも特典を失う',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'iCloud+': {
    serviceName: 'iCloud+',
    url: 'https://support.apple.com/ja-jp/HT207594',
    steps: [
      'iPhoneの「設定」→自分の名前→「iCloud」',
      '「ストレージを管理」→「ストレージプランを変更」',
      '「ダウングレードオプション」を選択',
      '無料プラン（5GB）を選択',
    ],
    notes: [
      '5GBを超えるデータはバックアップが必要',
      'iCloud+の機能（カスタムドメイン等）が利用不可に',
    ],
    difficulty: 'easy',
    estimatedTime: '3分',
  },
  'Dropbox': {
    serviceName: 'Dropbox',
    url: 'https://www.dropbox.com/account/plan',
    steps: [
      'Dropbox.comにログイン',
      '右上のアイコン→「設定」',
      '「プラン」タブを選択',
      '「プランをキャンセル」をクリック',
    ],
    notes: [
      'データは保持されるが、2GB超過分は同期停止',
      '超過分のファイルは削除が必要',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'PlayStation Plus': {
    serviceName: 'PlayStation Plus',
    url: 'https://www.playstation.com/ja-jp/ps-plus/',
    steps: [
      'PlayStation.comにログイン',
      '右上のアカウント→「サブスクリプション」',
      'PlayStation Plusの「自動更新をオフにする」',
      '確認画面で「確認」',
    ],
    notes: [
      '期間終了までオンラインプレイ等は利用可能',
      'フリープレイ特典のゲームは期間終了後プレイ不可',
    ],
    difficulty: 'easy',
    estimatedTime: '3分',
  },
  'Nintendo Switch Online': {
    serviceName: 'Nintendo Switch Online',
    url: 'https://accounts.nintendo.com/shop/subscription',
    steps: [
      'accounts.nintendo.comにログイン',
      '「ショップ情報」→「Nintendo Switch Online」',
      '「自動継続購入の更新停止」をクリック',
      '確認画面で「更新停止」',
    ],
    notes: [
      'セーブデータお預かりが利用不可に',
      'オンラインプレイは期間終了まで可能',
    ],
    difficulty: 'easy',
    estimatedTime: '3分',
  },
  'Xbox Game Pass': {
    serviceName: 'Xbox Game Pass',
    url: 'https://account.microsoft.com/services/xboxgamepass/',
    steps: [
      'account.microsoft.comにログイン',
      '「サービスとサブスクリプション」',
      'Xbox Game Passの「管理」',
      '「サブスクリプションのキャンセル」',
    ],
    notes: [
      '解約後はゲームがプレイ不可に',
      '購入したゲームは引き続きプレイ可能',
    ],
    difficulty: 'easy',
    estimatedTime: '2分',
  },
  'U-NEXT': {
    serviceName: 'U-NEXT',
    url: 'https://account.unext.jp/',
    steps: [
      'U-NEXTにログイン',
      '左メニュー「設定・サポート」→「契約内容の確認・変更」',
      '「解約はこちら」をクリック',
      '確認画面で「解約する」',
    ],
    notes: [
      '月末までは視聴可能',
      'ポイントは解約後も利用期限まで有効',
    ],
    difficulty: 'easy',
    estimatedTime: '3分',
  },
  'Slack': {
    serviceName: 'Slack',
    url: 'https://slack.com/help/articles/218915077',
    steps: [
      'Slackワークスペースにログイン',
      '左上のワークスペース名→「設定と管理」→「ワークスペースの設定」',
      '「お支払い」タブ→「プランをキャンセル」',
    ],
    notes: [
      'フリープランに自動移行',
      'メッセージ履歴が90日分に制限',
    ],
    difficulty: 'easy',
    estimatedTime: '3分',
  },
  '日経電子版': {
    serviceName: '日経電子版',
    url: 'https://www.nikkei.com/help/contract/',
    steps: [
      '日経電子版にログイン',
      '「会員情報」→「購読プラン」',
      '「解約手続き」をクリック',
      '確認画面で「解約する」',
    ],
    notes: [
      '解約後は記事の閲覧が制限',
      '無料会員として一部サービスは継続利用可能',
    ],
    difficulty: 'easy',
    estimatedTime: '5分',
  },
};
