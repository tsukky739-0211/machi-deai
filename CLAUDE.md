# 街deai プロジェクト

## このプロジェクトについて
東京の穴場な街を発見するマッチングアプリ。「好みのvibe」を選ぶと、AIではなくローカル計算でぴったりの街を推薦する。非エンジニアがClaude Codeを使ってバイブコーディングで作った。

- 本番URL: https://machi-deai.vercel.app/
- デプロイ: Vercel（GitHub連携で自動デプロイ）
- 開発コマンド: `npm run dev`

## オーナーの目的・背景
- 非エンジニアがClaude Codeでバイブコーディングしてサービスを作った体験を、noteやzennで発信したい
- アフィリエイト（不動産サイトへの送客など）でマネタイズ予定
- 「どうやって作ったか」を自分でも理解しながら進めている

## 技術スタック（非エンジニア向け解説付き）
- **Next.js 16** — Reactベースのフレームワーク。Webサイトの骨格
- **TypeScript** — 型付きJavaScript。バグを未然に防ぐ
- **Tailwind CSS v4** — CSSをクラス名で書けるスタイリングツール
- **Framer Motion** — スワイプアニメーションのライブラリ
- **Vercel** — ホスティング。GitHubにpushすると自動デプロイ

## 画面構成（ページ一覧）
| URL | ファイル | 役割 |
|-----|---------|------|
| `/` | `src/app/page.tsx` | トップ。vibe選択・通勤先入力 |
| `/discover` | `src/app/discover/page.tsx` | スワイプカードで街を探す |
| `/town/[slug]` | `src/app/town/[slug]/page.tsx` | 街の詳細ページ |
| `/bookmarks` | `src/app/bookmarks/page.tsx` | 保存した街一覧 |

## データ構造
- 街データ: `src/data/towns.json`（100街、約350KB）
- 1街あたりの主なフィールド:
  - `name`, `slug`, `area`, `station`, `lines`
  - `vibe`: 街のタグ（例: ["カフェ", "おしゃれ", "下町"]）
  - `popularity`: 1〜5（低いほど穴場）
  - `avgRent`: 家賃相場（1R / 1K / 1LDK）
  - `spots`: アド街風TOP10スポット（rank, name, category, description）
  - `commuteMinutes`: 各駅への通勤時間 {"渋谷": 5, "新宿": 15}
  - `image`: 街の写真パス（`/images/towns/[slug].jpg`）
  - `externalLinks.suumo` / `externalLinks.homes`: アフィリエイトリンク先

## 推薦アルゴリズム（src/lib/recommend.ts）
AIは一切使っていない。Jaccard類似度という数学的な計算で街を推薦。

```
スコア = vibeタグの一致率 + 穴場ボーナス（popularityが低いほど加点）
```

上位15件をシャッフルして表示することで、毎回少し違う結果になる。

## vibeカテゴリ（src/lib/vibes.ts）
10カテゴリ。ユーザーが選ぶとタグ群に展開されて推薦に使われる。

| ID | 表示 | 主なタグ |
|----|------|---------|
| cafe-oshare | ☕ カフェ・おしゃれ | カフェ, おしゃれ, 雑貨 |
| shitamachi | 🏮 下町・レトロ | 下町, 商店街, 銭湯 |
| culture | 🎸 カルチャー・サブカル | 古着, ライブ, アート |
| nature | 🌿 自然・のんびり | 公園, 緑, 水辺 |
| cospa | 💰 コスパ重視 | コスパ, 穴場, 激安 |
| gourmet | 🍜 グルメ・飲み歩き | 飲み屋, ラーメン, 多国籍 |
| family | 👨‍👩‍👧 ファミリー | 子育て, 住宅街, 閑静 |
| academic | 📚 文教・知的 | 学生街, 古書, 歴史 |
| urban | 🏙️ 都会・便利 | 交通便利, 再開発, 商業施設 |
| otona | 🍷 大人・落ち着き | 洗練, 隠れ家, セレブ |

## ブックマーク機能（src/lib/bookmarks.ts）
ブラウザのlocalStorageに保存。サーバー不要・ログイン不要。
キー名: `machi-deai-bookmarks`

## マネタイズ（アフィリエイト）
- 各街詳細ページに SUUMO・HOMES へのリンクあり（`externalLinks`フィールド）
- `src/components/ExternalLinkBar.tsx` で表示
- 現状: リンクはあるがアフィリエイトID未設定（今後対応予定）

