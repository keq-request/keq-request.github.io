# 序列化响应体

[Response MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Response

`.resolveWith(type)`

| **参数** | **默认值**      | **描述**         |
| :------- | :-------------- | :--------------- |
| type     | `"intelligent"` | 如何序列化响应体 |

type 的可选值：

| **type**         | **描述**                                                                                                                    |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `"intelligent"`  | 如果 `Middleware` 设置了 `context.output` 则返回 `context.output`，否则，根据 HTTP 响应的 `Content-Type` 自动序列化响应体。 |
| `"response"`     | 返回 [`Response`][Response MDN] 对象                                                                                        |
| `"text"`         | 返回 `context.response.text()`                                                                                              |
| `"json"`         | 返回 `context.response.json()`                                                                                              |
| `"form-data"`    | 返回 `context.response.formData()`                                                                                          |
| `"blob"`         | 返回 `context.response.blob()`                                                                                              |
| `"array-buffer"` | 返回 `context.response.arrayBuffer()`                                                                                       |

## 示例

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'

const res = await request
  .get('/cat')
  .resolveWith('response')

const body = await res.json()

console.log(`Cat name is: ${body.name}`)
```
