# Typescript

Keq 支持扩展 Typescript Interface 带给用户完善的类型提示：

<!-- prettier-ignore -->
```typescript
import type { KeqOperation } from "keq"

declare module keq {
  export interface KeqOperations {
    "/cats": {
      get: {
        requestParams: {}
        requestQuery: {
          breed: string
        }
        requestHeaders: {
          Authorization: string
        }
        requestBody: {}
        responseBody: {
          id: string
          breed: string
          name: string
        }
      }

      post: {
        requestParams: {}
        requestQuery: {}
        requestHeaders: {
          Authorization: string
        }
        requestBody: {
          breed: string
          name: string
        }
        responseBody: {
          id: string
          breed: string
          name: string
        }
      }
    }

    "/cats/:id": {
      put: {
        requestParams: {
          id: string
        }
        requestQuery: {}
        requestHeaders: {
          Authorization: string
        }
        requestBody: {
          breed: string
          name: string
        }
        responseBody: {
          id: string
          breed: string
          name: string
        }
      }
    }
  }
}
```

接下来使用 `request` 时，将具备更优雅的 Typescript 提示：

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'


const casts = await request
  .get('/cats')
  .query('breed', 'siamese')

console.log(`My Cats: ${cats.map(cat => cat.name).join(',')}`)

await request
  .put('/cats/:id')
  .params<'strict'>({ id: 1 })
  .send<'strict'>({
    breed: 'siamese',
    name: 'sweet'
  })
```

> [!NOTE]
>
> `<'strict'>` 将严格约束参数完全符合 KeqOperations 中的定义。

## createRequest

`createRequest` 也可以为自己创建的 `request` 并添加 Typescript：

```typescript
import { createRequest, KeqOperations } from "keq";

export interface CatServiceOperations extends KeqOperations {
  "/cats": {
    get: {
      requestParams: {};
      requestQuery: {
        breed: string;
      };
      requestHeaders: {
        Authorization: string;
      };
      requestBody: {};
      responseBody: {
        id: string;
        breed: string;
        name: string;
      };
    };
  };
}

const request = createRequest<CatServiceOperations>();
```
