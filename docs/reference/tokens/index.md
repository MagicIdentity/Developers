---
layout: page
title: Security Tokens
parent: Reference
back: Libraries
---
Web agent tokens are used for identity, authentication and authorization.

View the [Token Class](https://webdaemon.online/dev/static/lib/docs/index.js/~/Token.html) API documentation.

A token is addressed to a single server (`aud`) from a single client (`sub`), and requests
capabilities on one or more HTML apps (`scope`).

- [Token Anatomy](anatomy) explains how a token is structured.
- [Token Validation](validation) explains how a token is validated upon receipt.
