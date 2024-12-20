---
layout: page
title: Directory Structure
parent: App Structure
next: YAML Anatomy
---
A web agent app comprises:
1. An HTML file, such as `index.html` including elements such as:
  - `<script src='myapp.js'>`
  - `<link rel='stylesheet' href='myapp.css'>`
  - `<link rel='webdaemon' href='myapp.yml'>`
2. Front end browser code
  - For example, using Vite or NextJS.
3. Agent server code
  - For example, using native Typescript or NextJS.

A typical project directory might look like this:

```
.
+--myapp
   |-- browser
   |   |-- index.html
   |   |-- myapp.yml (points to ../agent/myapp.ts)
   |   |-- your
   |   |-- familiar
   |   +-- structure
   |
   |-- agent
   |   |-- myapp.ts (a standard typescript server)
   |   |-- your
   |   |-- typescript
   |   +-- modules
   |
   |-- your
   |-- build
   +-- tools

```
