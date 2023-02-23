import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'

import App from './App/App'
import NavBar from './NavBar/NavBar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='main'>
      <div className='margin'></div>
      <div>
        <NavBar />
        <main>
          <h1>Unnamed list</h1>
          <App />
        </main>
      </div>
      <div className='margin'></div>
    </div>
  </React.StrictMode>
)