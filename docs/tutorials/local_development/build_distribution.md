---
layout: page
title: Build Distribution
parent: Local Development
back: Hot Module Replacement
next: Publish on Drive
---
The build now needs to include the agent server code.

# Step 1
The `build` script in `package.json` already works for building the web app, so
we will add the build command for the web agent.

- Open `package.json` in your editor and update the `scripts.build` entry:

  `package.json`
  ```
  "build": "tsc -b && vite build && deno run --allow-all esbuild.esm.ts"
  ```

# Step 2
Create a new file `esbuild.esm.ts` in the `myapp` directory:

`esbuild.esm.ts`
```typescript
import * as esbuild from 'https://deno.land/x/esbuild@v0.19.11/mod.js'
import { denoPlugins } from 'https://deno.land/x/esbuild_deno_loader@0.8.5/mod.ts'
import { parseArgs } from 'jsr:@std/cli/parse-args'

const importMapURL = String(new URL('public/importmap.json', import.meta.url))

await esbuild.build({
  plugins: [...denoPlugins({importMapURL})],
  entryPoints: ['agent.ts'],
  outfile: './dist/agent.js',
  bundle: true,
  sourcemap: false,
  format: 'esm',
  platform: 'neutral',
  target: 'esnext',
  minify: true,
  external: [
    'https://*',
    'npm:*',
    'jsr:*'
  ]
})

console.log(`Agent build complete`)
Deno.exit(0)
```

The agent-side code running under Deno resolves external dependencies
natively - so there's no need to bundle them into the library code.

# Step 3
The `vite.config.ts` file needs to output relative hrefs for scripts instead
of root hrefs, to allow the app to be served from a subdirectory.

- Open `vite.config.ts` in your editor, and add the `base` property:

  `vite.config.ts`
  ```typescript
  export default defineConfig({
    base: './',
    plugins: [react()]
  })
  ```

# Step 4
Build the app using the following command:

  - `deno run build`

The `myapp/dist` directory contains the build output.
