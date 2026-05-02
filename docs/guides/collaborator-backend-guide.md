# Stack Contributor Guide（共同開発者向けスタックガイド）

## このガイドの目的

`stack/` 配下の作業方針と、知見・サンプル・契約案を整理する際のルールを説明する。

---

## 基本方針

`stack/` 配下の各言語・フレームワーク・DB 実装は、以下を目的とした作業場である。

- **学習サンプル**: その技術の使い方を実際のコードで示す
- **技術記事の素材**: techrium 上の解説記事に使えるコード例・比較データ
- **API 契約案の整理**: 将来統合する際の参考契約（本番契約ではない）
- **Spike / PoC**: 技術的な実現可能性の検証

**`stack/` の実装は、MVP 段階でただちに本番バックエンドとして統合するものではない。**

本番統合が必要になった場合は、ADR（`docs/adr/`）でアーキテクチャ決定を記録し、メイン開発者のレビューを経ること。

---

## 配置ルール

| 種類 | 配置先 |
|---|---|
| フロント統合観点の資料 | `stack/framework/react/` |
| 言語別サンプル・検証コード | `stack/language/<language>/` |
| フレームワーク別 PoC・サンプル | `stack/framework/<framework>/` |
| DB 設計知見・接続サンプル | `stack/database/<db>/` |

---

## 各スタックで用意するもの

| ファイル | 内容 |
|---|---|
| `README.md` | そのスタックで何を扱うか（学習・検証・記事素材の方針） |
| `api/contract.md` | API 契約案（将来統合時の参考 / 学習用 — 本番契約ではない） |
| `project/` | 実行可能な最小構成（なければ `.gitkeep`） |
| `notes/workflow.md` | 環境構築メモ、学習ログ |
| `tests/` | 主要ロジックの確認テスト（任意） |
| `examples/` または `templates/` | サンプル入出力、テンプレート（任意） |

---

## api/contract.md の位置づけ

`api/contract.md` は **将来の本番統合に向けた参考契約案** であり、現時点での本番 API 仕様ではない。

記載内容:

- エンドポイント候補と HTTP メソッド
- リクエスト / レスポンス形式（JSON）
- 認証方式の案
- エラー時のレスポンス形式

フロントエンドと調整する際は、`stack/framework/react/api/contract.md` に統合観点の共通仕様を整理すること。

---

## 本番統合の条件

`stack/` の実装を本番バックエンドとして採用するには、以下をすべて満たす必要がある。

1. 単一 Web アプリ構成では解決しづらい明確な理由がある
2. 認証・認可・データ整合性の責務が明確である
3. 運用担当者が決まっている
4. `docs/adr/` に採用理由を ADR として記録する
5. API 契約、障害時の挙動、監視方法が定義されている

---

## React フロントとの連携観点

`stack/` で HTTP/JSON インターフェースを定義する場合は、将来フロントと接続しやすくするために以下を守ること。

- フィールド名を途中で変えない
- エラー時の JSON 形式も先に決める
- 認証が必要ならヘッダーや Cookie 方針を書く
- フロントで必要なデータ項目を勝手に削らない

---

## 新しいスタックワークスペースを追加するには

```bash
# scripts/new-stack.sh を使う
./scripts/new-stack.sh language python
./scripts/new-stack.sh framework fastapi
./scripts/new-stack.sh database postgres
```

スクリプトが `README.md`・`api/contract.md`・`notes/workflow.md` 等のテンプレートを自動生成する。
