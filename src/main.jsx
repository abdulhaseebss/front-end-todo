import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Routing from './config/routing/Routing.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing>
     <App />
    </Routing>
  </React.StrictMode>,
)
