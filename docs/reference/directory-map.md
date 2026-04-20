# Directory Map

## Top Level

- `docs`: 仕様、運用、ガイド、参照資料
- `stack`: 共同開発者が技術スタック別の API 契約、雛形、接続方針を管理する作業領域

## Docs Layout

- `docs/specs`: 要件定義、設計書
- `docs/guides`: 共同開発者向けガイド
- `docs/operations`: 開発フロー、運用文書
- `docs/reference`: ディレクトリマップや参照資料

## Stack Layout

- `stack/language`: 言語起点の API 雛形
- `stack/framework`: フレームワーク起点の API 雛形
- `stack/database`: DB 起点の接続方針、補助 API 方針

## Conventions

- 入口説明は `README.md`
- 草案やテンプレートは `templates`
- 作業メモは `notes`
- 実行可能な雛形は `project`
- 検証系は `tests` または `migrations` / `seeds`
