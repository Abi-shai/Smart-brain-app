import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './containers/App'
import './index.scss'
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// reportWebVitals()
