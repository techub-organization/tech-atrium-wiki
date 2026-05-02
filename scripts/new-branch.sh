#!/usr/bin/env bash
# new-branch.sh - ブランチ命名規約に沿ったブランチを作成する
#
# Usage:
#   ./scripts/new-branch.sh <type> <description>
#
# Examples:
#   ./scripts/new-branch.sh feature auth-login
#   ./scripts/new-branch.sh fix     comment-validation
#   ./scripts/new-branch.sh docs    task-split
#   ./scripts/new-branch.sh spike   rust-cli-prototype
#   ./scripts/new-branch.sh adr     deploy-option

set -euo pipefail

# ── 定数 ──────────────────────────────────────────────────────────────────────

VALID_TYPES=(feature fix docs refactor spike adr stack)

# ── usage ─────────────────────────────────────────────────────────────────────

usage() {
  cat <<EOF
Usage: $(basename "$0") <type> <description>

Arguments:
  type         ブランチ種別（下記一覧参照）
  description  ブランチの説明（スペース・アンダースコアはハイフンに変換）

Branch types:
  feature    新機能の追加         例: feature/auth-login
  fix        不具合修正           例: fix/comment-validation
  docs       ドキュメント変更     例: docs/task-split
  refactor   責務整理・リファクタ 例: refactor/comparison-schema
  spike      技術検証・試作 PoC   例: spike/rust-cli-prototype
  adr        アーキテクチャ決定   例: adr/deploy-option
  stack      stack/ への追加      例: stack/add-python-samples

Options:
  -b <base>  分岐元ブランチ（省略時: 現在のブランチ）
  -p         作成後に origin へ push する
  -h         このヘルプを表示する

Examples:
  $(basename "$0") feature auth-login
  $(basename "$0") fix     comment-validation
  $(basename "$0") spike   rust-cli-prototype
  $(basename "$0") -b main feature user-profile
  $(basename "$0") -p      docs    update-readme
EOF
}

# ── オプション解析 ─────────────────────────────────────────────────────────────

BASE_BRANCH=""
PUSH=false

while getopts ":b:ph" opt; do
  case "$opt" in
    b) BASE_BRANCH="$OPTARG" ;;
    p) PUSH=true ;;
    h) usage; exit 0 ;;
    :) echo "Error: -${OPTARG} requires an argument."; echo ""; usage; exit 1 ;;
    \?) echo "Error: unknown option -${OPTARG}"; echo ""; usage; exit 1 ;;
  esac
done
shift $((OPTIND - 1))

# ── 引数チェック ──────────────────────────────────────────────────────────────

if [[ $# -lt 2 ]]; then
  usage
  exit 1
fi

TYPE="$1"
shift
# 残りの引数を結合してdescriptionにする（スペース区切りで渡せるように）
DESCRIPTION="$*"

# ── バリデーション ─────────────────────────────────────────────────────────────

valid=false
for t in "${VALID_TYPES[@]}"; do
  [[ "$TYPE" == "$t" ]] && valid=true && break
done

if [[ "$valid" == false ]]; then
  echo "Error: unknown type '${TYPE}'"
  echo "  Valid types: ${VALID_TYPES[*]}"
  echo ""
  usage
  exit 1
fi

# description をブランチ名として安全な形式に変換
# スペース・アンダースコア → ハイフン、大文字 → 小文字、不正文字を除去
SLUG="$(echo "$DESCRIPTION" \
  | tr '[:upper:]' '[:lower:]' \
  | tr ' _' '-' \
  | sed 's/[^a-z0-9-]//g' \
  | sed 's/--*/-/g' \
  | sed 's/^-//' \
  | sed 's/-$//')"

if [[ -z "$SLUG" ]]; then
  echo "Error: description が空か、使用できない文字のみです。"
  exit 1
fi

BRANCH_NAME="${TYPE}/${SLUG}"

# ── git チェック ──────────────────────────────────────────────────────────────

if ! git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --git-dir > /dev/null 2>&1; then
  echo "Error: git リポジトリが見つかりません。"
  exit 1
fi

REPO_ROOT="$(git -C "$(dirname "${BASH_SOURCE[0]}")" rev-parse --show-toplevel)"

# 既存ブランチ確認（ローカル）
if git -C "$REPO_ROOT" show-ref --verify --quiet "refs/heads/${BRANCH_NAME}"; then
  echo "Error: ブランチ '${BRANCH_NAME}' は既に存在します。"
  echo ""
  echo "  既存ブランチに切り替える場合:"
  echo "    git checkout ${BRANCH_NAME}"
  exit 1
fi

# 分岐元の確定
if [[ -z "$BASE_BRANCH" ]]; then
  BASE_BRANCH="$(git -C "$REPO_ROOT" symbolic-ref --short HEAD 2>/dev/null || echo "HEAD")"
fi

# 分岐元ブランチの存在確認
if ! git -C "$REPO_ROOT" show-ref --verify --quiet "refs/heads/${BASE_BRANCH}" && \
   ! git -C "$REPO_ROOT" show-ref --verify --quiet "refs/remotes/origin/${BASE_BRANCH}"; then
  echo "Error: 分岐元ブランチ '${BASE_BRANCH}' が見つかりません。"
  exit 1
fi

# ── ブランチ作成 ──────────────────────────────────────────────────────────────

echo ""
echo "Creating branch: ${BRANCH_NAME}"
echo "  Base: ${BASE_BRANCH}"
echo ""

git -C "$REPO_ROOT" checkout -b "$BRANCH_NAME" "$BASE_BRANCH"

echo ""
echo "Switched to new branch '${BRANCH_NAME}'"

# ── push（オプション） ────────────────────────────────────────────────────────

if [[ "$PUSH" == true ]]; then
  echo ""
  echo "Pushing to origin..."
  git -C "$REPO_ROOT" push -u origin "$BRANCH_NAME"
  echo ""
  echo "  remote: origin/${BRANCH_NAME}"
fi

# ── 完了メッセージ ─────────────────────────────────────────────────────────────

echo ""
echo "Done."
echo ""
echo "  Branch:  ${BRANCH_NAME}"
echo "  Base:    ${BASE_BRANCH}"
if [[ "$PUSH" == false ]]; then
  echo ""
  echo "  origin に push するには:"
  echo "    git push -u origin ${BRANCH_NAME}"
  echo "  または:"
  echo "    $(basename "$0") -p ${TYPE} ${DESCRIPTION}"
fi
