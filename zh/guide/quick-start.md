# 快速上手

## 安装

如果在 NodeJS 中运行，NodeJS 版本必须大于 18。

::: code-group

```bash [npm]
npm install keq
```

```bash [pnpm]
pnpm install keq
```

```bash [yarn]
yarn install keq
```

:::

## 发送请求

通过`request`构造请求，然后调用`.then()`(或`.end()`) 发送。下面发送一个简单的 GET 请求：

<!-- prettier-ignore -->
```typescript
import { request } from "keq"

const cat = await request
  .get("/cat")

console.log(`我可爱的 ${cat.name} 今年 ${cat.age} 岁啦。`)
```

响应体会根据响应头的`Content-Type`自动序列化，这省去了我们许多麻烦。

<!-- prettier-ignore -->
> [!TIP]
> 如果调用`.get(url)`的`url`地址仅包含请求路径(`pathname`)。那么在浏览器中会默认使用 `window.location.origin`作为 Http 请求域名；在NodeJS中则是 `http://127.0.0.1`.

构造 _DELETE_, _HEAD_, _PATCH_, _POST_, and _PUT_ 请求只需要调用`request`不同的方法：

<!-- prettier-ignore -->
```typescript
import { request } from "keq"

await request.delete("https://example.com/cat")
await request.del("https://example.com/cat")
await request.head("https://example.com/cat")
await request.patch("https://example.com/cat")
await request.post("https://example.com/cat")
await request.put("https://example.com/cat")
```

<!-- prettier-ignore -->
> [!TIP]
> `.del()` 是 `.delete()` 的别名.

## 设置 Headers/Query

调用 `.set()`/`.query()` 即可设置 Headers/Query：

<!-- prettier-ignore -->
```typescript{6-8,10-11}
import { request } from "keq"

await request
  .get("https://example.com/cat")
  // 设置 Headers
  .set("X-Origin-Host", "https://example.com")
  .set({ Accept: "application/json" })
  .set(new Headers({ 'cache-control': 'no-cache' }))
  // 添加 Query
  .query('breed', 'british_shorthair')
  .query({ order: 'desc' })
```

## 路由参数

`Keq` 提供了便捷的填充接口路由参数的方法：

<!-- prettier-ignore -->
```typescript{5-11}
import { request } from "keq"

await request
  .get("/users/:userName/books/{bookName}")
  .params("userName", "jack")
  .params("bookName", "kafka")
  // 也可使用对象做为参数
  .params({
    userName: "jack",
    bookName: "kafka",
  })
```

## 请求体

### JSON

通常，我们使用下面的代码发送携带请求体的 POST 请求：

<!-- prettier-ignore -->
```typescript{5-8}
import { request } from "keq"

await request
  .post("/cat")
  .send({
    name: "sweet",
    age: 8,
  })
```

<!-- prettier-ignore -->
> [!TIP]
> 调用`.send()` 并且参数是 `object` 时，会自动的将 `Content-Type` 设置为 `application/json`。

### FormData

<!-- prettier-ignore -->
```typescript{5-7}
import { request } from "keq"

await request
  .post("/cat")
  .field("name", "sweet")
  .field("age", 8)
  .attach("avatar", new Blob(/* image */))
```

> [!TIP]
>
> 调用`.field()`/`.attach()` 时，会自动的将 `Content-Type` 设置为 `multipart/form-data`。

你也可以直接使用`FormData`:

<!-- prettier-ignore -->
```typescript{3-5,9}
import { request } from "keq"

const form = new FormData()
form.append("name", "sweet")
form.append("age", 8)

await request
  .post("/cat")
  .send(form)
```

> [!TIP]
>
> 当调用`.send()` 的参数是 `FormData` 时，会自动的将 `Content-Type` 设置为 `multipart/form-data`。

### x-www-form-urlencoded Request

要发送 `application/x-www-form-urlencoded` 格式的请求体, 你必须调用 `.type("form")` 来确保设置正确的 `Content-Type`:

<!-- prettier-ignore -->
```typescript{5-7}
import { request } from "keq"

await request
  .post("/cat")
  .type("form")
  .send({ name: "sweet" })
  .send("age=8")
```

> [!TIP]
>
> `.type()` 显式设置的 `Content-Type` 优先级高于 `.send()`/`.filed()`/`.attach()`隐式推导的 `Content-Type`。与调用先后顺序无关。
