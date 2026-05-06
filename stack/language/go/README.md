# Go

Go で学習・検証・記事素材を整理するための作業入口。

## 位置づけ

- `stack/` 配下では、Go を本番バックエンドとして直ちに採用する前提ではなく、学習・比較・記事素材として扱う
- Go はシンプルな HTTP API、CLI、バッチ、インフラ周辺ツールの題材として相性がよい

## このディレクトリを基準にしたい理由

Go は、言語系ディレクトリで必要になりやすい要素を一通り含めやすい。

- 言語紹介用の記事素材
- 一覧ページ向けの短い抜粋
- 初学者向けと中級者向けの分離
- 最小実行サンプル
- API 契約案
- 学習メモ

そのため、今後の `stack/language/<name>/` を整理するときの参考構成として使える。

## 推奨構成

```text
stack/language/go/
├── README.md
├── api/
│   ├── contract.md
│   └── openapi.yaml
├── examples/
│   ├── main.go
│   └── request.json
├── notes/
│   ├── README.md
│   ├── listing-summary.md
│   ├── workflow.md
│   ├── beginner/
│   │   └── language-page.md
│   └── intermediate/
│       ├── syntax-intro.md
│       ├── python-rust-comparison.md
│       └── use-cases.md
├── project/
│   ├── go.mod
│   └── main.go
├── templates/
│   └── article_metadata.yaml
├── tests/
│   └── README.md
└── go.tex
```

## ディレクトリごとの役割

### `api/`

- 将来の参考用 API 契約案
- 本番採用前提ではなく、学習・比較用の素材

### `examples/`

- その言語らしさが伝わる最小コード
- 記事本文や比較表から参照しやすい短い例

### `notes/`

- 記事素材の中心
- 一覧用の短い説明と、詳細ページ用のロングフォームを分ける

### `project/`

- 実際に動かせる最小構成
- 学習や PoC の実行確認に使う

### `templates/`

- 記事メタデータや雛形

### `tests/`

- 検証観点や最小テストの置き場

### `go.tex`

- LaTeX ベースの記事素材や組版実験の下書き

## 記事素材の分け方

- 一覧ページ向けの短い要約: `notes/listing-summary.md`
- 初学者向けの詳細: `notes/beginner/language-page.md`
- 中級者向けの詳細:
  - `notes/intermediate/syntax-intro.md`
  - `notes/intermediate/python-rust-comparison.md`
  - `notes/intermediate/use-cases.md`

一覧では「何に向く言語か」を短く伝える。

- 初学者向け詳細では、Go とは何か、どんな場面で使われるか、メリット・デメリット、代表的な採用例を扱う
- 中級者向け詳細では、文法の入口、他言語比較、Go で作れるものを wiki 的に整理する
