---
layout: page
title: Local Agents
back: Activate
parent: Starting out
---
When a user loads your web agent app, the web page portion runs in their personal browser
and the web agent portion runs in their personal daemon.

As a developer, you need a web browser running locally so you can develop your web page, and a
web daemon running locally so you can develop the associated web agent.

We give you a development daemon (`devdaemon`) for this purpose.

Taken together, it goes like this:

1. Use your preferred toolset such as React/Vite to serve your app frontend.
2. Use `devdaemon` to serve your app agent.
3. Link the frontend to the agent using a `<link rel='webdaemon'>` element.
4. Use the web daemon shell to launch and manage your app under development.
5. Whizz round the _test-edit-test_ loop until your app is complete!

Hot module swap (HMR) works for your frontend code as usual, and for your agent code likewise.

Now would be a good time to follow the steps in the
[Local Development](../tutorials/local_development) tutorial.
