---
layout: page
title: Requests
parent: Using Libraries
---
Convenience functions for requests made from this daemon backend to other systems.

## Usage
```
import {
  getClientProtocol,
  getClientHost,
  getClientPathname,
  getClientUrl,
  getCookie,
  getCookies
 } from 'webdaemon'
```

## Patterns
Get the client's view of the host to which a request is addressed:
```typescript
const host = getClientHost(request) // E.g. this.daemon.name
```
If a token is present on the request, this will match `token.getParty()`.
