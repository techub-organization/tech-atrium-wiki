# React Integration Contract

## Purpose

React 側が各スタックの API を呼ぶときに期待する共通形式を定義する。

## Baseline

- `GET /health`
- JSON response
- `status`, `data`, `error` のどれを返すか明記する
