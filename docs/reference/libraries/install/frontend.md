---
layout: page
title: Frontend Library
parent: Libraries
next: Backend Library
---
To install the libraries for use in your own Javascript code:

```shell
npm install webdaemon
```

To reference the libraries in your own Javascript or Typescript code, import
in the usual way.

For example, to use the `BrowserApp` class:

```typescript
import { BrowserApp } from 'webdaemon'
```

## Non-Node Apps
If you don't use nodeJs with npm, then you can use the `jsdelivr.net` service.

For example, to use the `BrowserApp` class:

```typescript
import { BrowserApp } from 'https://cdn.jsdelivr.net/npm/webdaemon'
```

In this case we recommend using an [Import Map](importmaps).
