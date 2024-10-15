# 简介

## Keq 是什么?

Keq 是一个可以同时运行在浏览器和 NodeJS 的 Http 客户端。你能够通过添加 `Middleware`，将 `Keq` 武装到牙齿！

[koa]: https://github.com/koajs/koa
[superagent]: https://github.com/ladjs/superagent

> [!TIP]
>
> `Keq` 受 [koa][koa] 和 [superagent][superagent] 的启发。
> 由 [koa][koa] 的中间件模型和 [superagent][superagent] 链式调用方案 结合而成。

## 功能特性

- 可以同时运行在浏览器和 NodeJS 中
- 支持链式调用
- 完备的 Typescript 类型
- **[将 Swagger 转换为代码](/zh/guide/cli)**
- 添加 `Middleware` 扩展请求库功能。并且官方提供了常用的 `Middleware`：
  - [超时控制](/zh/guide/features/timeout)
  - [请求重试](/zh/guide/features/retry)
  - [并发控制](/zh/guide/features/flow-control)
  - [自动序列化响应体](/zh/guide/features/serialize)
  - [错误处理](/zh/guide/libraries/keq-exception)
  - [<Icon src="/images/icons/test.svg" tip="实验特性" /> 缓存](https://github.com/keq-request/keq-cache)
