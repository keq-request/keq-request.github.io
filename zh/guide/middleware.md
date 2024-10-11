# 中间件

[Fetch MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch
[Headers MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Headers
[Response MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[FormData MDN]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[URL MDN]: https://developer.mozilla.org/en-US/docs/Web/API/URL

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
> `Keq` 由内置的 5 层 `Middleware` 组合而成。图示为了表达清晰仅标注了其中 4 层，5 层由外至内分别是：
>
> - `retryMiddleware`: 提供失败重试功能
> - `flowControlMiddleware`: 提供并发控制功能
> - `timeoutMiddleware`: 提供请求超时控制功能
> - `proxyResponseMiddleware`: 根据 `context.res` 构造 `context.response` 属性。
> - `fetchMiddleware`: 根据 `content.request` 参数发送请求，并将 `Response` 写入 `context.res`。

## 自定义 Middleware

`Middleware` 实际上是一个接收了两个参数 `context` 和 `next` 的异步函数:

| **参数名**            | **描述**                                                                                                                                                       |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`(第一个参数) | 请求上下文，其包含了所有的请求参数和响应结果。                                                                                                                 |
| `next`(第二个参数)    | 执行下一层 `Middleware`。在 `next` 执行前修改 `context.request` 会影响实际发送的请求，在 `next` 执行后可以访问 `context.response` 获取请求结果并作进一步处理。 |

接下来，让我们添加一个简单的、用于处理请求错误的 `Middleware`，借此熟悉 `Middleware`。

<!-- prettier-ignore -->
```typescript
import { request } from "keq"

request
  .use(async (context, next) => {
    await next() // 调用下一层 middleware 直至 fetch

    if (context.response) {
      if (!context.response.status !== 200) {
        alert(`${ctx.request.url.href} is not 200`)
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
不过，在实际工程中，我们将面对许多不同的接口提供方，并需针对性的应用 `Middleware`，`Keq` 为此提供了灵活的路由方法：

<!-- prettier-ignore -->
```typescript{4-5}
import { request } from "keq"

request
  .useRouter()
  .host('example.com', async (context, next) => {
    await next()

    if (context.response) {
      if (context.response.status !== 200) {
        alert(`${ctx.request.url.href} is not 200`)
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
  return async (context, next) => {
    await next()

    if (context.response) {
      if (context.response.status !== 200) {
        alert(`${ctx.request.url.href} is not 200`)
        throw new Error("The Response is not 200.")
      }
    }
  }
}

request
  .useRouter()
  .host('example.com', responseValidator())
  .pathname('/api/**', responseValidator())
```

`.useRouter()` 会匹配所有符合规则的请求，如果我们希望个别的请求不运行`alert`。可以给 `Middleware` 添加 `option`：

<!-- prettier-ignore -->
```typescript
import { KeqMiddleware, request } from 'keq'

declare module 'keq' {                // [!code ++]
  interface KeqOptions<T> {           // [!code ++]
    silent(value: boolean): Keq<T>    // [!code ++]
  }                                   // [!code ++]
}                                     // [!code ++]

function responseValidator(): KeqMiddleware {
  return async (context, next) => {
    await next()

    if (context.response) {
      if (context.response.status !== 200) {
        if (!context.options.silent) {                 // [!code ++]
          alert(`${ctx.request.url.href} is not 200`)  // [!code ++]
        }                                              // [!code ++]

        throw new Error("The Response is not 200.")
      }
    }
  }
}

request.use(responseValidator)

// This Request won't show alert
await request
  .get('/cat')
  .option('silent', true)   // [!code ++]
```

除了处理响应，我们还可以在请求发送前修改请求参数，让我们再实现一个向请求头中添加 `x-site: us` 的中间件：

<!-- prettier-ignore -->
```typescript
import { KeqMiddleware } from 'keq'

function appendSiteHeader(site: string = 'us'): KeqMiddleware {
  return async (context, next) => {
    context.request.headers.append('x-site', site)

    await next()
  }
}

request
  .useRouter()
  .host('example.com', appendSiteHeader('cn'))
```

## 上下文（`context`）

通过与 `context` 交互，`Middleware` 可以完全的控制请求行为，下面表格罗列了 `context` 所有内置的属性及其功能：

| **属性**             | **描述**                                                                                                                                                   |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context.request`    | Http 请求的参数                                                                                                                                            |
| `context.abort()`    | **ReadOnly** 终止当前请求                                                                                                                                  |
| `context.global`     | `context.global` 中存储的数据在 `Middleware` 执行完成后不会随 `context` 一起销毁。使用时请务必注意内存溢出问题。                                           |
| `context.res`        | 原始 [`Response`][Response MDN] 对象. 请求成功发送后由 `fetchMiddleware` 添加至 `context`。请尽可能使用 `context.response` 除非你确实需要原始 `Response`。 |
| `context.response`   | `context.res` 的代理，解决了 [`Response`][Response MDN] 的 `.json()`、`.test() ` 等方法无法被多次调用，导致多个 Middleware 重复获取响应体报错的问题。      |
| `context.output`     | **WriteOnly** 更改 `await request.get('xxx')` 的返回内容。（当调用 `.resolveWith()` 时此属性无效）。                                                       |
| `context.identifier` | **ReadOnly** 标记请求代码位置的唯一 key。                                                                                                                  |
| `context.metadata`   | 当前中间件的上下文信息。往往用于检测中间件执行的状态。                                                                                                     |
| `context.options`    | `request.get('xxx').option(key, value)` 设置的自定义选项，`Middleware` 可以添加自己的 `options`。                                                          |

### `context.request`

| **属性**                         | **描述**                                                               |
| :------------------------------- | :--------------------------------------------------------------------- |
| `context.request.url`            | Http 请求地址                                                          |
| `context.request.__url__`        | **Readonly** 合并了路由参数(`routeParams`) 的 Http 请求地址            |
| `context.request.method`         | Http 请求的 Method（'get', 'post', 'put', 'patch', 'head', 'delete'）. |
| `context.request.body`           | Http 请求体                                                            |
| `context.request.headers`        | Http 请求头                                                            |
| `context.request.routeParams`    | Http 请求地址中的路由参数                                              |
| `context.request.catch`          | [Fetch API][Fetch MDN] 的 `catch` 参数                                 |
| `context.request.credentials`    | [Fetch API][Fetch MDN] 的 `credentials` 参数                           |
| `context.request.integrity`      | [Fetch API][Fetch MDN] 的 `integrity` 参数                             |
| `context.request.keepalive`      | [Fetch API][Fetch MDN] 的 `keepalive` 参数                             |
| `context.request.mode`           | [Fetch API][Fetch MDN] 的 `mode` 参数                                  |
| `context.request.redirect`       | [Fetch API][Fetch MDN] 的 `redirect` 参数                              |
| `context.request.referrer`       | [Fetch API][Fetch MDN] 的 `referrer` 参数                              |
| `context.request.referrerPolicy` | [Fetch API][Fetch MDN] 的 `referrerPolicy` 参数                        |

### `context.options`

**`context.options` 使得请求调用方可以随时随地的调整 `Middleware` 的运行逻辑**。也允许了外层的 `Middleware` 通过修改 `context.options` 改变内层 `Middleware` 的运行逻辑。

| **属性**                      | 默认值          | **描述**                                                                                                                                                        |
| :---------------------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context.options.fetchAPI`    | `global.fetch`  | `fetchMiddleware` 发起 Http 请求使用的 [Fetch API][Fetch MDN]。可以更换成 [`node-fetch`](https://www.npmjs.com/package/node-fetch)等与 NodeFetch 兼容的三方包。 |
| `context.options.resolveWith` | `"intelligent"` | 如何解析 `Response` 的响应体。设置后 `content.output` 将失效。                                                                                                  |
| `context.options.retryTimes`  | `undefined`     | 重试次数。                                                                                                                                                      |
| `context.options.retryDelay`  | `undefined`     | 重试间隔时间。                                                                                                                                                  |
| `content.options.retryOn`     | `undefined`     | 自定义重试条件。                                                                                                                                                |
| `content.options.module`      | `undefined`     | 请求所属模块。                                                                                                                                                  |
| `content.options.flowControl` | `undefined`     | 调整请求的并发运行行为模式，修改后将调节 `flowControlMiddleware` 的运行行为。                                                                                   |
| `content.options.timeout`     | `undefined`     | 修改请求的超时时间，修改后将调节 `timeoutControlMiddleware` 的运行行为。                                                                                        |

### `context.global`

| **属性**                           | 默认值      | **描述**                                         |
| :--------------------------------- | :---------- | :----------------------------------------------- |
| `context.global.serialFlowControl` | `undefined` | 用于实现 `.flowControl('serial')` 模式相关功能。 |
| `context.global.abortFlowControl`  | `undefined` | 用于实现 `.flowControl('abort')` 模式相关功能    |

### `context.metadata`

`Middleware` 只有在极少场景下需要操作 `context.metadata`。

| **属性**                          | **描述**                               |
| :-------------------------------- | :------------------------------------- |
| `context.metadata.finished`       | 当期中间件是否运行完成。               |
| `context.metadata.entryNextTimes` | 当前中间件结束前调用了几次 `next`。    |
| `context.metadata.outNextTimes`   | 当前中间件结束前`next`调用完成了几次。 |

## 路由（`.useRouter()`）

| **方法**                                                 | **描述**                                                                                         |
| :------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `.location(...middlewares)`                              | 在浏览器中会将 `window.location.origin` 的请求路由至 `middlewares`。在 NodeJS 中则是 `127.0.0.1` |
| `.method(method: string[, ...middlewares])`              | 将匹配 `method` 的请求路由至 `middlewares` 处理。                                                |
| `.pathname(matcher: string \| Regexp[, ...middlewares])` | `matcher` 可以是一个 `glob` 表达式或者正则表达式，并将匹配到的请求路由至 `middlewares`处理。     |
| `.host(host: string[, ...middlewares])`                  | 将发送给 `host` 域 的请求路由至 `middlewares` 处理。                                             |
| `.module(moduleName: string[, ...middlewares])`          | 将`moduleName`模块的请求路由至 `middlewares` 处理。                                              |
| `.route(...middlewares)`                                 | 自定义路由策略                                                                                   |
