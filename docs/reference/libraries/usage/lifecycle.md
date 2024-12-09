---
layout: page
title: Lifecycle
parent: Using Libraries
---
Provides lifecycle methods for backends, including configuration data, events and serving public keys.

## Usage
```
import { Lifecycle } from 'npm:webdaemon'
```

### Patterns
Create a lifecycle instance and add an event listener to log configuration
when received:
```typescript
const lifecycle = Lifecycle.getInstance()
lifecycle.addEventListener('config', (event) => {
  console.log(event)
})
```

Ensure that lifecycle requests are handled in your server:
```typescript
async function handler(request: Request): Promise<Response> {
  if (Lifecycle.shouldHandle(request)) {
    return lifecycle.handler(request)
  }

  /** Your logic here */
}
```

Generate a token for use in storage `getItem` and `setItem` requests to our own daemon:
```typescript
const token = Lifecycle.getStorageToken()
```

Generate a token for a fetch request made from this daemon to foreign system `api.acme.com`
requesting the capabilities `capability1` and `capability2`:
```typescript
const scope = {
  'api.acme.com': 'capability1 capability2'
}
const token = Lifecycle.getTokenFor(scope)
```
Note that tokens _request_ capabilities, which need to have been _granted_ on the receiving party.
