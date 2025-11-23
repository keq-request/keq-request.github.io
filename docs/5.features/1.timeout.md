# 超时控制

**`.timeout(milliseconds)`**

| **参数**     | **默认值** | **描述** |
| :----------- | :--------- | :------- |
| milliseconds | `Infinity` | 超时时间 |

## 示例

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'


try {
  await request
    .get('/cat')
    .timeout(1000)
} catch (err) {
  console.log(err)
}
```
