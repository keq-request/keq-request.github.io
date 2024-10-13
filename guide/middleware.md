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
