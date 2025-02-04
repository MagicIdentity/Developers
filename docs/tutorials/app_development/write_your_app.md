---
layout: page
title: Write Your App
parent: App Development
back: Prerequisites
next: Publish Your App
---
# Step 1
Open a console window and create a skeleton Vite app called `myapp`, to be built using
React and Typescript:
```shell
deno run --allow-all npm:create-vite myapp
```
From the menus that appear, select in turn:

- `React`
- `TypeScript + SWC`

# Step 2
Using your editor, copy and paste the following code into `myapp/src/App.tsx`,
replacing what is already there:

```jsx
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserApp } from 'webdaemon'

function App() {
  const [agentApp, setAgentApp] = useState<BrowserApp | null>(null)
  const [message, setMessage] = useState('Contact Agent')

  useEffect(() => {
    BrowserApp.getInstance('myapp').then((app) => setAgentApp(app))
  }, [])

  const fetchMessage = async () => {
    try {
      if (!agentApp || agentApp.isOrphan()) {
        throw `App not linked to agent`
      }
      const url = `${agentApp.getPartyOrigin()}/tab/myapp/v1/getMessage`
      const response = await fetch(url)
      if (!response.ok) {
        throw "Agent not started"
      }
      const json = await response.json()
      setMessage(json.ok || json.error)
    }
    catch (e) {
      setMessage(String(e))
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={fetchMessage}>
          {message}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test web page HMR
        </p>
        <p>
          Edit <code>agent/agent.ts</code> and save to test web agent HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
```

# Step 3
Install the dependencies and fire it up:
```shell
cd myapp
deno install npm:webdaemon --allow-scripts
deno run dev
```

Note the port number, which defaults to `5173` but may be different on your machine.

# Step 4
Check that the new frontend loads correctly in Chrome from your local machine:
  - Navigate to [http://localhost:5173](http://localhost:5173)

If you press the button now, it will say `App not linked to agent`.
