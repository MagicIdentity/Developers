---
layout: page
title: App Structure
parent: Reference
---
A web agent app comprises:

1. Front end browser
   - For example, using Vite or NextJS.
2. Agent server
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
