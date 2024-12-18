---
layout: page
title: Token Anatomy
parent: Security Tokens
next: Token Scopes
---
```
import { Token } from 'webdaemon'
```

Tokens are placed in the `X-Tabserver-Token` header of requests.

Each token is base64-encoded JSON containing the following fields:

- `aud` the agent receiving the request.
  - Expressed as an origin, such as `https://receiver.agent.id`.
  - The receiver host is known as the **party**, in this case `receiver.agent.id`.
- `sub` the agent sending the request.
  - Expressed as an origin, such as `https://sender.agent.id`.
  - The sender host is known as the **counterparty**, in this case `sender.agent.id`.
- `iss` URL of the sending agent's public key.
  - Used to validate the token by the receiver.
- `src` URL of the app that is responsible for generating this token.
  - Agent apps are all identified by the HTML page that defines them.
- `scope` requested capabilities, keyed by receiving app URL, on the receiving agent.
  - Each app installed on the receiver can define and grant its own capabilities.
  - The sender may request capabilities, but that doesn't mean they're granted.
- `iat` the time the token was generated by the sender.
- `exp` the expiry time of the token, as determined by the sender.
- `sig` the sender's signature.
  - The signature is generated using all non-`sig` fields.
  - It is checked by the receiver using the `iss` field.