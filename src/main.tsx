import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './app/App.tsx'

// Accessibility checks only during the development
if (import.meta.env.MODE === 'development') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, undefined, 1000)
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
