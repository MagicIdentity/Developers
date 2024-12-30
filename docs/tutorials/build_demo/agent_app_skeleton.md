---
layout: page
title: Agent App Skeleton
parent: Build Demo
back: Prerequisites
next: Dev Servers
---
Our frontend will use React with Typescript and the Speedy Web Compiler toolset,
and our backend will run Deno with native Typescript.

# Step 1
Use Vite to create a skeleton agent web frontend:
```shell
npm create vite demo
```
From the menus that appear, select in turn:

- `React`
- `TypeScript + SWC`

This is the web app that will run in the browser.

# Step 2
Create a directory for the agent API backend:
```shell
mkdir -p demo/backend
```

# Step 3
Use your editor to create the file `deno.json` in the backend directory:

# `demo/backend/deno.json`
```json
{
  "imports": {
    "$std": "jsr:@std",
    "$webdaemon": "npm:webdaemon"
  }
}
```
This allows you to use the shorthands `$std` and `$webdaemon` in your
import statements (see below).

# Step 4
Use your editor to create the file `index.ts` in that directory:

# `demo/backend/index.ts`
```typescript
import { parseArgs } from '$std/cli/parse-args'
import { Lifecycle, response } from '$webdaemon'

async function handler(request: Request): Promise<Response> {
  if (Lifecycle.shouldHandle(request)) {
    return Lifecycle.getInstance().handler(request)
  }

  return response({
    ok: 'Agent backend says hello'
  })
}

const args = parseArgs(Deno.args)
const port = Number(args.port ?? 0)
Deno.serve({port}, handler)
```
This is the server process that will run in the web agent on demand.
