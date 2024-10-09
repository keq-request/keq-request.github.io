# 中间件

`Keq` 采用与 [`koa`](https://github.com/koajs/koa) 相似的中间件模型。
这让 `Keq` 拥有了强大的自定义扩展能力。

> 从 NPM 上可以找到很多扩展 `Fetch API` 的三方库。这些库往往提供类似 `wrap(fetch)` 的 API。
> 例如：[`fetch-retry`](https://www.npmjs.com/package/fetch-retry)、[`node-fetch-har`](https://www.npmjs.com/package/node-fetch-har)、[`fetch-enhanced`](https://www.npmjs.com/package/fetch-enhanced)。
>
> 这导致我们需要维护像 `wrapX(wrapY(wrapZ(fetch)))` 一样的烂代码。并且难以精准控制每个 `wrapper` 为不同的路由赋予不同的默认参数。

## 洋葱模型

![Keq Middleware](/images/keq_middleware.png)

`Keq` 的核心功能也是通过层层组合的 `Middleware` 实现的，其用于发送请求的 `Fetch API` 也是一个 `Middleware`。

当调用 `Keq` 的 API 发送请求时，`Request` 参数经过层层 `Middleware` 处理，最终抵达 `Fetch API Middleware`。
`Fetch API Middleware` 将发送请求并返回 `Response`。最后 `Response` 再次经过层层 `Middleware` 处理后，返回给调用者。

> [!TIP]
>
> `Keq` 由内置的 6 层 `Middleware` 组合而成。图示为了表达清晰仅标注了其中 4 层，6 层由外至内分别是：
>
> - `retryMiddleware`: 提供失败重试功能
> - `flowControlMiddleware`: 提供并发控制功能
> - `timeoutMiddleware`: 提供请求超时控制功能
> - `proxyResponseMiddleware`: 根据 `context.res` 构造 `context.response` 属性。
> - `fetchArgumentsMiddleware`: 根据 `context.request` 构造 `context.fetchArguments` 属性。
> - `fetchMiddleware`: 根据 `content.fetchArguments` 参数发送请求，并将 `Response` 写入 `context.res`。

## 自定义 Middleware

接下来，让我们添加一个简单的、用于处理请求错误的 `Middleware`，借此了解如何自定义 `Middleware`。

<!-- prettier-ignore -->
```typescript
import { request } from "keq"

request
  .use(async (ctx, next) => {
    await next() // 调用下一层 middleware 直至 fetch

    if (ctx.response) {
      if (!ctx.response.status !== 200) {
        throw new Error("The Response is not 200.")
      }
    }
  })

try {
  await request.get("http://example.com/cat")
} catch (err) {
  // 如果 /cat 接口响应状态码不等于 200，将会捕获到异常
  console.log(err)
}
```

上述代码通过调用 `request.use(middleware)` 添加了一个检测所有请求响应状态码的 `Middleware`。

`Middleware` 只是一个接收了两个参数 `ctx` 和 `next` 的函数:

- `ctx` 是请求上下文，其包含了所有的请求参数和响应结果。
- `next` 会执行下一层 `Middleware`。在 `next` 执行前修改 `ctx.request` 会影响实际发送的请求，在 `next` 执行后可以访问 `ctx.response` 获取请求结果并作进一步处理。

在实际工程中，我们将面对许多不同的接口提供方，需要针对性的应用 `Middleware`，让我们优化下上面的请求错误处理代码：

<!-- prettier-ignore -->
```typescript{4-5}
import { request } from "keq"

request
  .useRouter()
  .host('example.com', async (ctx, next) => {
    await next()

    if (ctx.response) {
      if (ctx.response.status !== 200) {
        throw new Error("The Response is not 200.")
      }
    }
  })

try {
  await request.get("http://example.com/cat")
} catch (err) {
  // 如果 /cat 接口响应状态码不等于 200，将会捕获到异常
  console.log(err)
}
```

通过 `request.useRouter().host(hostName, middleware)`，`Middleware` 将仅在请求域名为 `"example.com"`时生效。
接下来，我们可以将 `Middleware` 代码封装成独立的函数，以便于将其多次应用在不同路由上：

<!-- prettier-ignore -->
```typescript
import { KeqMiddleware, request } from 'keq'

function responseValidator(): KeqMiddleware {
  return async (ctx, next) => {
    await next()

    if (ctx.response) {
      if (ctx.response.status !== 200) {
        throw new Error("The Response is not 200.")
      }
    }
  }
}

request
  .useRouter()
  .host('example.com', responseValidator())
  .pathname('/api/*', responseValidator())
```

除了处理响应，我们还可以在请求发送前修改请求参数，让我们实现一个在请求头中添加 `x-site: us` 的中间件：

<!-- prettier-ignore -->
```typescript
import { KeqMiddleware } from 'keq'

function appendSiteHeader(site: string = 'us'): KeqMiddleware {
  return async (ctx, next) => {
    ctx.request.headers.append('x-site', site)

    await next()
  }
}

request
  .useRouter()
  .host('example.com', appendSiteHeader('cn'))
```
