// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline } from '@mui/material'
// import router from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline />
    <App />
  </>
)
