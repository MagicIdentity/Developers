---
layout: page
title: App Structure
parent: Reference

---
Web agent apps are normally structured as follows:

- **App**
  - Write a standard HTML/CSS/JS/React app.
    - This frontend runs in your browser.
  - Write a standard Typescript/JS server.
    - This app-specific API runs in your agent.
  - Link them together using a YAML configuration.
    -  Add `<link type='webdaemon' href='myapp.yml'>` to your HTML.
- **Agent**
  - Install and launch the HTML app from your agent shell.
  - Your agent now exposes the app-specific API.
  - Agents can directly address each others' APIs.
- **Backend** _(optional)_
  - No need to have a centralized backend.
  - No need to change to your backends if you have them.
