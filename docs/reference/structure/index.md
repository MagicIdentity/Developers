---
layout: page
title: App Structure
parent: Reference

---
Web daemon apps are normally structured as follows:

- **App**
  - Write a standard HTML/CSS/JS/React app.
  - Write a standard Typescript/JS server.
  - Link them together using a YAML configuration.
    -  Add `<link type='webdaemon' href='myapp.yml'>` to your HTML.
- **Agent**
  - Install the HTML app in your agent shell.
  - Every agent with the app installed exposes your server API.
- **Backend** _(optional)_
  - No need to have a centralized backend.
  - No need to change to your backends if you have them.
