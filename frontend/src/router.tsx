// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import Error from './page/Client/Error/Error'
import TestUI from './page/Client/Main/TestUI/TestUI'
import MainLayout from './page/Client/Main/MainLayout'
import BodyContent from './page/Client/Main/BodyContent/BodyContent'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <BodyContent /> // Element cho trang chính
      },
      {
        path: '/search',
        element: <BodyContent viewType='search'/> // Element cho trang tìm kiếm
      },
      {
        path: '/collection/tracks',
        element: <BodyContent viewType='collection'/>
      },
      {
        path: '/playlist/:id',
        element: <BodyContent viewType='playlist'/>
      },
      {
        path: '/test',
        element: <TestUI /> // Element cho trang TestUI
      }
    ]
  }
])

export default router