## 今後やりたいこと（随時更新）
- アフィリエイトIDの設定・収益化
- note/zenn記事連携（バイブコーディング体験談）
- **【進行中】トップページのビジュアルリニューアル** → 下記「トップページリデザイン計画」参照

## トップページリデザイン計画（進行中）

### 方針
Otonami / NOT A HOTEL スタイルの「全画面ヒーロー写真」デザインへ変更。
- 現状: オレンジグラデーションのヘッダー
- 目標: 全画面背景写真 + ダークオーバーレイ + ミニマルなコピー + CTAボタン

### Unsplashヒーロー写真候補（収集済み）
無料ライセンス（Unsplash License）のみ選定。商用利用OK。

| # | Unsplash ID | 説明 | 雰囲気 | 閲覧数 |
|---|------------|------|-------|-------|
| ① | `rbfg_Lucbow` | 提灯が並ぶ横丁の夜景（Caleb Jack） | 夜・下町 | - |
| ② | `2X_YEy3-BfM` | 狭い路地の奥に明かり、人が歩いている（ayumi kubo） | 夜・探索感 最高 | - |
| ③ | `gQY6-Yhh1v4` | 錦市場風アーケード商店街の夜景（Julien） | 夜・活気 | - |
| ④ | `h8x0r_z5n00` | 秋紅葉×居酒屋横丁の昼〜夕方（Antonio Prado） | 夕方・和風 | - |
| ⑤ | `-F3wMFrZ7z0` | 赤提灯の夜の路地＋奥に高層ビル（Denys Nevozhai） | 夜・東京感 | 4,729,576 |
| ⑥ | `-PmHLX2uA-Q` | 桜並木＋都市の通り（Akira Cake） | 昼・春・明るい | 40,664 |

### 使用URL形式
```
https://images.unsplash.com/photo-{ID}?w=1920&q=80&auto=format&fit=crop
```
※ IDが `-` で始まる場合もそのままURL末尾に付ける

### 次のアクション
1. ユーザーが上記候補から1枚選ぶ
2. `src/app/page.tsx` のオレンジグラデーションヘッダーを全画面写真に置き換え
3. Vercel自動デプロイ

## マーケティング方針（広告費0）
優先順位順：

1. **note/Zenn に「作った過程」を書く**（SEOにも効く）
   - 「非エンジニアがClaude Codeでバイブコーディングしてサービスを作った話」
   - 完成品より過程の方が読まれる・拡散される

2. **Xで発信**（`#個人開発` `#buildinpublic` タグ）
   - 進捗を垂れ流すビルドインパブリックスタイル
   - 「Claude使って街探しサービス作ってみた」は今バズりやすいネタ

3. **個人開発コミュニティにFBKもらいに行く**
   - Discordの個人開発サーバー（Discord Discoveryで検索）
   - 個人開発Slack
   - connpassのLT枠（5分で発表できる場所が毎週ある）

4. **ターゲットが集まる場所に直接投げ込む**
   - 上京相談系Xアカウントへのリプ
   - Reddit r/movingtojapan など

5. **Product Hunt**（英語圏、反応が良ければ）
   - Launch前にサポーターを集めておく必要あり

### このサービスの刺さる切り口
- ターゲットが明確（上京予定者・引越し検討者）
- 「非エンジニアがClaude Codeで作った」というストーリー自体がコンテンツ

## 開発ルール・方針
- AIを使った推薦はしない（全部ローカル計算）
- ファイルを増やしすぎない
- 変更したらVercelに自動デプロイされる（mainブランチにpushすればOK）
- 作業後は「何をしたか・なぜか」を非エンジニア向けに平易に説明する

## 写真の出所
- `public/images/towns/` に100枚のJPGが保存されている
- 100枚中80枚はGoogle Places APIから取得（EXIFにPicasaタグあり）
- 残り20枚はUnsplashから取得（generate-towns.mjsのimageMapに元URL記録あり）
- 写真は必ずしも「その街の駅前」ではなく、雰囲気が合う写真を選んでいる
- ライセンス: Google Places APIは規約内で商用利用OK。Unsplashも商用利用OK

## よくある問題
- `Prompt is too long` → `/clear` で会話をリセット。このCLAUDE.mdが文脈を引き継ぐ
