import { createBrowserRouter } from 'react-router-dom'
import Main from '~/page/Main/Main'
import Error from '~/page/Error/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />
  }
])

export default router
