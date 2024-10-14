# keq-url

Provide `Middleware` for modifying HTTP request address.

## `setBaseUrl(baseUrl)`

<!-- prettier-ignore -->
```typescript
import { request } from "keq"
import { setBaseUrl, setHost } from "keq-url"

request
  .use(setBaseUrl("http://example.com/api"))

await request.get("/test")
// send to 'http://example.com/api/test'
```

## `setOrigin(origin)`

<!-- prettier-ignore -->
```typescript
import { request } from "keq"
import { setOrigin } from "keq-url"

request
  .use(setOrigin("http://example.com:8080"))

await request.get("http://test.com/test")
// send to 'http://example.com:8080/test'
```

## `setHost(host)`

<!-- prettier-ignore -->
```typescript
import { request } from "keq"
import { setHost } from "keq-url"

request
  .use(setHost("example.com"))

await request.get("http://test.com/test")
// send to 'http://example.com/test'
```
