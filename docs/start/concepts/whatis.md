---
layout: page
title: What is a Web Agent?
parent: Concepts
next: Uses of Web Agents
---
Many businesses provide a REST API on the web, which is shared<sup>*</sup> between users.

A web agent is similar, except it is super-focussed. It is unique to:

1. The business that produced the web app of which it is part.
2. The individual person who has launched that app.

As a developer, this adds a new dimension to your apps.

1. You place your web agent `.js` and `.ts` files right alongside the `.html` and `.css` of your web page.
2. Users launch your app, but don't have to login to identify themselves.

## Centralised App
Let's suppose you've written a backend API with the route `/myapi`.

In a traditional app, the user navigates to a web page. This is pre-configured to use `/myapi` on a server
whose name is shared between all users<sup>*</sup>:

```mermaid
block-beta
    columns 4
    u1("User 1")
    u2("User 2")
    u3("User 3")
    u4("...")
    space:4
    space
    be("some.server/myapi"):2
    space
    u1-->be
    u2-->be
    u3-->be
```

## Web Agent App
In contrast, when a user launches your web agent app, `/myapi` is instantly deployed on their personal web agent server.
Your app talks to `/myapi` on this personal server, not to a central server:

```mermaid
block-beta
    columns 4
    u1("User 1")
    u2("User 2")
    u3("User 3")
    u4("...")
    space:4
    b1("user.one/myapi")
    b2("user.two/myapi")
    b3("user.three/myapi")
    b4("...")
    u1-->b1
    u2-->b2
    u3-->b3
```
## What's Different

1. Web agents are loaded and unloaded on demand like web pages in a browser.
2. Each user has their own web agent server (_web daemon_) capable of running agents for many apps at once.
3. Web agents are available 24/7 and can easily form decentralized peer-to-peer networks.
4. No login is needed because identity, authentication and authorization come for free with agent security tokens.

## Standards

1. Standard web HTML, CSS, JS and Typescript.
2. Standard tooling such as React, Vite, Oak.
3. Standard HTTP interop to/from other personal agents and systems.

{:.small}
<sup>*</sup>That's why users have to _log in_ - to distinguish themselves.
