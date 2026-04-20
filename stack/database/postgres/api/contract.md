# Postgres Support API Contract

## Notes

Postgres を使う API 実装は任意言語でよいが、React 側が扱う JSON 形式は安定させる。

## Required Endpoints

- `GET /health`
- `GET /postgres/articles`
- `POST /postgres/comments`
