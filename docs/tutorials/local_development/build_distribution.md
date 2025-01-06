---
layout: page
title: Build Distribution
parent: Local Development
back: Hooking Up
---
Now let's build the app so it can be published on your drive.

# Step 1
In a separate terminal window, go to your app directory.

```shell
cd demo
```

# Step 2
Use your editor to add a `postbuild` step to the `package.json` file:

- `package.json`
  ```json
    "scripts": {
      "postbuild": "cp -R backend dist/backend"
    }
  ```

This copies the backend Typescript files into position so they are served
alongside the frontend HTML and Javascript.

# Step 2
Edit the `vite.config.ts` file to include `base`, allowing the app to be served
from any directory:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './'
})
```

# Step 3
Build the app into the `dist` subdirectory.

```shell
npm run build
```
