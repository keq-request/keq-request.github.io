# Middleware

[Fetch MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch
[Headers MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Headers
[Response MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[FormData MDN]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
[URL MDN]: https://developer.mozilla.org/en-US/docs/Web/API/URL

`Keq` use the middleware model similar to [koa](https://github.com/koajs/koa). This gives `Keq` powerful extension capabilities.

> [!TIP]
>
> You could find many libraries that extend the [Fetch API][Fetch MDN]. These libraries provide the API like to `wrap(fetch)`. For example: [`fetch-retry`](https://www.npmjs.com/package/fetch-retry), [`node-fetch-har`](https://www.npmjs.com/package/node-fetch-har),[`fetch-enhanced`](https://www.npmjs.com/package/fetch-enhanced).
> we having to maintain bad code like `wrapX(wrapY(wrapZ(fetch)))`. And the code will be event worse, if we want to set a wrapper for a specific route.

## What is Middleware

![Keq Middleware](/images/keq_middleware.png)

core functions of `Keq` are implemented through layers of `Middleware`. And the [Fetch API][Fetch MDN] that send request is also a `Middleware`.

When calling `request.get()`, the `Request` parameters is processed by layers of `Middleware` and finally reaches `fetchMiddleware`.
`fetchMiddleware` will send the request and return [Response][Response MDN].
Then, [Response][Response MDN] will be processed by layers of `Middleware` again and finally returned to the caller.

> [!TIP]
>
> `Keq` is composed of 5 layers of build-in `Middleware`. For the sake of clarity, only 4 layers are marked in the figure.
> The 5 layers from outside to inside are:
>
> - `retryMiddleware`: Re-send Http when request fails.
> - `flowControlMiddleware`: Managing request concurrency.
> - `timeoutMiddleware`: abort timeout request.
> - `proxyResponseMiddleware`: create `context.response` by `context.res`.
> - `fetchMiddleware`: send a request based on `context.request`.

## Write a `Middleware`

`Middleware` should be an async-function that accept two argument:

| **Arguments**           | **Description**                                                                                                                                                                                                             |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ctx`(first argument)   | Keq Context                                                                                                                                                                                                                 |
| `next`(second argument) | Used to execute the next middleware. The last `next()` function will send request and bind the [`Response`][Response MDN] object to `context.res`. Don't forget to call `next()` unless you don't want to send the request. |

Let's write a `Middleware` fo handing request errors:

<!-- prettier-ignore -->
```typescript
import { request } from "keq"

request
  .use(async (context, next) => {
    await next() // call the next layer of middleware until fetch

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
  // An exception will be caught, if the response status code is not 200.
  console.log(err)
}
```

The above code add a `Middleware` that detects all response status code by calling `request.use(middleware)`.
But in actual project, we have to face many http interface provide by multiple server with different error handling mods.
`Keq` have a flexible routing method for this purpose:

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
  console.log(err)
}
```

By `request.useRouter().host(hostName, middleware)`, `Middleware` will only take effect when the request domain name is `"example.com"`。
Next, we'll write our `Middleware` code as a function so that it can be applied multiple times to different routes.

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

`.useRouter` will route requests that match the rule to `Middleware`. However, if we don't want to run `alert` for individual requests, we can add `option` to `Middleware`:

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

`Middleware` cannot only handle response, but also modify request parameters before sending the request. Let's implement a `Middleware` that add `x-site: us` to request headers:

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

## Context

By read or write `context`, `Middleware` can control the request behavior. The Following table lists all the build-in properties of `context`:

| **Properties**       | **Description**                                                                                                                                                                                                       |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context.request`    | Http Request Parameters                                                                                                                                                                                               |
| `context.abort()`    | **ReadOnly** Abort request                                                                                                                                                                                            |
| `context.global`     | The data stored in `context.global` will not be destroyed along with `context` after `Middleware` is executed. Please be careful about memory when using it.                                                          |
| `context.res`        | The original [`Response`][Response MDN] object. Added to `context` by `fetchMiddleware` after the request is sent successfully. Please use `context.response` whenever possible, unless you know what you are doing.  |
| `context.response`   | A proxy of `context.res` solves the problem that methods such as `.json()` and `.test()` of [`Response`][Response MDN] cannot be called multiple times. This avoid errors when multiple Middleware get response body. |
| `context.output`     | **WriteOnly** Changes the return value of `await request.get('xxx')`. (property has no effect when `.resolveWith()` is called)                                                                                        |
| `context.identifier` | **ReadOnly** A unique key that identifies the position of the request code.                                                                                                                                           |
| `context.metadata`   | Context information of the current `Middleware`. Often used to check the status of `Middleware` execution.                                                                                                            |
| `context.options`    | This options add by `request.get('xxx').option(key, value)`.                                                                                                                                                          |

### `context.request`

| **Properties**                   | **Description**                                                 |
| :------------------------------- | :-------------------------------------------------------------- |
| `context.request.url`            | Http [URL][URL MDN]                                             |
| `context.request.__url__`        | **Readonly** Http [URL][URL MDN] that merged routeParams        |
| `context.request.method`         | Http Method（'get', 'post', 'put', 'patch', 'head', 'delete'）. |
| `context.request.body`           | Http Request Body                                               |
| `context.request.headers`        | Http Request Headers                                            |
| `context.request.routeParams`    | The URL route params set by `.params(key, value)`               |
| `context.request.catch`          | `catch` arguments in [Fetch API][Fetch MDN]                     |
| `context.request.credentials`    | `credentials` arguments in [Fetch API][Fetch MDN]               |
| `context.request.integrity`      | `integrity` arguments in [Fetch API][Fetch MDN]                 |
| `context.request.keepalive`      | `keepalive` arguments in [Fetch API][Fetch MDN]                 |
| `context.request.mode`           | `mode` arguments in [Fetch API][Fetch MDN]                      |
| `context.request.redirect`       | `redirect` arguments in [Fetch API][Fetch MDN]                  |
| `context.request.referrer`       | `referrer` arguments in [Fetch API][Fetch MDN]                  |
| `context.request.referrerPolicy` | `referrerPolicy` arguments in [Fetch API][Fetch MDN]            |

### `context.options`

**`context.options` allows the request caller to adjust the `Middleware` anywhere**。It also allows the outer `Middleware` to adjust the inner `Middleware` by modifying `context.options`.

| **Properties**                | **Default**     | **Description**                                                                                                                                               |
| :---------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `context.options.fetchAPI`    | `global.fetch`  | The [Fetch API][Fetch MDN] invoked by `fetchMiddleware`。It can be replaced with other package like [`node-fetch`](https://www.npmjs.com/package/node-fetch). |
| `context.options.resolveWith` | `"intelligent"` | How to serialize response body.                                                                                                                               |
| `context.options.retryTimes`  | `undefined`     | Retry times.                                                                                                                                                  |
| `context.options.retryDelay`  | `undefined`     | Retry interval.                                                                                                                                               |
| `content.options.retryOn`     | `undefined`     | Customize retry conditions.                                                                                                                                   |
| `content.options.module`      | `undefined`     | The module that request belong to.                                                                                                                            |
| `content.options.flowControl` | `undefined`     | How to handle concurrent requests.                                                                                                                            |
| `content.options.timeout`     | `undefined`     | Change the request timeout.                                                                                                                                   |

### `context.global`

| **Properties**                     | **Default** | **Description**                             |
| :--------------------------------- | :---------- | :------------------------------------------ |
| `context.global.serialFlowControl` | `undefined` | Used to implement `.flowControl('serial')`. |
| `context.global.abortFlowControl`  | `undefined` | Used to implement `.flowControl('abort')`.  |

### `context.metadata`

`Middleware` 只有在极少场景下需要操作 `context.metadata`。

| **Properties**                    | **Description**                                                                  |
| :-------------------------------- | :------------------------------------------------------------------------------- |
| `context.metadata.finished`       | Whether the current middleware has completed.                                    |
| `context.metadata.entryNextTimes` | How many times `next` was called before the current middleware finished.         |
| `context.metadata.outNextTimes`   | How many times `next` calls were returned before the current middleware finished |

## `.useRouter()`

| **方法**                                                 | **描述**                                                                                                       |
| :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `.location(...middlewares)`                              | In the browser, requests to `window.location.origin` are routed to `Middleware`. In NodeJS, it is `127.0.0.1`. |
| `.method(method: string[, ...middlewares])`              | Route requests matching `method` to `Middleware`.                                                              |
| `.pathname(matcher: string \| Regexp[, ...middlewares])` | `matcher` can be a `glob` or `Regexp`. And it will route matching request to `Middleware`.                     |
| `.host(host: string[, ...middlewares])`                  | Route requests sent to `host` to middlewares.                                                                  |
| `.module(moduleName: string[, ...middlewares])`          | Route requests for `moduleName` module to `Middleware`.                                                        |
| `.route(...middlewares)`                                 | Custom route policy.                                                                                           |

## `createRequest`

If you want to create a request instance, you can invoke `request.create()`:

<!-- prettier-ignore -->
```typescript
import { createRequest } from "keq"

const customRequest = createRequest()

// Middleware only takes effect on customRequests
customRequest.use(/** some middleware */)

const body = await customRequest.get("http://test.com")
```

> The `request` import from `'keq'` is created by `request.create()` too.

| option          | description                                                                                                                                  |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| initMiddlewares | Change the default internal `Middleware`.                                                                                                    |
| baseOrigin      | When sending a request without an `origin`, `origin` will set to `window.location.origin` in the browser and `"http://127.0.0.1"` in NodeJS. |
