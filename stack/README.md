# Stack Workspace

## 目的

`stack/` は、共同開発者が各技術スタックごとの API 実装案、サンプル、契約、補助コードを持ち寄るための作業ディレクトリである。

フロントエンドは `React` 側で統合し、共同開発者はこの配下で各スタックの API 仕様と実装候補を整理する。

## 構成

- `language/`: 言語起点の API 実装案
- `framework/`: フレームワーク起点の API 実装案
- `database/`: DB 起点の接続方針、スキーマ、補助 API 方針

## ルール

- 各スタックには `README.md`、`api/`、`project/` を基本セットとして置く
- API 契約は Markdown で残す
- DB 単体では API を返せないため、必要なら TypeScript か任意言語の補助 API を併記する
