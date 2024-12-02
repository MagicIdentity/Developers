---
layout: page
title: Install
parent: Hello World
next: Publish Your Own
---
In this section you're going to install an app on your agent using your agent's shell.

## Instructions

1. Navigate directly to your Web Agent in your browser by typing its name into your browser URL bar.
   - You should do this in the browser you originally, or normally, use for your agent.
   - If this doesn't show the Home page, you may need to [reclaim]({{ "/start/activate" | relative_url }}) the agent.
2. Click <span class='material-icons'>add</span> Add Application top right to install a new app.
3. _EITHER_ Copy and paste the following URL which points to the HTML file:
   `https://webdaemon.online/dev/static/apps/helloWorld/helloWorld.html`
4. _OR_ If the `Scan` button appears, then scan the QR code of that same URL:

   ![Hello World]({{ "/assets/images/helloWorldQr.png" | relative_url }})

You'll see the _Hello World_ message appear. If you refresh the page you'll notice the _Last seen_ time change.

## Note
The _Last seen_ time is actually saved in the backend of your agent - not in a central server, and not in your browser either.

That's because the app has _its own private backend API_ hosted in your own agent.
