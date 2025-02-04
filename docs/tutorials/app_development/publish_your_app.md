---
layout: page
title: Publish Your App
back: Write Your App
next: Write Your Agent
parent: App Development
---
Your app is not yet visible on the internet, because it is running locally on
your computer as `http://localhost:5173`.

Tools like `ngrok` or `cloudflared` can be used to expose this host on the internet.

Both have a free test capability, but ngrok's is hobbled by an interstitial page that
blocks access to your site and uses cookies unless you have a paid account.

# Step 1
Open a new terminal window.

Install `cloudflared` on your computer as a global executable and use it to publish
your app:

1. `deno install --allow-all --global npm:cloudflared`
2. `cloudflared tunnel --url http://localhost:5173`

Note down the newly created address for your app from the generated output. In the example
output below, the address is `https://subsection-remedies-nb-polymer.trycloudflare.com`:
```
2025-02-04T06:57:13Z INF Requesting new quick Tunnel on trycloudflare.com...
2025-02-04T06:57:19Z INF +--------------------------------------------------------------------------------------------+
2025-02-04T06:57:19Z INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
2025-02-04T06:57:19Z INF |  https://subsection-remedies-nb-polymer.trycloudflare.com                                  |
2025-02-04T06:57:19Z INF +--------------------------------------------------------------------------------------------+
```

# Step 2
Now you've got a public URL, navigate to that address in your browser to check the tunnel works.

Note that this address lasts only as long as your computer is on and the `cloudflared` command
remains uninterrupted!

To learn more, find [cloudflared](https://github.com/cloudflare/cloudflared) on Github.
