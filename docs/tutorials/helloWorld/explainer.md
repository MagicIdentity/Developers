---
layout: page
title: Hello World Explainer
parent: Hello World
back: Publish Your Own
---
{%- assign github_base = site.github_base | append: "/apps/helloWorld" -%}

![Hello World]({{ "/assets/images/helloWorld.png" | relative_url }}){: .small.right}

This little example app gets a message and last-seen time from the
web agent it is loaded into.

## Prerequisites
1. [Install the app](install) on your agent.
2. [View on Github]({{ github_base }}) in another tab.

## How It Works
The [helloWorld.html]({{ github_base}}/helloWorld.html) file defines _both_ the front-end and back-end
for the app. Normally of course, an HTML file defines a front-end alone.

To do this, the HTML markup has just one extra thing:
```html
<link rel='webdaemon' href='helloWorld.yml'>
```
This element is used by the Dæmon just once - when the app is installed. It locates the YAML
file that defines the back-end.

## Files
The source files in this example are fully annotated, read them carefully to see how it fits
together:

- [`helloWorld.html`]({{ github_base}}/helloWorld.html)
  - This is the app source file, everything hangs off it.
- [`helloWorld.css`]({{ github_base}}/helloWorld.css)
  - Simple stylesheet for the frontend.
- [`helloWorld.yml`]({{ github_base}}/helloWorld.yml)
  - YAML file ties the frontend to the backend including authorization and static configuration.
- [`helloWorld.js`]({{ github_base}}/helloWorld.js)
  - Browser-side Javascript makes the request on the backend and displays the result.
- [`helloWorld.ts`]({{ github_base}}/helloWorld.ts)
  - Dæmon-side Typescript handles the request and serves the response.
