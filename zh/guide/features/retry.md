# 重试

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'
import { throwException, RequestException } from 'keq-exception'

request
  .use(throwException(async (context) => {
    if (context.response && !context.response.ok) {
      throw new RequestException()
    }
  }))


await request
  .get('/cat')
  .retry(2, 1000)
```
