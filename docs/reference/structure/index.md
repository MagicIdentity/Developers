---
layout: page
title: App Structure
parent: Reference

---
Web daemon apps are normally structured as follows:

- Frontend
  - Written in HTML/CSS/Javascript/Typescript using NodeJS.
  - Built using `npm` or `yarn`.
  - Loads and runs in the browser.
- Backend
  - Written in Typescript.
  - Runs in the daemon's backend.
  - Referenced in the HTML `<link type='webdaemon' href='myapp.yml'>`
