# Serialize Response Body

[Response MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Response

`.resolveWith(type)`

| **Parameters** | **Default**     | **Description**                |
| :------------- | :-------------- | :----------------------------- |
| type           | `"intelligent"` | how to serialize response body |

| **Type**         | **Description**                                                                                 |
| :--------------- | :---------------------------------------------------------------------------------------------- |
| `"intelligent"`  | Return `context.output` when it be set. Otherwise, parse response body according `Context-Type` |
| `"response"`     | Return [`Response`][Response MDN] Object                                                        |
| `"text"`         | Return `context.response.text()`                                                                |
| `"json"`         | Return `context.response.json()`                                                                |
| `"form-data"`    | Return `context.response.formData()`                                                            |
| `"blob"`         | Return `context.response.blob()`                                                                |
| `"array-buffer"` | Return `context.response.arrayBuffer()`                                                         |

## Usage

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'

const res = await request
  .get('/cat')
  .resolveWith('response')

const body = await res.json()

console.log(`Cat name is: ${body.name}`)
```
