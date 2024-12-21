---
layout: page
title: Token Validation
parent: Security Tokens
back: Token Anatomy
---
Once validated, a token automatically provides your code with:

1. The **identity** of the counterparty
   - The counterparty is the agent or system who is making the request.
2. Basic **authentication** of that counterparty
   - This is done by signature verification using the counterparty's public key.
3. Basic **authorization** of that counterparty's request
   - Each requested capability must be granted to that counterparty.
   - Your code can add more fine-grained authorization if appropriate.

Your web agent backend will only receive a request for handling if the following
conditions are met:

1. **Either** The request has no token.
2. **Or** The request has a token where:
   - The `aud` matches the web agent name.
   - The current time is between `iat` and `exp`.
   - If the `origin` header is present, it matches `sub`.
   - The `iss` origin matches `sub`.
   - The token signature is valid, using the `iss` public key.
   - If the token includes a `scope` with one or more capabilities:
     - Each capability has been defined in the app's `.yml`.
     - Each capability has been granted to the counterparty.

## Example
Suppose your app `myGame.html` uses this `myGame.yml`:

```yaml
prefix: 'myGame'

scope:
  getGame:
    description: Can get the game object
  setGame:
    description: Can set the game object.

grant:
  ${party}:
    - getGame
    - setGame
  '%':
    -getGame

audience:
  ${party}:
    ${source}: getGame setGame

tab:
  v1:
    src: myApp.ts
```

Note how this grants `getGame` to any counterparty - but not `setGame` which is
only granted to the web agent who's installed the app (the party).

If installed in a web agent `jane.doe.id`, your agent backend whose code is
in the file `myApp.ts` is addressable at paths like this:
```
https://jane.doe.id/tab/myGame/v1/<HREF>
```

## Check Token Presence
Requests for this url will get to your code if there is no token - so check there
is a token using code such as:

```typescript
const token = Token.from(request)
if (!token) {
  throw 'No token!'
}
```

## Provide Further Authorization
If there _is_ a token, then you can be sure it's valid. But you might want to do
additional checking and conditional logic.

In our YAML, we have allowed any counterparty to request `getGame`. So a valid token from
any counterparty will get to your code.

But you may wish to maintain a set of 'friends' who you are happy to play with. In that
case, you'd check that the identity of the counterparty is in your list before proceeding:

```typescript
const counterparty = token.getCounterparty()
if (!MY_FRIENDS.includes(counterparty)) {
  throw `I don't know you, ${counterparty}!`
}
```
