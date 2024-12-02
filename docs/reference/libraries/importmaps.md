---
layout: page
title: Using Import Maps
parent: Web Agent Libraries
---
It is generally a good idea to use an import map to control library
versioning across both the browser Javascript and the Typescript backend
modules.

## Frontend Javascript
In the `head` element of your web page, include the following:

- `myapp.html`
  ```html
    <script type='importmap'>
      {
        "imports": {
          "$lib/": "https://webdaemon.online/dev/static/lib/"
        }
      }
    </script>
  ```

In modern browsers, this allows you to use syntax like this in your `.js` files:

- `myapp.js`
  ```javascript
    import { BrowserApp } from '$lib/js/BrowserApp.js'
  ```

Note that the specification does not allow a browser's importmap to be loaded
from an external file.

## Backend Typescript
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
        "$lib/": "https://webdaemon.online/dev/static/lib/"
      }
    }
  ```
