# keq-exception

用于抛出/捕获异常的 `Middleware`。并且可控制抛出的异常是否触发 `retry`。

## 使用方法

<!-- prettier-ignore -->
```typescript
import { request } from "keq"
import {
  throwException,
  catchException,
  RequestException,
} from "keq-exception"

request
  .use(
    catchException((err) => {
      if (err instanceof RequestException && err.code === 401) {
        context.redirect("/login")
        return
      }

      throw err
    })
  )

  // throwException 的回调函数必然在`await next()`后运行
  // 可以在回调函数中尝试获取 Response
  .use(
    throwException(async (ctx) => {
      if (ctx.response && ctx.response.status >= 400) {
        const body = await ctx.response.json()
        throw new RequestException(ctx.response.status, body.message)
      }
    })
  )
```

### RequestException(statusCode[, errorMessage[, retry]])

| **参数**   | **默认值** | **描述**              |
| :--------- | :--------- | --------------------- |
| statusCode | -          | 错误码                |
| message    | `''`       | 错误信息              |
| retry      | `true`     | 异常是否会触发`retry` |
