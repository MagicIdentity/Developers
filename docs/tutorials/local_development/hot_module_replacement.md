---
layout: page
title: Hot Module Replacement
parent: Local Development
back: Running the App
next: Build Distribution
---
We'll now make a simple change to the app's web page and web agent
in turn to illustrate how HMR speeds the development cycle.

# Step 1
Use your editor to change the `src/App.tsx` file:

- In line 10, change the default message to from `Contact Agent` to `Contact Web Agent`

You can see the change reflected immediately in the app's web page.

# Step 2
Use your editor to change the `agent.ts` file:

- In line 9, change the message from `Agent says hi!` to `Agent says hello!`
- Click the button in the web page.

You can see the changed message returned by the agent with no agent reload required.
