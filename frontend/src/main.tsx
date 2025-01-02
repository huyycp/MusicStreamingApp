import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FavoriteProvider } from './contents/FavoriteProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if ((error as AxiosError)?.response?.status === 401) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <FavoriteProvider favoriteIds={null}>
      <App />
    </FavoriteProvider>
  </QueryClientProvider>
)
