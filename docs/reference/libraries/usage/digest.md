---
layout: page
title: Digest
parent: Using Libraries
---
Convenience functions for short digests, handy if generating storage keys or other
identifiers.

## Usage
```javascript
import {
  shortSafeDigest,
  shortHexDigest
} from 'webdaemon'
```

## Patterns
Generate a base64 digest from an email address:
```javascript
const digest = shortSafeDigest('foo@bar.com') // e.g. 'Zm9vQGJhci5jb20K'
```

Generate 5 hex chars from an email address:
```javascript
const shortid = shortHexDigest('foo@bar.com', 5) // e.g. 'a4055'
```
