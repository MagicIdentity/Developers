---
layout: page
title: Storage.js
parent: Web Agent Libraries
---
```
import { Storage } from '$lib/js/Storage.js'
```

Provides support for web agent key/value storage.

This is similar to browsers' `localStorage`, except:

- Keys must be 'path-like', i.e. alphanumeric with optional `/` separators.
- Values are JSON objects.

Agent storage persists across reloads of the app, and between an app being
removed and later re-installed.

It is up to an app to maintain its agent storage as appropriate.

- Setting and getting the app name.
- Handling tokens for use in fetch requests.
- Handling launch alerts for the app.
