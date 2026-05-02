# tech-atrium-wiki

`tech-atrium-wiki`（通称: techrium）は、開発部全員参加型の技術 Wiki / 学習ポータル / 技術共有プラットフォームである。
初学者・中級者・上級者の 3 階層に向けて技術情報を段階的に提供し、開発部員がフルスタックに近づくことを目的とする。

フロントエンドは `React / Next.js` を前提とし、メイン開発者が統合方針を主導する。共同開発者は `stack/` 配下で、各言語・フレームワーク・データベースごとの学習サンプルや PoC を持ち寄る（本番 API 群ではなく、学習・検証・記事素材・将来候補としての位置づけ）。

## 入口

- `docs/`: 要件、設計、運用、参照資料
- `stack/`: 技術スタック別の学習サンプル・検証コード・PoC
- `app/`: メインフロントエンドのページ
- `lib/api/`: フロントが参照する API 取得層とダミーデータ
- `content/`: 記事本文の MDX ファイル（Git 管理）

## まず読むもの

- `docs/README.md`
- `docs/specs/requirements.md`
- `docs/specs/design.md`
- `docs/operations/development-flow.md`
- `stack/README.md`
- `stack/contributor-guide.md`
- `stack/stack-map.md`

## オンボーディング

### メイン開発者向け

1. `docs/specs/requirements.md` と `docs/specs/design.md` を確認する
2. `app/` と `lib/api/` を起点に React フロントを整備する
3. API 受け口が必要な場合は `lib/api/data-source.ts` に集約する
4. インフラ方式（案 A / B / C）は `docs/specs/requirements.md` の要件 9 を参照して選択する

### 共同開発者向け

1. `stack/contributor-guide.md` を確認する
2. 自分の担当スタックを `stack/stack-map.md` から選ぶ
3. `stack/<category>/<stack-name>/` で `README.md`、`api/contract.md`、`project/` を更新する
4. `stack/` 内の実装は学習・検証目的であり、本番統合する場合は要件 9-3 のバックエンド分割条件を満たす必要がある

## デプロイ方式

MVP のデプロイ方式は以下の 3 案から選択する。詳細は `docs/specs/requirements.md` の要件 9 を参照。

| 案 | 構成 | 特徴 |
|---|---|---|
| A | Vercel + Supabase | 最短 MVP。BaaS 依存が強いが開発速度は最速 |
| B | Cloud Run + Neon PostgreSQL | Supabase / Vercel を避けたい場合の本命。コンテナ運用を学べる |
| C-1 | 全部 VPS + Docker Compose | 追加費用最小化。ただし運用負荷が高い |
| C-2 | Cloud Run + VPS DB | 可能だが初期 MVP には不推奨（ネットワーク設計が必要） |

**MVP ではいずれの場合もバックエンドを複数に分けず、単一アプリ構成を基本とする。**

## コンテンツ管理方針

- **記事本文**: MDX ファイルとして `content/` ディレクトリで Git 管理する
- **コメント・ユーザー・メタデータ**: PostgreSQL に保存する（インフラ方式に依存）
- この分離により、インフラ移行時もコンテンツを保全できる

## コンテンツ階層

| 層 | 名称 | 主なコンテンツ |
|---|---|---|
| 1 | Beginner / Overview | 技術スタックの概要・何に使うか・最初に覚えるべき概念・社内での使われ方 |
| 2 | Intermediate / Practice | よく使う実装パターン・Tips・過去のハマりどころ・ベストプラクティス |
| 3 | Extend / Advanced | 最新技術・技術選定比較・GitHubアカウント認証を通った部外者もコメント可能な議論領域 |

## Backend Policy

MVPでは、本番バックエンドを単一のWebアプリ / 単一の主要バックエンドに統一する。

`stack/` 配下の各言語・フレームワーク・DB実装は、学習・検証・記事作成・比較サンプル・将来拡張のための作業場であり、ただちに本番バックエンドとして統合するものではない。

本番バックエンドに新しいサービスを追加する場合は、以下を満たす必要がある。

1. 単一Webアプリ構成では解決しづらい明確な理由がある
2. 認証・認可・データ整合性の責務が明確である
3. 運用担当者が決まっている
4. `docs/adr/` にADRとして採用理由を記録する
5. API契約、障害時の挙動、監視方法が定義されている

## API 連携方針

- 初期状態ではフロントはダミーデータを表示する
- API エンドポイントが利用可能になったら、フロントはそのレスポンスで表示内容を上書きする
- フロントが参照するデータ形式は `lib/api/types.ts` と `lib/api/mock-data.ts` を基準に保つ

## 現在の進め方

- フロントの基盤は `React / Next.js`（単一 Web アプリ）
- インフラ方式は未確定のため、特定サービスに依存しない設計を優先する
- 技術スタックごとの学習・検証は `stack/language`、`stack/framework`、`stack/database` に分離
- ドキュメント更新と構成整理を先行し、その後に実装へ進む

## ディレクトリ概要

- `docs/specs`: 要件定義、設計書
- `docs/guides`: 共同開発者向けガイド
- `docs/operations`: 開発フロー、運用手順
- `docs/reference`: 参照資料
- `content/`: 記事本文 MDX（Git 管理）
- `stack/language`: 言語起点の学習サンプル・検証コード
- `stack/framework`: フレームワーク起点の学習サンプル・検証コード
- `stack/database`: DB 起点の接続検証・サンプル
- `app`: メインフロントのページ
- `lib/api`: API 呼び出し層、ダミーデータ、型定義
