# keq-headers

Provide `Middleware` for modifying HTTP request headers.

## Usage

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'
import {
  setHeader,
  setHeaders,
  appendHeader,
  appendHeaders,
  insertHeader,
  insertHeaders,
} from 'keq-headers'


request
  .use(setHeader('x-user-name', 'Kerry'))
  .use(appendHeader('x-user-name', 'Marry'))
  .use(insertHeader('x-user-name', 'J'))
  .use(setHeaders({
    'x-user-name': 'Kerry',
    'x-user-id': '1'
  }))
  .use(appendHeaders({
    'x-user-name': 'Marray',
    'x-user-id': '1',
  }))
  .use(insertHeaders({
    'x-user-name': 'J',
    'x-user-id': 1,
  }))
```

| **Middleware** | **Description**                                                            |
| :------------- | :------------------------------------------------------------------------- |
| setHeader      | Set a header.If it already exists, the original value will be overwritten. |
| setHeaders     | Set headers.If it already exists, the original value will be overwritten.  |
| appendHeader   | Append a header.                                                           |
| appendHeaders  | Append headers.                                                            |
| insertHeader   | Set a header, if it isn't existed.                                         |
| insertHeaders  | Set headers, if it isn't existed.                                          |
