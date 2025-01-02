import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRouteAuth() {
  const token = localStorage.getItem('access_token')

  if (token) {
    return <Navigate to='/' />
  }

  return <Outlet />
}
