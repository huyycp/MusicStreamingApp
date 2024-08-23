import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import App from '~/App.tsx'
import { CssBaseline } from '@mui/material'
import theme from '~/theme.tsx'
import { Provider } from 'react-redux'
import { store } from '~/redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
