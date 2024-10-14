# Timeout

**`.timeout(milliseconds)`**

| **Parameters** | **Default** | **Description** |
| :------------- | :---------- | :-------------- |
| milliseconds   | `Infinity`  |                 |

## Usage

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
