---
layout: page
title: What is a Web Agent?
parent: Concepts
next: Uses of Web Agents
---
We [already said](../../start) a web agent is a personal server that thinks it's a browser.

As a developer, the key point to note is that the agent backend code you write does
not get deployed in one place - nor do you have to deploy it for your users.

Instead your agent code is dynamically deployed in a _different_ server with a _different_
host name, unique to each user.

## Centralised App
Let's suppose you've written a backend API called `myapi`.

In a traditional app, the user navigates to a web page. This expects to talk to a backend server
whose pre-configured name is usually the same for all users:

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
In a web agent app, when a user launches the app it talks to that user's personal agent
whose name is different from any other user:

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

1. Web agents use HTML to load and unload page backends on demand like a browser.
2. Each user has their own agent capable of running backends for many apps at once.
3. Identity, authentication and authorization come for free with the web agent security tokens.

## Standards

1. Standard web HTML, CSS, JS and Typescript.
2. Standard tooling such as React, Vite, Oak.
3. Standard HTTP interop to/from other personal agents and systems.
