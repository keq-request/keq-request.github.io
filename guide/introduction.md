# Introduction

## What is Keq?

Keq is a HTTP Clint for nodejs and the browser. **It can give your request incredible powers by middlewares**.

:::info
Keq is inspired by [koa](https://github.com/koajs/koa) and [superagent](https://github.com/ladjs/superagent).
And it draws on the middleware model of koa and the chain call of superagent.
:::

## Features

- Run in the browser and nodejs.
- Chain calls.
- Extend functionality by adding middleware. And some middleware have been provided:
  - Timeouts
  - Retry
  - Concurrency control
  - Error handle
  - Automatic request body serialization
  - Cache
- Full Typescript support.
- Generate API code from swagger.
