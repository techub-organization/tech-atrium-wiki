# Backend Workspace

## 目的

フロントエンドは React を共通基盤に固定し、共同開発者が好きな言語・フレームワーク・データベースでバックエンドを実装できるようにする。

## ルール

- 各実装は `backend/<language-or-stack>/` 配下に置く
- API 仕様は React フロントから呼びやすい HTTP/JSON を基本とする
- DB 単体では API を持てないため、その場合は好きな言語、または React と互換性の高い TypeScript で補助 API を実装する
- 認証、エラーレスポンス、データ契約は Markdown に残す

## 例

- `python-fastapi`
- `typescript-express`
- `rust-axum`
- `dart-shelf`
