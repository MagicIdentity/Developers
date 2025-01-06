---
layout: page
title: Local Agent
back: Activate
parent: Starting out
---
We provide an all-in-one `docker` container that allows you develop an
agent app using any toolchain you like on your Mac or PC.

The steps are:

1. Use your preferred toolset such as React/Vite to produce a skeleton browser frontend.
2. Copy and paste a simple skeleton agent backend.
3. Link them together using a `<link rel='webdaemon'>` element.
4. Run up the standard local development web agent using `docker run`.
5. Use the web agent shell to install the app using its local URL.
6. Whizz round the _edit-test-edit_ loop until your app is complete!

Hot module swap (HMR) works for both React frontend running in your browser
and Typescript backend running in your local web agent.

Follow the steps in the [Local Development](../tutorials/local_development) tutorial when you're ready.
