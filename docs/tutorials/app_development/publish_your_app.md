---
layout: page
title: Publish Your App
back: Write Your App
next: Write Your Agent
parent: App Development
---
Your app is not yet visible on the internet, because it is running locally on
your computer as `http://localhost:5173`.

# Step 1
Open a new terminal window and use `cloudflared` to publish your app on the internet:

- `cloudflared tunnel --url http://localhost:5173`

Note down the newly created address for your app from the generated output. In the example
output below, the address is `https://subsection-remedies-nb-polymer.trycloudflare.com`:
```
2025-02-04T06:57:13Z INF Requesting new quick Tunnel on trycloudflare.com...
2025-02-04T06:57:19Z INF +--------------------------------------------------------------------------------------------+
2025-02-04T06:57:19Z INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
2025-02-04T06:57:19Z INF |  https://subsection-remedies-nb-polymer.trycloudflare.com                                  |
2025-02-04T06:57:19Z INF +--------------------------------------------------------------------------------------------+
```

Now your app has a public URL and will work from anywhere on the internet.

# Step 2
Navigate to that public URL in your browser.

Note that this address lasts only as long as your computer is on and the `cloudflared` command
remains uninterrupted!

To learn more, find [cloudflared](https://github.com/cloudflare/cloudflared) on Github.
