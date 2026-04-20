# tech-atrium-wiki

`tech-atrium-wiki` は、開発者向けの技術 Wiki プラットフォームの設計・運用・技術スタック検討を進めるためのリポジトリである。

現時点では、フロントエンドは `React / Next.js` を前提とし、メイン開発者が統合方針を主導する。共同開発者は `stack/` 配下で、各言語・フレームワーク・データベースごとの API 契約、雛形、接続方針を持ち寄る。

## 入口

- `docs/`: 要件、設計、運用、参照資料
- `stack/`: 技術スタック別の API 契約、サンプル、実装雛形

## まず読むもの

- `docs/README.md`
- `docs/specs/requirements.md`
- `docs/specs/design.md`
- `docs/operations/development-flow.md`
- `stack/README.md`
- `stack/contributor-guide.md`
- `stack/stack-map.md`

## 現在の進め方

- フロントの基盤は `React / Next.js`
- 技術スタックごとの API 検討は `stack/language`、`stack/framework`、`stack/database` に分離
- 共同開発者は HTTP/JSON を基本契約として API 案を整理する
- ドキュメント更新と構成整理を先行し、その後に実装へ進む

## ディレクトリ概要

- `docs/specs`: 要件定義、設計書
- `docs/guides`: 共同開発者向けガイド
- `docs/operations`: 開発フロー、運用手順
- `docs/reference`: 参照資料
- `stack/language`: 言語起点の API 雛形
- `stack/framework`: フレームワーク起点の API 雛形
- `stack/database`: DB 起点の接続方針
