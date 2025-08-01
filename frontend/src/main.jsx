import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './route.jsx'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router/>
    </AuthProvider>
  </StrictMode>,
)
