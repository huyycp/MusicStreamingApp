// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import Error from './page/Client/Error/Error'
import TestUI from './page/Client/Main/TestUI/TestUI'
import MainLayout from './page/Client/Main/MainLayout'
import BodyContent from './page/Client/Main/BodyContent/BodyContent'
import AuthLayout from './page/Auth/AuthLayout'
import RegisterBody from './page/Auth/RegisterBody/RegisterBody'
import RegisterStep1 from './page/Auth/RegisterBody/RegisterStep1/RegisterStep1'
import RegisterStep2 from './page/Auth/RegisterBody/RegisterStep2/RegisterStep2'
import RegisterStep3 from './page/Auth/RegisterBody/RegisterStep3/RegisterStep3'
import LoginBody from './page/Auth/LoginBody/LoginBody'
import VerifyEmail from './page/Auth/RegisterBody/VerifyEmail/VerifyEmail'
import ResetPassword from './page/Auth/LoginBody/ResetPassword/ResetPassword'
import ChangePassword from './page/Auth/LoginBody/ChangePassword/ChangePassword/ChangePassword'
import ProtectedRouteAuth from './page/Auth/ProtectedRouteAuth'

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
        element: <BodyContent viewType='search' /> // Element cho trang tìm kiếm
      },
      {
        path: '/collection/tracks',
        element: <BodyContent viewType='collection' />
      },
      {
        path: '/playlist/:id',
        element: <BodyContent viewType='playlist' />
      },
      {
        path: '/test',
        element: <TestUI /> // Element cho trang TestUI
      }
    ]
  },
  {
    path: '/login',
    element: <ProtectedRouteAuth />,
    errorElement: <Error />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ index: true, element: <LoginBody /> }]
      }
    ]
  },
  {
    path: 'reset-password',
    element: <ProtectedRouteAuth />,
    errorElement: <Error />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <ResetPassword />
          },
          {
            path: 'change-password',
            element: <ChangePassword />
          }
        ]
      }
    ]
  },
  {
    path: '/register',
    element: <ProtectedRouteAuth />,
    errorElement: <Error />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <RegisterBody />
          },
          {
            path: 'step1',
            element: <RegisterStep1 />
          },
          {
            path: 'step2',
            element: <RegisterStep2 />
          },
          {
            path: 'step3',
            element: <RegisterStep3 />
          },
          {
            path: 'verify-email',
            element: <VerifyEmail />
          }
        ]
      }
    ]
  }
])

export default router
