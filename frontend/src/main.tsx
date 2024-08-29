import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from '~/theme.tsx'
import { Provider } from 'react-redux'
import { store } from '~/redux/store.ts'
import { RouterProvider } from 'react-router-dom'
import router from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
