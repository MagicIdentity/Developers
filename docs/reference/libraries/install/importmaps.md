---
layout: page
title: Using Import Maps
parent: Libraries
back: Backend Library
---
It is generally a good idea to use an import map to control library
versioning across both the browser Javascript and the Typescript backend
modules.

_Note:_ We tend to use the `$` sign to indicate the name of mapped imports, but this is
not required.

## Frontend Javascript
If not using Node.js, include something like this in the `head` element of your web page. Note
that you can use the `@version` or not depending on your requirements:

- `myapp.html`
  ```html
    <script type='importmap'>
      {
        "imports": {
          "$webdaemon": "https://cdn.jsdelivr.net/npm/webdaemon@14.3.1/index.js"
        }
      }
    </script>
  ```

In modern browsers, this allows you to use syntax like this in your `.js` files:

- `myapp.js`
  ```javascript
    import { BrowserApp } from '$webdaemon'
  ```

Note that the browser specification does not allow a browser's importmap to be loaded
from an external file.

## Backend Typescript
Imports in the backend code can reference npm directly:

Your `.yml` file, such as `myapp.yml`, can specify an import map as shown below

- `myapp.yml`
  ```yaml
    tab:
      v1:
        src: my-backend-code.ts
        importmap: importmap.json
  ```
- `importmap.json`
  ```json
    {
      "imports": {
        "$webdaemon": "npm:webdaemon@14.3.1"
      }
    }
  ```

You could use the import `"$webdaemon": "https://cdn.jsdelivr.net/npm/webdaemon@14.3.1/index.js"` if you
like, to achieve the same thing.
