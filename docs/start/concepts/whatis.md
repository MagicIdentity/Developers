---
layout: page
title: What is a Web Agent?
parent: Concepts
next: Uses of Web Agents
---
A web agent is a personal, dynamic server that loads and unloads APIs as quickly as your
browser loads and unloads pages.

## Traditional App
In a traditional app, we navigate to a web page which uses an API:
1. On a pre-deployed server
2. Shared by all users of the app.

```mermaid
block-beta
    columns 1
    a("Web App")
    space
    b("Server API")
    a-->b
```

## Web Agent App
In a web agent app, we navigate to a web page which uses an API:
1. On a dynamically loaded server
2. Personal to each user of the app.

```mermaid
block-beta
    columns 1
    block:wb
        wb1("App 1")
        wb2("App 2")
        wb3("App 3")
        wb4("...")
    end
    space
    block:wa
        wa1("API 1")
        wa2("API 2")
        wa3("API 3")
        wa4("...")
    end
    wb --> wa
```
## Differences

1. The web agent is personal to you.
2. The web agent (un)loads the app API as your browser (un)loads the app page.
3. Identity, authentication and authorization come for free with the web agent security tokens.
