# Quick Start

## Install

The nodejs version must be at least 18 when using in nodejs.

```bash
npm install keq
yarn install keq
pnpm install keq
```

## Send Request

A request can be initiated by invoking the appropriate method on the `request`, then calling `.then()` (or `.end()` or `await`) to send the request. For example a simple GET request:

<!-- prettier-ignore -->
```typescript
import { request } from "keq"

const cat = await request
  .get("/cat")

console.log(`Lovely ${cat.name} finished ${cat.age} years this year.`)
```

The `ResponseBody` will be automatically serialized according to the `Content-Type`.

<!-- prettier-ignore -->
> [!TIP]
> When calling `.get()` with just `pathname`, `window.location.origin` will be set as base URL in browsers and `http://127.0.0.1` in nodejs.

_DELETE_, _HEAD_, _PATCH_, _POST_, and _PUT_ requests can also be used, simply change the method name:

<!-- prettier-ignore -->
```typescript
import { request } from "keq"

await request.delete("https://example.com/cat")
await request.del("https://example.com/cat")
await request.head("https://example.com/cat")
await request.patch("https://example.com/cat")
await request.post("https://example.com/cat")
await request.put("https://example.com/cat")
```

<!-- prettier-ignore -->
> [!TIP]
> `.del()` is the alias of `.delete()`.

## Setting Headers/Query

Invoke `.set()`/`.query()` with a field name and value:

<!-- prettier-ignore -->
```typescript{6-8,10-11}
import { request } from "keq"

await request
  .get("https://example.com/cat")
  // Setting Headers
  .set("X-Origin-Host", "https://example.com")
  .set({ Accept: "application/json" })
  .set(new Headers({ 'cache-control': 'no-cache' }))
  // Setting Query
  .query('breed', 'british_shorthair')
  .query({ order: 'desc' })
```

## Routing Parameters

The `.params()` method is useful when the url of request has route parameters.

<!-- prettier-ignore -->
```typescript{6-7,9-12}
import { request } from "keq"

await request
  // request to /users/jack/books/kafka
  .get("/users/:userName/books/{bookName}")
  .params("userName", "jack")
  .params("bookName", "kafka")
  // or invoke with an object
  .params({
    userName: "jack",
    bookName: "kafka",
  })
```

## Request Body

### JSON

A typical JSON POST request might look a little like the following:

<!-- prettier-ignore -->
```typescript{5-8}
import { request } from "keq"

await request
  .post("/cat")
  .send({
    name: "sweet",
    age: 8,
  })
```

<!-- prettier-ignore -->
> [!TIP]
> The `Content-Type` will be set as `application/json` automatically, when you invoke `.send()` with object.

### FormData

<!-- prettier-ignore -->
```typescript{5-7}
import { request } from "keq"

await request
  .post("/cat")
  .field("name", "sweet")
  .field("age", 8)
  .attach("avatar", new Blob(/* image */))
```

<!-- prettier-ignore -->
> [!TIP]
> The `Content-Type` will be set as `multipart/form-data` automatically, when you invoke `.field()`/`.attach()`.

And you can also use `FormData` manually:

<!-- prettier-ignore -->
```typescript{3-5,9}
import { request } from "keq"

const form = new FormData()
form.append("name", "sweet")
form.append("age", 8)

await request
  .post("/cat")
  .send(form)
```

<!-- prettier-ignore -->
> [!TIP]
> `.send()` is smart! `Content-Type` will be set as `multipart/form-data` automatically, when you invoke `.send()` with `FormData`.

### x-www-form-urlencoded Request

To send the data as `application/x-www-form-urlencoded`, you need to invoke `.type("form")`:

<!-- prettier-ignore -->
```typescript{5-7}
import { request } from "keq"

await request
  .post("/cat")
  .type("form")
  .send({ name: "sweet" })
  .send("age=8")
```
