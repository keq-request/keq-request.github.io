# keq-exception

`Middleware` for throwing/catching exceptions. And it can control whether the exception trigger `retry`.

## Usage

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

  // Callback will run after `await next()`.
  // This way you can throw errors based on the response body.
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

| **Parameter** | **Default** | **Description**                              |
| :------------ | :---------- | -------------------------------------------- |
| statusCode    | -           | Error code                                   |
| message       | `''`        | Error message                                |
| retry         | `true`      | Whether the thrown error can trigger a retry |
