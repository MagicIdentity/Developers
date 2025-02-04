---
layout: page
title: Write Your Agent
back: Publish Your App
next: Launch Your App
parent: App Development
---
# Step 1
It's time to define the web agent that acts as a backend for your app.

It's important to put the definition file `agent.yml` in the `public` directory so that it is not
inlined by the Vite build process:

1. In your editor, create a new file `myapp/public/agent.yml`.
2. Paste the following content into the file:

`myapp/public/agent.yml`
```yaml
title: My App
prefix: myapp
tab:
  v1:
    src: agent.js
```

# Step 2
Link your app to the web agent definition using a `<link rel="webdaemon">` element:

# `myapp/index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link rel="webdaemon" href="agent.yml">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

# Step 3
Use your editor to copy the agent code into `myapp/public/agent.js`:

# `myapp/public/agent.js`
```typescript
import { Lifecycle, response } from 'npm:webdaemon'

async function handler(request) {
  if (Lifecycle.shouldHandle(request)) {
    return Lifecycle.getInstance().handler(request)
  }

  return response({
    ok: 'Agent says hi!'
  })
}

Deno.serve({port: 0}, handler)
```

The port number `0` causes a random port to be assigned at startup inside your web daemon.
