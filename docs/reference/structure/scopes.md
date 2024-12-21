---
layout: page
title: YAML Scopes
parent: App Structure
back: YAML Anatomy
next: YAML Variables
---
As a web agent app developer, you will write agent backends that handle
requests.

These requests can come from your own frontend code, or from entirely
separate systems, depending on how your app or service works.

Three entries in your app's `.yml` file allow you to control access to your backend:

1. `scope` defines your own custom capabilities on your app.
2. `grant` defines which agents gets which of these capabilities.
3. `audience` defines auto-created token(s) given to your app when launched.

Note that we use the term **party** to refer to the agent that has installed and
launched your app.

# Example
Let's say your app is a game which saves its state in the agent backend. In that
case you might provide a route `/saveGame` and another route `/retrieveGame` that
can be called by your own frontend code.

But you don't want just anyone to be able to do this! So you use the `.yml` entries
to:

1. Define your app's custom capabilities (`scope`)
2. Grant them to same agent as launched your app (`grant`)
3. Ensure that when a party launches your app it gets a token that it can put in the
`X-Tabserver-Token` header when making those two calls (`audience`)

## Scope
This is how you define your own capabilities:
```yaml
scope:
  getGame:
    description: Can get the game object
  setGame:
    description: Can set the game object
```
Note that these capabilities exist _only_ on your app. When the token is generated
later, it includes your app URL in the `src` attribute - and this has to match the
`origin` header in the request, if made from a browser.

## Grant
This ensures that tokens signed by the _same web agent as launched the app_ can
make the request whose token includes the custom capabilities:

```yaml
grant:
  ${party}:
    - getGame
    - setGame
```

The variable `${party}` is of course different for every agent that installs and
subsequently launches the app.

That's why we are not using a constant such as `my.agent.id` which would be
far more restrictive.

## Audience
When your app is launched, it is automatically given one token per agent whose name
is provided under the `audience` property.

In this case, we give the launched app a token for the same agent as launched the app (i.e. the **party**), which requests the two capabilities on this app.

```yaml
audience:
  ${party}:
    ${source}: getGame setGame
```

The variable `${source}` is simply the URL of the HTML file that includes this YAML
file.

You _could_ use the literal URL if it's known in advance. For example:

```yaml
audience:
  ${party}:
    https://some.web.site/some/page.html: getGame setGame
```
