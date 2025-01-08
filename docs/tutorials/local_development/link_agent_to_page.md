---
layout: page
title: Link Agent to Page
parent: Local Development
back: Write Web Agent
next: Running the App
---
Now you've got both the web page and the web agent code, it's time to link them
together.

# Step 1
Your web page `index.html` is linked to its web agent `index.ts` using
a `.yml` configuration file.

Use your editor to replace your existing `index.html` with the following:

`myapp/index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link rel="webdaemon" href="agent/index.yml">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Note the new `link rel=webdaemon` element. This has no effect in the browser, but
is used by the web daemon to auto-install the web agent.

# Step 2
The `myapp/agent/index.yml` file provides the web agent configuration including the
prefix (`myapp`) and name (`v1`) of the agent server code in `index.ts`:

`myapp/agent/index.yml`
```yaml
title: My App
prefix: myapp
tab:
  v1:
    src: file:///mnt/agent/index.ts
```

Note that the `src` references the `/mnt/agent` directory mounted in the docker
container when you did `docker run` above.

Because the agent code is executed from disk, `devdaemon` can perform hot module
replacement to speed development as you edit source code.
