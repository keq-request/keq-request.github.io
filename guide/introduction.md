# Introduction

## What is Keq?

Keq is a HTTP Clint for nodejs and the browser. **It can give your request incredible powers by middlewares**.

> [!TIP]
>
> Keq is inspired by [koa](https://github.com/koajs/koa) and [superagent](https://github.com/ladjs/superagent).
> And it draws on the middleware model of koa and the chain call of superagent.

## Features

- Run in the browser and nodejs.
- Chain calls.
- Full Typescript support.
- **[Generate API code from swagger.](/guide/cli)**
- Extend functionality by adding `Middleware`. And official provides some useful `Middleware`:
  - [Timeouts](/guide/features/timeout)
  - [Retry](/guide/features/retry)
  - [Concurrency control](/guide/features/flow-control)
  - [Error handle](/guide/libraries/keq-exception)
  - [Response body serialization](/guide/features/serialize) handle
  - [<Icon src="/images/icons/test.svg" tip="Experimental Feature" /> Cache](https://github.com/keq-request/keq-cache)
