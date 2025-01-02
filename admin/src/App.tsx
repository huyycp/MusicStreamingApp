import './App.css'
import './theme.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import User from './page/User'
import Gerne from './page/Gerne'
import Login from './Login'
import { Box } from '@mui/material'
import Home from './Home'
import PrivateRoute from './PrivateRoute'
import UserCard from './page/UserCard'
import SlideBar from './components/SideBar/SideBar'
import Report from './page/Report'
import DetailTrackReport from './page/DetailTrackReport'
import Profile from './page/Profile'
import DetailReport from './page/DetailReport'
import React, { useState } from 'react'
import { ToastProvider } from './contexts/ToastProvider'
import Track from './page/TrackModeration'
import DetailTrack from './page/DetailTrack'
import DetailAlbum from './page/DetailAlbum'

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  )
}

function MainLayout() {
  const location = useLocation()

  const [sidebarWidth, setSidebarWidth] = useState('200px')

  const toggleSidebar = () => {
    setSidebarWidth((prev) => (prev === '200px' ? '80px' : '200px'))
  }

  React.useEffect(() => {
    document.documentElement.style.setProperty('--slidebar', sidebarWidth)
    document.documentElement.style.setProperty('--display', sidebarWidth === '80px' ? 'none' : 'block')
  }, [sidebarWidth])

  return (
    <ToastProvider>
      <Box bgcolor='var(--secondary-main-color)' sx={{ Height: '100vh', minWidth: '800px', display: 'flex', position: 'relative' }}>
        {location.pathname !== '/login' && (
          <Box
            sx={{
              width: sidebarWidth,
              transition: 'width 1s ease-in-out',
              overflow: 'hidden'
            }}
          >
            <SlideBar />
          </Box>
        )}
        <div className='main' style={{ width: `calc(100vw - ${sidebarWidth} - 10px)` }}>
          {location.pathname !== '/login' && <Navbar toggleSidebar={toggleSidebar} />}
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<PrivateRoute element={<Home />} />} />
            <Route path='/gerne' element={<PrivateRoute element={<Gerne />} />} />
            <Route path='/user' element={<PrivateRoute element={<User />} />} />
            <Route path='/user/card' element={<PrivateRoute element={<UserCard />} />} />
            <Route path='/user/card/detailalbum' element={<PrivateRoute element={<DetailAlbum />} />} />
            <Route path='/report' element={<PrivateRoute element={<Report />} />} />
            <Route path='/report/trackreportcard' element={<PrivateRoute element={<DetailTrackReport />} />} />
            <Route path='/report/trackreportcard/detailreport' element={<PrivateRoute element={<DetailReport />} />} />
            <Route path='/profile' element={<PrivateRoute element={<Profile />} />} />
            <Route path='/track' element={<PrivateRoute element={<Track />} />} />
            <Route path='/track/detailtrack' element={<PrivateRoute element={<DetailTrack />} />} />
          </Routes>
        </div>
      </Box>
    </ToastProvider>
  )
}

export default App
