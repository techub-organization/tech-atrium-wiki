# 要件定義書

## はじめに

tech-atrium-wiki（通称: techrium）は、開発者向けの動的な技術 Wiki プラットフォームである。
初学者・中級者・上級者の 3 階層のユーザーに対し、技術の特色・コード例・理論解説・最新トレンドを多層的に提供する。
技術カタログ機能と動的比較エンジンにより、複数の言語・フレームワーク・DB を視覚的に比較できる。
GitHub OAuth によるログイン、コメント機能、プルリク型の記事修正提案フローを備え、メイン開発者が React フロントを整備しつつ、共同開発者が `stack/` 配下で技術スタック別の API 実装案を並行して持ち寄れる設計とする。

---

## 用語集

- **tech-atrium-wiki**: 本プラットフォームの正式名称
- **techrium**: tech-atrium-wiki の通称
- **開発wiki**: 本プラットフォームの日本語名称
- **System**: tech-atrium-wiki 全体を指す総称
- **Content_Service**: MDX コンテンツの管理・配信を担うサブシステム
- **Auth_Service**: GitHub OAuth を用いた認証・認可を担うサブシステム（Supabase GoTrue）
- **Comparison_Engine**: 複数の Tech_Item を選択し、スペック情報を並列表示するサブシステム
- **Proposal_Service**: 記事修正提案の投稿・レビュー・マージを管理するサブシステム
- **Comment_Service**: 記事へのコメント投稿・表示を管理するサブシステム
- **Trend_Service**: 言語・インフラ別の最新トレンド情報を管理・配信するサブシステム
- **User**: GitHub OAuth でログインした登録ユーザー
- **Admin**: 記事・修正提案の承認権限を持つ管理者ユーザー
- **Article**: レベル（Base / Intermediate / Advanced）を持つ技術解説コンテンツ
- **Tech_Category**: 技術の分類（例: Language, Database, Framework）
- **Tech_Item**: Tech_Category に属する個別の技術エンティティ（例: PostgreSQL, TypeScript）
- **Tech_Spec**: Tech_Item に紐づくスペック指標（例: 書きやすさ 80/100）
- **Proposal**: ユーザーが提出する記事の修正提案
- **Comparison_Preset**: 推奨比較セット（例: モダンな Web 開発セット）
- **Techrium_Theme**: プリズム・虹色グラデーションを基調としたデザインテーマ
- **Stack Workspace**: 共同開発者が技術スタック別の API 契約、雛形、補助コードを配置する `stack/` 配下の作業領域
- **MDX**: Markdown + JSX を組み合わせたコンテンツ形式
- **LaTeX**: 数式・理論解説に用いる組版記法

---

## 要件

### 要件 1: ユーザー認証

**ユーザーストーリー:** 開発者として、GitHub アカウントでログインしたい。そうすることで、アカウント作成の手間なくプラットフォームの機能を利用できる。

#### 受け入れ基準

1. WHEN ユーザーが「GitHub でログイン」を選択したとき、THE Auth_Service SHALL GitHub OAuth 認証フローを開始する
2. WHEN GitHub OAuth 認証が成功したとき、THE Auth_Service SHALL github_id・name・avatar_url を Users テーブルに保存またはアップサートする
3. WHEN GitHub OAuth 認証が失敗したとき、THE Auth_Service SHALL エラーメッセージをユーザーに表示し、ログインページへリダイレクトする
4. WHILE ユーザーがログイン済みのとき、THE System SHALL ヘッダーにアバター画像とユーザー名を表示する
5. WHEN ユーザーがログアウトを選択したとき、THE Auth_Service SHALL セッションを破棄しトップページへリダイレクトする

---

### 要件 2: 技術カタログ管理

**ユーザーストーリー:** 管理者として、言語・フレームワーク・DB などの技術を独立したエンティティとして登録・管理したい。そうすることで、比較エンジンやコンテンツと一貫したデータを紐づけられる。

#### 受け入れ基準

