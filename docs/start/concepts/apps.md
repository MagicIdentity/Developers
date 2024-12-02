---
layout: page
title: Web Agent Apps
back: Web Agent Shell
parent: Concepts
next: Web Agent Drive
---
A web agent app is just a normal website.

But if the website is _savvy_ and checks for signed web agent tokens, then it can be sure who launched it (e.g. `jane.doe.family`) and can also make requests using those tokens.

Moreover, if the token requests the appropriate scope, it can be used to make API calls on the requesting web agent
on the endpoint provided by some specific app loaded in that agent.

Endpoints come and go as apps are installed and removed from the agent. Often, endpoints installed by a given app are
used by that same app which uses a signed token in its requests.

But equally, an app can create a public endpoint that requires no token for authentication or authorization.

A website that doesn't check for a signed web agent token is known as a _dumb app_. If a savvy app is launched in your browser but without tokens, it is known as an _orphan app_.
