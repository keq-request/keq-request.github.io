# Retry

**`.retry(retryTimes[, retryDelay[, retryOn]])`**

| **Parameters** | **Default**                   | **Description**                 |
| :------------- | :---------------------------- | :------------------------------ |
| retryTimes     | `0`                           | Max number of retries.          |
| retryDelay     | `0`                           | The time interval(millisecond). |
| retryOn        | `(attempt, error) => !!error` | Whether to continue retry.      |

## Usage

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'
import { throwException, RequestException } from 'keq-exception'


await request
  .get('/cat')
  .retry(2, 1000, (attempt, err, context) => {
    // err is thrown by fetch().
    if (err) return true

    if (context.response) {
       if (context.response.status >= 400 && context.response.status < 500) {
        // 400 is usually a business error. no need to retry.
        return false
       } else if (context.response.status >= 500) {
        // 500 is usually a server exception and need to retries
        return true
       }
    }
  })
```

With [keq-exception](/zh/guide/libraries/keq-exception) we can combine _error handling_ and _retry_ code elegantly.

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'
import { throwException, RequestException } from 'keq-exception'

request
  .use(throwException(async (context) => {
    if (context.response) {
      if (context.response.status >= 400 && context.response.status < 500) {
        throw new RequestException(context.response.status, context.response.statusText, false)
      } else if (context.response.status >= 500) {
        throw new RequestException(context.response.status, context.response.statusText)
      }
    }
  }))


try {
  await request
    .get('/cat')
    .retry(2, 1000)
} catch (err) {
  // `RequestException` will be caught, when retry fail twice or terminated.
  console.log(err instanceof RequestException)
}
```
