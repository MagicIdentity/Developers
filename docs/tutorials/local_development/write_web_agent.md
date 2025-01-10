---
layout: page
title: Write Web Agent
parent: Local Development
back: Write Web Page
next: Link Agent to Page
---

# Step 1
Use your editor to create a new file `agent.ts` in the `myapp` directory with the
following content:

# `myapp/agent.ts`
```typescript
import { Lifecycle, response } from 'npm:webdaemon'

async function handler(request: Request): Promise<Response> {
  if (Lifecycle.shouldHandle(request)) {
    return Lifecycle.getInstance().handler(request)
  }

  return response({
    ok: 'Agent says hi!'
  })
}

Deno.serve({port: 0}, handler)
```

The port number `0` causes a random port to be assigned at startup.
