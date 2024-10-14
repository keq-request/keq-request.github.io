# Concurrent

How to handle multiple Http request when they are sent simultaneously. There are tow strategies provide by `Keq`: `serial` or `abort`.

## `.flowControl('serial'[, key])`

Wait for previous request finish.

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
> Browser can send up to six HTTP request at the same time, and other requests will wait until the previous completed.
> `serial` mod ensures that a key will only occupy one HTTP connection at a time.

## `.flowControl('abort'[, key])`

Abort previous request.

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
> Terminating useless and time-consuming requests can avoid wasting HTTP connection.
