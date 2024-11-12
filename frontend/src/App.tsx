import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from './router'
import theme from './theme'
import { UserProvider } from './contents/UserProvider'
import useGetProfile from './hooks/User/useGetProfile'

function App() {
  const { data, isPending } = useGetProfile()
  return (
    <ThemeProvider theme={theme}>
      {!isPending && (
        <UserProvider user={data?.result}>
          <CssBaseline />
          <RouterProvider router={router} />
        </UserProvider>
      )}
      {isPending && (
        <UserProvider user={null}>
          <CssBaseline />
          <RouterProvider router={router} />
        </UserProvider>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  )
}

export default App
