# CLI

`Keq` 提供的命令行工具可以将 `swagger` 文档编译为 `typescript` 代码。从而能像调用函数一样发送 HTTP 请求。

## 安装

::: code-group

```bash [npm]
npm install keq-cli
```

```bash [pnpm]
pnpm install keq-cli
```

```bash [yarn]
yarn install keq-cli
```

:::

> [!IMPORTANT]
>
> 建议在 package.json 锁定 keq-cli 的版本。
> keq-cli 的小版本升级为了修复 Bug 可能会修改代码模板。这有一定概率导致代码不向前兼容。

## 使用方法

我们需要在项目中添加 `swagger` 文件 和 `.keqrc.ts` 配置文件：

::: code-group

<!-- prettier-ignore -->
```typescript [.keqrc.ts]
import { defineKeqConfig, FileNamingStyle } from "keq-cli"

export default defineKeqConfig({
  outdir: "./src/api", // 编译结果的输出目录
  fileNamingStyle: FileNamingStyle.snakeCase,
  modules: {
    catService: "./cat-service-swagger.json",
    // 也可以从网络上获取 swagger 文档，例如：
    // dogService: "http://dog.example.com/swagger.json"
  },
})
```

```json [cat-service-swagger.json]
{
  "openapi": "3.0.0",
  "info": {
    "title": "Cat Service",
    "version": "0.0.1"
  },
  "paths": {
    "/cat": {
      "get": {
        "operationId": "getCat",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Cat"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Cat": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "age": { "type": "number" }
        }
      }
    }
  }
}
```

:::

在项目目录下运行 `npx keq-cli build` 生成 `typescript` 代码：

::: code-group

<!-- prettier-ignore -->
```typescript [./src/api/cat_service/get_cat.ts]
import { Keq } from "keq"
import { request } from "keq"
import type {
  RequestParameters,
  ResponseMap,
  Operation,
} from "./types/get_cat"

export function getCat<STATUS extends keyof ResponseMap>(
  arg?: RequestParameters
): Keq<ResponseMap[STATUS], Operation<STATUS>> {
  const req = request.get<ResponseMap[STATUS]>("/cat").option("module", {
    name: "catService",
    pathname: "/cat",
  })

  return req as unknown as Keq<ResponseMap[STATUS], Operation<STATUS>>
}
```

<!-- prettier-ignore -->
```typescript [./src/api/cat_service/components/schemas/cat.ts]
/**
 * @interface Cat
 * @export
 */
export interface Cat {
  "name"?: string
  "age"?: number
}
```

<!-- prettier-ignore -->
```typescript [./src/api/cat_service/types/get_cat.ts]
import type { KeqOperation } from 'keq'
import type { Cat } from "../components/schemas/cat"


export interface ResponseMap {
  "200": Cat
}


export type QueryParameters = {
}

export type RouteParameters = {
}

export type HeaderParameters = {
}

export type BodyParameters ={}
export type RequestParameters = QueryParameters & RouteParameters & HeaderParameters & BodyParameters


export interface Operation<STATUS extends keyof ResponseMap> extends KeqOperation {
  requestParams: RouteParameters
  requestQuery: QueryParameters
  requestHeaders: HeaderParameters
  requestBody: BodyParameters
  responseBody: ResponseMap[STATUS]
}
```

:::

使用生成的 `typescript` 函数发送 HTTP 请求：

<!-- prettier-ignore -->
```typescript
import { getCat } from "./src/api/cat_service/get_cat"

const cat = await getCat()
  .retry(3, 1000)
  .timeout(1000)

console.log(`Cat name is ${cat.name}`)
```

我们可以为 `catService` 模块的所有接口添加统一的错误处理逻辑：

<!-- prettier-ignore -->
```typescript
import { request } from 'keq'
import { throwException, RequestException } from 'keq-exception'


request
  .useRouter()
  .module('catService', throwException(context => {
    if (context.response) {
      if (context.response.status >= 400 && context.response.status < 500) {
        throw new RequestException(context.response.status, context.response.statusText, false)
      } else if (context.response.status >= 500) {
        throw new RequestException(context.response.status, context.response.statusText)
      }
    }
  }))
```

> [!TIP]
>
> 得益于*链式调用*和*中间件*的能力，我们可以在不需要手动修改 `keq-cli` 编译结果的情况下，优雅的调整每个 Http 请求的行为。

## 配置文件

`keq-cli` 会自动查找名为 `.keqrc.yml`、`.keqrc.json`、`.keqrc.js`、`.keqrc.ts`的配置文件。
你可以通过 `-c --config <config_file_path>` 设置配置文件地址。

| **配置参数**       | **是否必填** | **默认值**                                 | **描述**                                                          |
| :----------------- | :----------- | :----------------------------------------- | :---------------------------------------------------------------- |
| outdir             | true         | -                                          | 编译结果的输出目录                                                |
| fileNamingStyle    | false        | -                                          | 文件名风格                                                        |
| modules            | true         | -                                          | Swagger 文件地址和模块名称                                        |
| operationIdFactory | false        | `({ operation }) => operation.operationId` | 自定义函数名的生成规则，默认使用 `swagger` 文件中的 `operationId` |
| strict             | false        | `false`                                    | 是否清空输出目录                                                  |
| esm                | false        | `false`                                    | 是否生成 ESM 风格的代码                                           |

### FileNamingStyle

| **枚举**                       | **示例**      |
| :----------------------------- | :------------ |
| `FileNamingStyle.camelCase`    | `"twoWords"`  |
| `FileNamingStyle.capitalCase`  | `"Two Words"` |
| `FileNamingStyle.constantCase` | `"TWO_WORDS"` |
| `FileNamingStyle.dotCase`      | `"two.words"` |
| `FileNamingStyle.headerCase`   | `"Tow-Words"` |
| `FileNamingStyle.noCase`       | `"two words"` |
| `FileNamingStyle.paramCase`    | `"two-words"` |
| `FileNamingStyle.pascalCase`   | `"TwoWords"`  |
| `FileNamingStyle.pathCase`     | `"two/words"` |
| `FileNamingStyle.sentenceCase` | `"Two words"` |
| `FileNamingStyle.snakeCase`    | `"two_words"` |

## 命令行选项

| **选项**                         | **描述**                                                                                                 |
| :------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `[moduleName]`                   | 仅生成指定的模块                                                                                         |
| `-c --config <config_file_path>` | 配置文件的地址                                                                                           |
| `-i --interactive`               | 通过命令行交互，指定需要生成的 HTTP 接口                                                                 |
| `--method <method>`              | 仅生成匹配 method(`'get' \| 'post' \| 'put' \| 'patch' \| 'head' \| 'options' \| 'delete'`) 的 HTTP 接口 |
| `--pathname <pathname>`          | 仅生成匹配 pathname 的 HTTP 接口                                                                         |
| `--no-append`                    | 不生成新添加的 HTTP 接口（与上次生成做对比）                                                             |
| `--no-update`                    | 不更新上次已生成的 HTTP 接口                                                                             |
