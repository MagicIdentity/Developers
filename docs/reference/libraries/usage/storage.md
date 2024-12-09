---
layout: page
title: Storage
parent: Using Libraries
---
Provides convenience functions for persistent key/value storage, analogous to browser localStorage.
Items in daemon storage survive the uninstall and reinstall of a given app, and are segregated by
app origin.

## Usage
```
import {
  setItem,
  getItem,
  getItemsLike
 } from 'webdaemon'
```

## Patterns
Get a token and use it to store an item:
```javascript
const token = app.getToken()
await setItem(token, 'last/seen', new Date())
```

Retrieve the last seen value from daemon storage:
```javascript
const token = app.getToken()
const lastSeen = await getItem(token, 'last/seen')
```
