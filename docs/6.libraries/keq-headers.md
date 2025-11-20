# keq-headers

提供了修改 HTTP 请求头的 `Middleware`。

## 使用方法

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

| **Middleware** | **描述**                                  |
| :------------- | :---------------------------------------- |
| setHeader      | 添加 Header，如果 Header 已存在则覆盖     |
| setHeaders     | 添加多个 Header，如果 Header 已存在则覆盖 |
| appendHeader   | 添加 Header，不影响已存在的 Header        |
| appendHeaders  | 添加多个 Header，不影响已存在的 Header    |
| insertHeader   | 添加 Header，如果已存在则不添加           |
| insertHeaders  | 添加多个 Header，如果已存在则不添加       |
