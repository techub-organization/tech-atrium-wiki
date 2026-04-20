# Stack Contributor Guide

## 前提

- フロントは `React` で統合する
- 共同開発者は、担当スタックの API をその技術スタック言語、または TypeScript で実装する
- 受け渡しは HTTP/JSON を基本とする

## 最低限そろえるもの

- `README.md`: そのスタックで何を担当するか
- `api/contract.md`: エンドポイントとレスポンス形式
- `project/`: 実行可能な最小構成
- `examples/` または `templates/`: サンプル入力や出力

## React 連携観点

- フィールド名を途中で変えない
- エラー時の JSON 形式も先に決める
- 認証が必要ならヘッダーや Cookie 方針を書く
