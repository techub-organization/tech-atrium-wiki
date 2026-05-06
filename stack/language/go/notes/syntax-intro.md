# Go 文法入門（中級者・開発者向け）

## 位置づけ

このメモは、Go が何の言語かを知ったあとに「実際に書くとどういう感触か」を把握するための中級者向け整理である。初学者向けの概要説明ではなく、他言語経験者が Go の書き味を掴むための入口として使う。

## Go の文法で最初に押さえるもの

### パッケージとエントリーポイント

Go はファイル先頭で `package` を宣言し、実行可能プログラムでは `package main` と `func main()` を使う。

```go
package main

import "fmt"

func main() {
    fmt.Println("hello, go")
}
```

ポイント:

- Java のような class ベースではない
- Python のようにファイルをそのまま上から実行する感覚とも少し違う
- パッケージ単位で責務を分ける意識が強い

### 変数宣言

Go では `var` と `:=` をよく使う。

```go
var name string = "techrium"
count := 3
```

ポイント:

- 関数内では `:=` が多い
- 型推論はあるが、完全に型を隠す方向ではない
- 可読性を落とすほど短くはしない方が Go らしい

### 関数

```go
func add(a int, b int) int {
    return a + b
}
```

近い型はまとめて書ける。

```go
func add(a, b int) int {
    return a + b
}
```

ポイント:

- シグネチャは比較的読みやすい
- 戻り値を複数返せる
- 例外より戻り値で状態を返す文化が強い

### エラーハンドリング

Go では例外に頼らず、`error` を戻り値で返す設計が基本になる。

```go
func loadUser(id string) (User, error) {
    if id == "" {
        return User{}, errors.New("id is required")
    }
    return User{ID: id}, nil
}
```

呼び出し側:

```go
user, err := loadUser("u-1")
if err != nil {
    return err
}
```

ポイント:

- `if err != nil` が頻出する
- 冗長に見えるが、異常系の分岐は追いやすい
- 「例外で奥に飛ぶ」より「その場で処理する」に寄っている

### 構造体

Go ではクラスの代わりに struct を使うことが多い。

```go
type Article struct {
    Title string
    Level string
}
```

ポイント:

- データ構造を明快に定義しやすい
- 継承ベースではなく、必要な振る舞いをメソッドや interface で足していく

### メソッド

```go
func (a Article) DisplayTitle() string {
    return a.Level + ": " + a.Title
}
```

ポイント:

- メソッドは型に後付けする感覚で定義する
- OOP 的に見えるが、Java や C# のクラス中心設計とは少し違う

### interface

Go の interface は「このメソッド群を持っていれば満たす」という形で使う。

```go
type Renderer interface {
    Render() string
}
```

ポイント:

- 実装側が明示的に `implements` を書かない
- 抽象化はできるが、濫用より必要最小限が好まれる
- 小さな interface の方が読みやすい

### for と range

Go では繰り返し構文は基本的に `for` で統一されている。

```go
for i := 0; i < 3; i++ {
    fmt.Println(i)
}

for _, item := range items {
    fmt.Println(item)
}
```

ポイント:

- `while` はない
- `range` は配列、スライス、map などでよく使う

### slice と map

Go では配列そのものより slice を日常的によく使う。

```go
names := []string{"go", "python", "rust"}
scores := map[string]int{
    "go": 90,
    "python": 88,
}
```

ポイント:

- slice は可変長のリストとして扱いやすい
- map は辞書型としてよく使う
- JSON や API レスポンス処理でも頻出する

### goroutine と channel

Go の特徴として並行処理がある。

```go
go fetchData()
```

channel を使うとデータ受け渡しを表現できる。

```go
ch := make(chan string)
go func() {
    ch <- "done"
}()

msg := <-ch
fmt.Println(msg)
```

ポイント:

- Go らしさが強く出る領域
- 便利だが、最初から多用しなくてもよい
- まずは通常の API や CLI 実装から慣れる方が理解しやすい

## 他言語経験者が最初に戸惑いやすい点

- 例外中心ではなく `error` を戻り値で返す
- クラス継承中心ではなく struct と interface を組み合わせる
- シンタックスシュガーは控えめ
- 自由度より読みやすさが優先される
- formatter 前提の文化が強い

## 最初に書く題材として向いているもの

- JSON を返す小さな HTTP API
- ファイルを読む CLI
- CSV や JSON を整形するバッチ
- 設定ファイルを読むツール

## techrium での扱い方

この文法入門は、Go メインページの中級者向けセクションでのみ表示する前提で使う。初学者向け一覧や概要ページには入れず、「Go を触り始める開発者向けの次の一歩」として置く。
