// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import Error from './page/Client/Error/Error'
import TestUI from './page/Client/Main/TestUI/TestUI'
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
import MainLayout from './page/Client/Main/MainLayout'
import BodyContent from './page/Client/Main/BodyContent/BodyContent'
import UploadMusicLayout from './page/Client/UploadMusic/UploadMusicLayout'
import UploadMusicBody from './page/Client/UploadMusic/UploadMusicBody/UploadMusicBody'
import UploadStep1 from './page/Client/UploadMusic/UploadStep1/UploadStep1'
import UploadStep2 from './page/Client/UploadMusic/UploadStep2/UploadStep2'
import ProtectedRoute from './components/ProtectedRoute'
import UploadStep3 from './page/Client/UploadMusic/UploadStep3/UploadStep3'
import CreateAlbumBody from './page/Client/UploadAlbum/CreateAlbumBody/CreateAlbumBody'
import CreateAlbumLayout from './page/Client/UploadAlbum/CreateAlbumLayout'
import AddTrackToAlbum from './page/Client/UploadAlbum/AddTrackToAlbum/AddTrackToAlbum'
import CreateAlbumFinal from './page/Client/UploadAlbum/CreateAlbumFinal/CreateAlbumFinal'
import UploadStep4 from './page/Client/UploadMusic/UploadStep4/UploadStep4'
import RegisterStep4 from './page/Auth/RegisterBody/RegisterStep4/RegisterStep4'
import GenresChose from './components/GenresChose'
import AppBar from './page/Auth/AppBar/AppBar'
import VnPayForm from './components/VnPay/VnPayForm/VnPayForm'
import VnPayReturn from './components/VnPay/VnPayReturn/VnPayReturn'
import PayOSForm from './components/PayOS/PayOSForm/PayOSForm'
import PayOSCancel from './components/PayOS/PayOSCancel/PayOSCancel'

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
        path: '/liked-music/tracks',
        element: <BodyContent viewType='liked-music' />
      },
      {
        path: '/playlist/:id',
        element: <BodyContent viewType='playlist' />
      },
      {
        path: '/library/:albumId',
        element: <BodyContent viewType='album' />
      },
      {
        path: '/track/:trackId',
        element: <BodyContent viewType='track' />
      },
      {
        path: '/my-music',
        element: <BodyContent viewType='my-music' />
      },
      {
        path: '/artist/:artistId',
        element: <BodyContent viewType='artist' />
      },
      {
        path: '/section',
        element: <BodyContent viewType='section' />
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
    path: '/upload-music',
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <UploadMusicLayout />,
        children: [
          {
            index: true,
            element: <UploadMusicBody />
          },
          {
            path: 'step1',
            element: <UploadStep1 />
          },
          {
            path: 'step2',
            element: <UploadStep2 />
          },
          {
            path: 'step3',
            element: <UploadStep3 />
          },
          {
            path: 'step4',
            element: <UploadStep4 />
          }
        ]
      }
    ]
  },
  {
    path: '/create-album',
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <CreateAlbumLayout />,
        children: [
          {
            index: true,
            element: <CreateAlbumBody />
          },
          {
            path: 'final',
            element: <CreateAlbumFinal />
          },
          {
            path: ':id/add-track',
            element: <AddTrackToAlbum />
          }
        ]
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
            path: 'step4',
            element: <RegisterStep4 />
          },
          {
            path: 'verify-email',
            element: <VerifyEmail />
          }
        ]
      }
    ]
  },
  {
    path: '/payment',
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <AppBar />,
        children: [
          {
            index: true,
            element: <PayOSForm />
          },
          {
            path: 'cancel',
            element: <PayOSCancel />
          }
        ]
      }
    ]
  },
  {
    path: '/paymentVnPay',
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <AppBar />,
        children: [
          {
            index: true,
            element: <VnPayForm />
          },
          {
            path: 'return',
            element: <VnPayReturn />
          }
        ]
      }
    ]
  },
  {
    path: '/genres',
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <AppBar />,
        children: [
          {
            index: true,
            element: <GenresChose />
          }
        ]
      }
    ]
  }
])

export default router
