---
layout: page
title: Write Web Agent
parent: Local Development
back: Write Web Page
next: Link Agent to Page
---

# Step 1
Use your console to create a new directory `myapp/agent`.

This will hold the agent server code, written in Typescript.

# Step 2
Use your editor to create a new file `index.ts` in that directory with the
following content:

# `myapp/agent/index.ts`
```typescript
import { Lifecycle, response } from 'npm:webdaemon'

async function handler(request: Request): Promise<Response> {
  if (Lifecycle.shouldHandle(request)) {
    return Lifecycle.getInstance().handler(request)
  }

  return response({
    ok: 'Agent says hello!'
  })
}

Deno.serve({port: 0}, handler)
```

The port number `0` causes a random port to be assigned at startup.
