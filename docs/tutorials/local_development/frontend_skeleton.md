---
layout: page
title: Frontend Skeleton
parent: Local Development
back: Prerequisites
next: Backend Skeleton
---
# Step 1
Open a console window and create a skeleton Vite app called `demo`, to be built using
React and Typescript:
```shell
deno run --allow-all npm:create-vite demo
```
From the menus that appear, select in turn:

- `React`
- `TypeScript + SWC`

# Step 2
Use your editor to replace the default `src/App.tsx` with this slightly adjusted
version:
```jsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState('No message yet')

  const fetchMessage = async () => {
    const response = await fetch('http://localhost:5678/')
    const json = await response.json()
    setMessage(json.ok)
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
          Edit <code>src/App.tsx</code> and save to test HMR
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

# Step 2
Go into the app directory to install the libraries and run the development app web server:
```shell
cd demo
deno install --allow-scripts
deno run dev
```

- Note the displayed URL, for example `http://localhost:5173/`.
- Go to your browser and enter that same URL to check the frontend web app is being served:
  ![Frontend](./frontend.png)
