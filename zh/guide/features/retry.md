# 请求重试

**`.retry(retryTimes[, retryDelay[, retryOn]])`**

| **参数**   | **默认值**                    | **描述**                             |
| :--------- | :---------------------------- | :----------------------------------- |
| retryTimes | `0`                           | 最大重试次数                         |
| retryDelay | `0`                           | 两次重试直接的间隔时间（单位：毫秒） |
| retryOn    | `(attempt, error) => !!error` | 是否继续运行下一次的重试             |

## 示例

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'
import { throwException, RequestException } from 'keq-exception'


await request
  .get('/cat')
  .retry(2, 1000, (attempt, err, context) => {
    // error 是 fetch() 函数异常报错，建议重试。例如：浏览器突然断网。
    if (err) return true

    if (context.response) {
       if (context.response.status >= 400 && context.response.status < 500) {
        // 400 通常是业务约定的错误，没必要重试
        return false
       } else if (context.response.status >= 500) {
        // 500 通常是服务端系统异常，需要重试
        return true
       }
    }
  })
```

借助 [keq-exception](/zh/guide/libraries/keq-exception) 可以更优雅的融合*错误处理*和*重试策略*代码：

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
  // 当两次重试都失败或终止重试后将捕获到 RequestException
  console.log(err instanceof RequestException)
}
```
