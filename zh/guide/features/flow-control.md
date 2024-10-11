# 并发控制

控制多个 Http 请求同时被发送时如何处理。`Keq` 提供了两种处理策略：`serial` 和 `abort`。

## `.flowControl('serial'[, key])`

当上一次请求未结束时，等待其完成后运行。

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'


await Promise.all([1,2,3].map(async i => {
  await request
    .get('/cat')
    .flowControl('serial', 'cat-request')
}))

```

> [!TIP]
>
> 浏览器的一个网页中 HTTP 请求的最多同时发送 6 个，超出的请求将等待之前的请求完成后再发送。
> `serial` 模式则确保了一个 key 同一时间只会占用一个 HTTP 连接。

## `.flowControl('abort'[, key])`

当上一次 HTTP 请求未结束时，终止上一次 HTTP 请求，并立刻发送这一次的 HTTP 请求。

<!-- prettier-ignore -->
```typescript
import { request } from "keq"

await Promise.all(
  [1, 2, 3].map(async (i) => {
    await request
      .get("/cat")
      .flowControl("abort", "cat-request")
  })
)
```

> [!TIP]
>
> 在 `React`/`Vue` 等框架连续触发多次组件渲染时，立即终止上一次的 HTTP 请求可避免耗时请求长时间占用 HTTP 资源。