1. THE System SHALL Tech_Category（Language, Database, Framework 等）を管理する機能を提供する
2. WHEN Admin が Tech_Item を登録するとき、THE System SHALL name・icon_url・metadata（基本コード・採用事例）を保存する
3. WHEN Admin が Tech_Spec を登録するとき、THE System SHALL label・value（数値スコア）・description を Tech_Item に紐づけて保存する
4. IF 同一 Tech_Category 内に同名の Tech_Item が既に存在するとき、THEN THE System SHALL 重複エラーを返し登録を中止する
5. THE System SHALL Tech_Item の一覧を Tech_Category 別にフィルタリングして表示する機能を提供する

---

### 要件 3: 多層的コンテンツ（Article）管理

**ユーザーストーリー:** 開発者として、同一テーマに対して自分のレベルに合った解説を読みたい。そうすることで、基礎から応用まで段階的に学習できる。

#### 受け入れ基準

1. THE Content_Service SHALL Article に Base・Intermediate・Advanced の 3 段階のレベルフラグを付与する
2. WHEN ユーザーが Article ページを開いたとき、THE Content_Service SHALL 選択されたレベルに対応する MDX コンテンツを表示する
3. WHERE Intermediate または Advanced レベルの Article において、THE Content_Service SHALL LaTeX 記法で記述された数式を正しくレンダリングする
4. THE Content_Service SHALL MDX ファイルを解析し、Article オブジェクトとして表示する
5. THE Content_Service SHALL Article オブジェクトを MDX 形式に整形して出力する
6. FOR ALL 有効な Article オブジェクトについて、MDX 解析 → 整形 → 再解析を行ったとき、THE Content_Service SHALL 元の Article オブジェクトと等価なオブジェクトを返す（ラウンドトリップ特性）
7. IF MDX ファイルの解析に失敗したとき、THEN THE Content_Service SHALL 解析エラーの詳細をログに記録し、エラーページを表示する

---

### 要件 4: 動的比較エンジン

**ユーザーストーリー:** 開発者として、複数の技術をスマホ機種比較のような UI で並列比較したい。そうすることで、技術選定の意思決定を効率化できる。

#### 受け入れ基準

1. WHEN ユーザーが 2 つ以上の Tech_Item を選択したとき、THE Comparison_Engine SHALL 選択された Tech_Item の Tech_Spec・基本コード・採用事例をテーブル形式で並列表示する
2. THE Comparison_Engine SHALL 各 Tech_Spec の指標（Performance・Developer Experience・Community/Ecosystem）をテーマカラー（赤・青・緑系）で色分けして表示する
3. THE Comparison_Engine SHALL レーダーチャートを用いて Tech_Item の比較スコアを視覚的に表示する
4. WHEN ユーザーが Comparison_Preset を選択したとき、THE Comparison_Engine SHALL プリセットに定義された Tech_Item を自動的に選択し比較表示する
5. THE System SHALL 「モダンな Web 開発セット」「高負荷耐性セット」を含む Comparison_Preset を提供する
6. IF 選択された Tech_Item に Tech_Spec データが存在しないとき、THEN THE Comparison_Engine SHALL 該当セルに「データなし」と表示し、他の Tech_Item の比較表示を継続する

---

### 要件 5: GitHub 連携コメント機能

**ユーザーストーリー:** ログイン済みの開発者として、Article にコメントを投稿したい。そうすることで、技術的な議論や補足情報を共有できる。

#### 受け入れ基準

1. WHILE ユーザーがログイン済みのとき、THE Comment_Service SHALL Article ページにコメント投稿フォームを表示する
2. WHEN ユーザーがコメントを投稿したとき、THE Comment_Service SHALL コメント内容・投稿者 ID・投稿日時を保存し、Article ページに表示する
3. IF コメント内容が空文字列のとき、THEN THE Comment_Service SHALL 投稿を拒否しバリデーションエラーメッセージを表示する
4. WHILE ユーザーが未ログインのとき、THE Comment_Service SHALL コメント投稿フォームの代わりにログインを促すメッセージを表示する
5. THE Comment_Service SHALL Article に紐づくコメントを投稿日時の昇順で表示する

---

### 要件 6: プルリク型記事修正提案

**ユーザーストーリー:** ログイン済みの開発者として、Article の誤りや改善点を修正提案として提出したい。そうすることで、コミュニティ主導でコンテンツの品質を向上できる。

#### 受け入れ基準

