# 共同開発者向け API ガイド

## 方針

フロントエンドはメイン開発者が `React / Next.js` を共通基盤として整備する。共同開発者は、好きな言語・フレームワーク・データベースで API 実装案を持ち寄ってよい。

ただし、React フロントから統合しやすくするため、インターフェースはできるだけ HTTP/JSON を基本とする。

## 配置ルール

- フロント統合観点の資料は `stack/framework/react/` 配下
- 言語別 API 案は `stack/language/` 配下
- フレームワーク別 API 案は `stack/framework/` 配下
- DB 起点の接続方針は `stack/database/` 配下

## バックエンド実装ルール

- 各共同開発者は `stack/<category>/<stack-name>/` を単位に作業する
- 最低でも `README.md`、`api/contract.md`、`project/` を用意する
- エンドポイント、入出力、依存 DB を Markdown に記載する
- レスポンス形式は React フロントが扱いやすい JSON を優先する

## DB 系担当への方針

データベース担当が単独で API 実装まで持てない場合は、以下のどちらかを選ぶ。

1. 好きな言語で最小 API を実装する
2. TypeScript で補助 API を実装して React 側との接続を単純化する

## 推奨構成

- `stack/language/python`: Python 起点の API 案
- `stack/framework/fastapi`: FastAPI 案
- `stack/language/typescript`: TypeScript 起点の API 案
- `stack/framework/express`: Express 案
- `stack/database/postgres`: Postgres 起点の接続方針

## 最低限そろえるもの

- `README.md`: その実装の責務
- `api/contract.md`: エンドポイントとレスポンス形式
- `project/`: 実行可能な雛形
- 必要なら `tests/`: 主要 API の確認
- 必要なら `examples/` と `templates/`: サンプル request/response やメタデータ例

## React との統合観点

- URL とレスポンス形式を安定させる
- フロントで必要なデータ項目を勝手に削らない
- 認証が必要な API は認証方式を明記する
- エラー時の形式も成功時と同じくらい重要として扱う
