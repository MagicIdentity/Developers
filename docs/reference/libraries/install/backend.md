---
layout: page
title: Backend Library
parent: Libraries
next: Using Import Maps
back: Frontend Library
---
You can use a toolchain like NextJS that munges front and backends, but we recommend
keeping them separate for greater agility.

## Native Typescript

Note that the agent servers work directly with Typescript - there's **no need** for
`npm`, `babel` or other tools to transpile your agent code.

A good combination of frameworks might be:

- [Vite](https://vite.dev) for the browser frontend code.
- [Oak](https://oakserver.org/) for the agent server code.

To reference the webdaemon library in your agent server code, import using the `npm:` prefix.

For example, to use the `Lifecycle` class in a native, non-transpiled Typescript backend module
such as `myapp.ts`:

```typescript
import { Lifecycle } from 'npm:webdaemon'
```

## Transpiled Typescript
If you do want to use an npm-based toolset to produce your agent server code,
then having installed the npm library using `npm install webdaemon` your import would look
like this:

```typescript
import { Lifecycle } from 'webdaemon'
```
