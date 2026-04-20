# SQLite Support API Contract

## Notes

SQLite は DB そのものなので、単体で API を返すのではなく、TypeScript か任意言語の補助 API と組み合わせる。

## Required Endpoints

- `GET /health`
- `GET /sqlite/items`
