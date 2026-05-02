# Directory Map

## Top Level

- `docs`: 仕様、運用、ガイド、参照資料、ADR
- `stack`: 共同開発者が技術スタック別の学習サンプル・PoC・検証コードを管理する作業領域（本番 API 群ではない）
- `content`: 記事本文の MDX ファイル（Git 管理）
- `app`: メインフロントエンドのページ
- `lib/api`: API 呼び出し層、型定義、仮データ
- `scripts`: 開発補助スクリプト（スタックワークスペース作成等）

## Docs Layout

- `docs/specs`: 要件定義、設計書
- `docs/guides`: 共同開発者向けガイド
- `docs/operations`: 開発フロー、運用文書
- `docs/reference`: ディレクトリマップや参照資料
- `docs/adr`: Architecture Decision Records（アーキテクチャ決定記録）

## Stack Layout

- `stack/language`: 言語別の学習サンプル・検証コード・記事素材
- `stack/framework`: フレームワーク別の学習サンプル・PoC・記事素材
- `stack/database`: DB 設計知見・接続サンプル・スキーマ例

`stack/` への追加は `./scripts/new-stack.sh <category> <name>` で行う。

## ADR Layout

`docs/adr/` には以下の形式で記録する。

```
docs/adr/
├── README.md           # ADR の概要と一覧
├── 0001-backend-policy.md
└── 0002-<topic>.md
```

ADR が必要なタイミング:
- デプロイ方式の確定（案 A / B / C）
- バックエンドサービスの追加（`stack/` 実装の本番統合）
- 認証方式の選択（Supabase Auth / Auth.js）
- その他、取り消しにくいアーキテクチャ上の判断

## Conventions

- 入口説明は `README.md`
- 草案やテンプレートは `templates`
- 作業メモは `notes`
- 実行可能な雛形は `project`
- 検証系は `tests` または `migrations` / `seeds`
