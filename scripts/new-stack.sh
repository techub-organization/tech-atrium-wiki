#!/usr/bin/env bash
# new-stack.sh - 新しいスタックワークスペースをテンプレートから作成する
#
# Usage:
#   ./scripts/new-stack.sh <category> <stack-name>
#
# Examples:
#   ./scripts/new-stack.sh language python
#   ./scripts/new-stack.sh framework fastapi
#   ./scripts/new-stack.sh database postgres

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# ── usage ─────────────────────────────────────────────────────────────────────

usage() {
  cat <<EOF
Usage: $(basename "$0") <category> <stack-name>

Arguments:
  category    language | framework | database
  stack-name  追加するスタック名（例: python, fastapi, postgres）

Examples:
  $(basename "$0") language  python
  $(basename "$0") language  rust
  $(basename "$0") framework fastapi
  $(basename "$0") framework gin
  $(basename "$0") database  postgres

Existing stacks:
  language:  $(ls "$REPO_ROOT/stack/language"  2>/dev/null | tr '\n' ' ')
  framework: $(ls "$REPO_ROOT/stack/framework" 2>/dev/null | tr '\n' ' ')
  database:  $(ls "$REPO_ROOT/stack/database"  2>/dev/null | tr '\n' ' ')
EOF
}

# ── 引数チェック ──────────────────────────────────────────────────────────────

if [[ $# -ne 2 ]]; then
  usage
  exit 1
fi

CATEGORY="$1"
STACK_NAME="$2"

case "$CATEGORY" in
  language|framework|database) ;;
  *)
    echo "Error: category must be one of: language, framework, database"
    echo ""
    usage
    exit 1
    ;;
esac

# ── パス解決 ──────────────────────────────────────────────────────────────────

TARGET_DIR="$REPO_ROOT/stack/$CATEGORY/$STACK_NAME"

if [[ -d "$TARGET_DIR" ]]; then
  echo "Error: $TARGET_DIR already exists."
  exit 1
fi

# ── ディレクトリ作成 ───────────────────────────────────────────────────────────

mkdir -p "$TARGET_DIR/api"
mkdir -p "$TARGET_DIR/notes"
mkdir -p "$TARGET_DIR/project"
mkdir -p "$TARGET_DIR/tests"

# ── README.md ─────────────────────────────────────────────────────────────────

cat > "$TARGET_DIR/README.md" << EOF
# ${STACK_NAME}（${CATEGORY}）

## 目的

このワークスペースは以下を目的とした学習・検証・記事素材の置き場である。

- $STACK_NAME の技術特性の理解とサンプル実装
- techrium 上の解説記事・比較記事の素材
- 将来の本番統合候補の PoC

> **注意**: ここは本番バックエンド実装ではない。
> 本番採用には ADR（\`docs/adr/\`）とメイン開発者のレビューが必要。
> 詳細: \`docs/adr/0001-backend-policy.md\`

## 学習テーマ

- [ ] 基本的な使い方・セットアップ
- [ ] 特徴的な機能・設計思想
- [ ] 他スタックとの比較ポイント
- [ ] ハマりどころ・解決策

## 記事素材として使えるもの

- \`project/\`: 実行可能なサンプルコード
- \`notes/workflow.md\`: 環境構築・学習ログ
- \`api/contract.md\`: API 設計案（将来統合時の参考）

## 参考リンク

- 公式ドキュメント: <!-- URL -->
- 関連記事: <!-- URL -->
EOF

# ── api/contract.md ───────────────────────────────────────────────────────────

cat > "$TARGET_DIR/api/contract.md" << EOF
# API Contract: $STACK_NAME

> これは将来統合時の参考契約案であり、現時点での本番 API 仕様ではない。
> 本番採用には \`docs/adr/\` への記録が必要。

## エンドポイント候補

### GET /api/$STACK_NAME/health

ヘルスチェック用エンドポイント。

**Response**

\`\`\`json
{
  "status": "ok",
  "stack": "$STACK_NAME"
}
\`\`\`

---

### GET /api/$STACK_NAME/items

（例）アイテム一覧取得。実際のエンドポイントに合わせて修正する。

**Response**

\`\`\`json
{
  "items": [],
  "total": 0
}
\`\`\`

**Error Response**

\`\`\`json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "エラーの説明"
  }
}
\`\`\`

## 認証方式の案

- 方式: （例: Bearer Token / Cookie / なし）
- 詳細: 未定

## 備考

- フィールド名は一度決めたら変更しない
- エラー形式は成功時と同じ重要度で扱う
EOF

# ── notes/workflow.md ─────────────────────────────────────────────────────────

cat > "$TARGET_DIR/notes/workflow.md" << EOF
# Workflow Notes: $STACK_NAME

## 環境構築

\`\`\`bash
# セットアップ手順をここに書く
\`\`\`

## 動作確認

\`\`\`bash
# 実行コマンドをここに書く
\`\`\`

## 学習ログ

### $(date +%Y-%m-%d)

- 初期セットアップ完了

## ハマりどころ

<!-- 詰まった点と解決策を記録する -->
EOF

# ── tests/README.md ───────────────────────────────────────────────────────────

cat > "$TARGET_DIR/tests/README.md" << EOF
# Tests: $STACK_NAME

## テスト方針

このディレクトリには、$STACK_NAME のサンプル実装に対する確認テストを置く。

## 実行方法

\`\`\`bash
# テスト実行コマンドをここに書く
\`\`\`
EOF

# ── project/.gitkeep ─────────────────────────────────────────────────────────

touch "$TARGET_DIR/project/.gitkeep"

# ── 完了メッセージ ─────────────────────────────────────────────────────────────

echo ""
echo "Created: stack/$CATEGORY/$STACK_NAME/"
echo ""
echo "  stack/$CATEGORY/$STACK_NAME/"
echo "  ├── README.md"
echo "  ├── api/contract.md"
echo "  ├── notes/workflow.md"
echo "  ├── project/         (実装を置く)"
echo "  └── tests/README.md"
echo ""
echo "Next steps:"
echo "  1. README.md の学習テーマを埋める"
echo "  2. project/ にサンプルコードを追加する"
echo "  3. notes/workflow.md に環境構築手順を記録する"
