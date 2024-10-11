# keq-cli

提供了修改 HTTP 请求地址的 `Middleware`。

## `setBaseUrl(baseUrl)`

<!-- prettier-ignore -->
```typescript
import { request } from "keq"
import { setBaseUrl, setHost } from "keq-url"

request
  .use(setBaseUrl("http://example.com/api"))

await request.get("/test")
// 请求将发送至 'http://example.com/api/test'
```

## `setOrigin(origin)`

<!-- prettier-ignore -->
```typescript
import { request } from "keq"
import { setOrigin } from "keq-url"

request
  .use(setOrigin("http://example.com:8080"))

await request.get("http://test.com/test")
// 请求将发送至 'http://example.com:8080/test'
```

## `setHost(host)`

<!-- prettier-ignore -->
```typescript
import { request } from "keq"
import { setHost } from "keq-url"

request
  .use(setHost("example.com"))

await request.get("http://test.com/test")
// 请求将发送至 'http://example.com/test'
```
