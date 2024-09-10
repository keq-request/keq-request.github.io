# 简介

## Keq 是什么?

Keq 是一个可以同时运行在浏览器和 NodeJS 的 Http 请求库。你能够通过添加 Middleware，让请求库武装到牙齿！

[koa]: https://github.com/koajs/koa
[superagent]: https://github.com/ladjs/superagent

:::info
Keq 受 [koa][koa] 和 [superagent][superagent] 的启发。
由 [koa][koa] 的中间件模型和 [superagent][superagent] 链式调用方案 结合而成。
:::

## Features

- 可以同时运行在浏览器和 NodeJS 中。
- 支持链式调用
- 通过 middleware 扩展请求库功能。并且内置了常用功能：
  - 超时控制
  - 重试
  - 并发控制
  - 错误处理
  - 响应体的自动序列化
  - 缓存
- 完备的 Typescript 类型
- 支持将 Swagger 自动转换为代码
