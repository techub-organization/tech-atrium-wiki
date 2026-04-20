# 共同開発者向けバックエンドガイド

## 方針

フロントエンドは `React` を共通基盤として利用する。共同開発者は、好きな言語・フレームワーク・データベースでバックエンドを実装してよい。

ただし、React フロントから統合しやすくするため、インターフェースはできるだけ HTTP/JSON を基本とする。

## 配置ルール

- フロントエンド関連は `framework/react/` 配下
- バックエンド関連は `backend/` 配下
- 言語別サンプルや記事補助資産は `language/` 配下
- DB スキーマやローカル検証資産は `database/` 配下

## バックエンド実装ルール

- 各共同開発者は `backend/<stack-name>/` を単位に作業する
- 最低でも `README.md`、`api-contract.md`、`project/` を用意する
- エンドポイント、入出力、依存 DB を Markdown に記載する
- レスポンス形式は React フロントが扱いやすい JSON を優先する

## DB 系担当への方針

データベース担当が単独で API 実装まで持てない場合は、以下のどちらかを選ぶ。

1. 好きな言語で最小 API を実装する
2. TypeScript で補助 API を実装して React 側との接続を単純化する

## 推奨構成

- `backend/python-fastapi`: Python API
- `backend/typescript-express`: TypeScript API
- `backend/rust-axum`: Rust API
- `backend/dart-shelf`: Dart API

## 最低限そろえるもの

- `README.md`: その実装の責務
- `api-contract.md`: エンドポイントとレスポンス形式
- `project/`: 実行可能な雛形
- 必要なら `tests/`: 主要 API の確認

## React との統合観点

- URL とレスポンス形式を安定させる
- フロントで必要なデータ項目を勝手に削らない
- 認証が必要な API は認証方式を明記する
- エラー時の形式も成功時と同じくらい重要として扱う
