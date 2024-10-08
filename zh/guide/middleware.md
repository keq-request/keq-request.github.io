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
