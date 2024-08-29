import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Error from './page/Client/Error/Error'
import TestUI from './page/Client/Main/TestUI/TestUI'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />
  },
  {
    path: '/search',
    element: <App />,
    errorElement: <Error />
  },
  {
    path: '/test',
    element: <TestUI />,
    errorElement: <Error />
  }
])

export default router