1. WHILE ユーザーがログイン済みのとき、THE Proposal_Service SHALL Article ページに「修正を提案する」ボタンを表示する
2. WHEN ユーザーが修正提案を提出したとき、THE Proposal_Service SHALL diff_content・article_id・user_id を保存し、ステータスを open に設定する
3. WHEN Admin が Proposal を承認したとき、THE Proposal_Service SHALL diff_content を Article に適用し、ステータスを merged に更新する
4. WHEN Admin が Proposal を却下したとき、THE Proposal_Service SHALL ステータスを closed に更新し、提案者に通知する
5. THE Proposal_Service SHALL open ステータスの Proposal 一覧を Admin 向けに表示する
6. IF 同一 Article に対して同一 User が既に open ステータスの Proposal を持つとき、THEN THE Proposal_Service SHALL 新規提案の提出を拒否し、既存提案の編集を促すメッセージを表示する

---

### 要件 7: トレンドフィルタリング・検索

**ユーザーストーリー:** 上級者として、言語・インフラ別の最新トレンドをフィルタリング・検索して把握したい。そうすることで、技術動向を効率的にキャッチアップできる。

#### 受け入れ基準

1. THE Trend_Service SHALL Article および Tech_Item をキーワード・Tech_Category・レベルで絞り込む検索機能を提供する
2. WHEN ユーザーが検索クエリを入力したとき、THE Trend_Service SHALL 入力から 300ms 以内に候補一覧を表示する
3. THE Trend_Service SHALL トレンドタグ（例: 「2025 注目」「高負荷対応」）を Tech_Item および Article に付与する機能を提供する
4. WHEN ユーザーがトレンドタグを選択したとき、THE Trend_Service SHALL 該当タグを持つ Article および Tech_Item の一覧を表示する
5. IF 検索クエリに一致する Article および Tech_Item が存在しないとき、THEN THE Trend_Service SHALL 「該当する結果が見つかりませんでした」と表示する

---

### 要件 8: UI・デザインシステム（Techrium Theme）

**ユーザーストーリー:** 開発者として、視覚的に直感的なインターフェースで技術情報を閲覧したい。そうすることで、情報の理解と比較が容易になる。

#### 受け入れ基準

1. THE System SHALL Techrium Theme（プリズム・虹色グラデーション）を全ページに適用する
2. THE System SHALL Performance 指標を赤色系、Developer Experience 指標を青色系、Community/Ecosystem 指標を緑色系で表示する
3. THE System SHALL モバイル・タブレット・デスクトップの各ブレークポイントでレイアウトが崩れないレスポンシブデザインを提供する
4. WHEN ページが初回ロードされるとき、THE System SHALL Largest Contentful Paint を 2.5 秒以内に完了する
5. WHERE ユーザーがダークモードを OS 設定で有効にしているとき、THE System SHALL Techrium Theme のダークモードバリアントを適用する

---

### 要件 9: フェーズ別デプロイ・インフラ

**ユーザーストーリー:** 開発チームとして、段階的にフィーチャーをリリースしたい。そうすることで、リスクを抑えながら継続的に機能を拡張できる。

#### 受け入れ基準

1. THE System SHALL Next.js（SSG/SSR 混合）を Vercel 上にデプロイし、静的ページと動的ページを適切に使い分ける
2. THE System SHALL Supabase PostgreSQL をデータストアとして使用し、マイグレーションファイルでスキーマを管理する
3. THE System SHALL Phase 1（Next.js + Tailwind 環境・MDX スキーマ・比較コンポーネント）、Phase 2（Supabase 統合・GitHub OAuth・コメント）、Phase 3（修正提案・トレンドフィルタリング・本番デプロイ）の順序でリリースする
4. IF Supabase への接続が失敗したとき、THEN THE System SHALL エラーをログに記録し、ユーザーにサービス一時停止メッセージを表示する
5. THE System SHALL Supabase Storage を画像（アバター・Tech_Item アイコン）の保存先として使用する
6. THE System SHALL 言語・フレームワークごとの担当者が並行して記事・比較データ・UI コンポーネントを更新できるよう、コンテンツ・表示ロジック・データモデルを疎結合に保つ
7. THE System SHALL `stack/` 配下で共同開発者が言語・フレームワーク・データベースごとの API 契約と実装雛形を管理できるようにする
8. THE System SHALL 共同開発者が提出する API 実装について、React フロントが扱いやすい HTTP/JSON インターフェースを基本契約とする
