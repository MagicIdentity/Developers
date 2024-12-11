---
layout: page
title: App Structure
parent: Reference

---
Web agent apps are normally structured as follows:

- **App**
  - Write a standard HTML/CSS/JS/React app.
    - Runs in your browser.
  - Write a standard Typescript/JS server.
    - Runs in your agent.
  - Link them in your HTML file:
    -  `<link type='webdaemon' href='myapp.yml'>`
- **Agent**
  - Launch the HTML app from your agent shell.
  - Your agent now exposes the app-specific API.
  - Agents can directly address each others' APIs.
- **Backend** _(optional)_
  - No need to have a centralized backend.
  - No need to change existing backends.
