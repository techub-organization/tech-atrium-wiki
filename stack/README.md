# Stack Workspace

## 目的

`stack/` は、共同開発者が各技術スタックごとの **学習サンプル・PoC・検証コード・記事素材** を持ち寄るための作業ディレクトリである。

**ここは本番 API 群の置き場ではない。**

MVP 段階では、本番バックエンドは単一の Web アプリ（Next.js）に統合する。
`stack/` の各実装が本番に採用されるには、ADR 審査とメイン開発者のレビューが必要である（詳細: `docs/adr/0001-backend-policy.md`）。

## stack/ が担うこと

- 各言語・フレームワーク・DB の技術理解と実装サンプル
- techrium 上の技術解説記事・比較記事の素材
- 将来の本番切り出し候補の蓄積
- API 契約案の整理（将来統合時の参考 — 現時点での本番契約ではない）
- 技術的な実現可能性の検証（Spike / PoC）

## 構成

- `language/`: 言語起点の学習サンプル・検証コード
- `framework/`: フレームワーク起点の学習サンプル・PoC
- `database/`: DB 設計知見・接続サンプル・スキーマ例

## 各スタックの基本セット

```
stack/<category>/<stack-name>/
├── README.md           # 目的・学習テーマ・記事素材の方針
├── api/
│   └── contract.md     # 参考 API 契約案（将来統合時の参考 / 学習用）
├── notes/
│   └── workflow.md     # 環境構築メモ・学習ログ
├── project/            # 実行可能な最小構成
└── tests/              # 検証テスト（任意）
```

## 参考基準

共同開発者が `stack/language/` 配下を整備するときは、まず `stack/language/go/` を参考基準として見ること。

- `README.md` にディレクトリ全体の目的と構成方針を書く
- `notes/` を一覧向け、初学者向け、中級者向けに分けられるようにする
- `examples/`, `project/`, `api/`, `templates/`, `tests/` の役割を分ける

Go ディレクトリは、言語系ディレクトリをどう揃えるかの基準例として `main` に置いている。

## 新しいスタックを追加するには

```bash
./scripts/new-stack.sh <category> <stack-name>

# 例
./scripts/new-stack.sh language python
./scripts/new-stack.sh framework fastapi
./scripts/new-stack.sh database postgres
```

## 本番採用の条件

`stack/` の実装を本番バックエンドとして採用するには、以下をすべて満たす必要がある。

1. 単一 Web アプリ構成では解決しづらい明確な理由がある
2. 認証・認可・データ整合性の責務が明確である
3. 運用担当者が決まっている
4. `docs/adr/` に採用理由を記録する
5. API 契約、障害時の挙動、監視方法が定義されている
