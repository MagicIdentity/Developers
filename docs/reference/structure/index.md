---
layout: page
title: App Structure
parent: Reference
next: Libraries
---
A web agent app is just a normal web app, e.g. `myapp.html`.

In addition to the usual `myapp.css`, `myapp.js` and what not,
this can include a `myapp.yml` file that defines what - if anything - runs
in the agent backend:
```
<link rel='webdaemon' href='myapp.yml'>
```

- [Directory Structure](directories) explains how you might lay out a typical web agent app.
- [YAML Anatomy](yaml) explains what goes in the web agent `.yml` file.
