# 超时控制

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'


await request
  .get('/cat')
  .timeout(1000) // millisecond
```
