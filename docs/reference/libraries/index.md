---
layout: page
title: Web Agent Libraries
parent: Reference
---
Various libraries help you develop Web Agent apps.

These are maintained under the prefix `https://webdaemon.online/<VERSION>/static/lib/`.

The version number we recommend at present is `dev`, unless you are putting a web
agent app into production. Each release of the Web Agent platform has a version number
such as `11.4` but this is not yet subject to a formal release process.

## Import Maps
We recommend the use of import maps to ensure consistent versioning across your apps.

- [Using Import Maps](importmaps) in browser and backend code.

If you do not use an import map, reference the library directly. For example:

- `https://webdaemon.online/dev/static/lib/js/BrowserApp.js`

## Libraries

- [BrowserApp.js](browserapp) provides basic Javascript app support functions.
- [Storage.js](storage) provides Javascript functions to for web agent key/value storage.
