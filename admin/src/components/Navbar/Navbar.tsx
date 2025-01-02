import { AccountBoxOutlined, Logout, NotificationsNoneOutlined } from '@mui/icons-material'
import { Avatar, IconButton, List, ListItem, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationList from '../Notification/Notification'
import { apiGetNoti, apiPatchReadNoti } from '../../Auth/NotificationAPI'
import { DatumNotification } from '../../type/INotification'
import Loader from '../Loader/Loader'
import useDebounce from '../../hooks/useDebounce'
import { apiSearch } from '../../Auth/DashboardAPI'
import { Artist, ResultSearch, Track } from '../../type/IDashBoard'

const Search = styled('div')(({ theme }) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35)
  },
  'marginRight': theme.spacing(2),
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  'color': theme.palette.common.white,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [showNoti, setShowNoti] = useState(false)

  const handleAvatarClick = () => {
    setShowSubMenu(!showSubMenu)
  }

  const handleNotiClick = () => {
    setShowNoti(!showNoti)
  }

  const handleAvatarClose = () => {
    setShowSubMenu(false)
  }

  const handleNotiClose = () => {
    setShowNoti(false)
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    navigate('/login')
  }

  const handleViewProfile = () => {
    navigate('/profile')
    setShowSubMenu(false)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState<DatumNotification[]>([])
  const [page, setPage] = useState(1)
  const [totalpage, setTotalPage] = useState(Number)
  const fetchNotifications = async () => {
    setIsLoading(true)
    try {
      const response = await apiGetNoti(5, page)
      setTotalPage(response.result.meta.total_pages)
      setNotifications((prevNotifications) => [...prevNotifications, ...response.result.data])
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // apiPatchReadNoti
  const fetchReadNoti = async (index: number) => {
    try {
      const response = await apiPatchReadNoti(notifications[index]._id)
      // eslint-disable-next-line no-console
      console.log(response)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    }
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    if (page < totalpage) {
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setPage((prevPage) => prevPage + 1)
      }
    }
  }

  const handleNotificationClick = (index: number) => {
    const updatedNotifications = [...notifications]
    updatedNotifications[index].seen = true
    setNotifications(updatedNotifications)
    fetchReadNoti(index)
    navigate(notifications[index].type === 'tracks' ? '/track/detailtrack' : '/report/trackreportcard/detailreport', {
      state: notifications[index].type === 'tracks' ? { idtrack: notifications[index].artifact_id } : { idrp: notifications[index].artifact_id }
    })
    handleNotiClose()
  }

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [resultSearch, setResultSearch] = useState<ResultSearch>()

  const fetchSearch = async () => {
    setIsLoading(true)
    try {
      const response = await apiSearch(debouncedSearch)
      setResultSearch(response.result)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchClick = (type: 'track' | 'user', id: string) => {
    if (type === 'track') {
      navigate('/track/detailtrack', { state: { idtrack: id } })
      setSearch('')
    } else if (type === 'user') {
      navigate('/user/card', { state: { iduser: id } })
      setSearch('')
    }
  }

  return (
    <div className='bg'>
      <IconButton
        size='large'
        edge='start'
        sx={{
          mr: 2,
          color: 'white',
          marginLeft: '10px'
        }}
        aria-label='open drawer'
        onClick={toggleSidebar}
      >
        <MenuIcon sx={{ color: 'white' }} />
      </IconButton>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} value={search} onChange={handleSearchChange} />
      </Search>
      {debouncedSearch && resultSearch && (
        <div className='search-results'>
          <List>
            {resultSearch.tracks.map((track: Track) => (
              <ListItem button key={track._id} onClick={() => handleSearchClick('track', track._id)}>
                <ListItemText primary={track.name} />
              </ListItem>
            ))}
            {resultSearch.artists.map((artist: Artist) => (
              <ListItem button key={artist._id} onClick={() => handleSearchClick('user', artist._id)}>
                <ListItemText primary={artist.name} />
              </ListItem>
            ))}
          </List>
          {isLoading && <Loader />}
        </div>
      )}
      <div className='right'>
        <div className='menuItem' tabIndex={0} onBlur={handleNotiClose}>
          <NotificationsNoneOutlined onClick={handleNotiClick} />
          {showNoti && (
            <div className='noti' onScroll={handleScroll} style={{ overflowY: 'auto' }}>
              <h3 style={{ marginTop: '10px', marginLeft: '20px', color: 'white' }}>Notification</h3>
              <NotificationList notifications={notifications} onNotificationClick={handleNotificationClick} />
              {isLoading && <Loader />}
            </div>
          )}
        </div>
        <div className='menuItem' tabIndex={2} onBlur={handleAvatarClose}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' sx={{ marginRight: '15px', cursor: 'pointer' }} onClick={handleAvatarClick} />
          {showSubMenu && (
            <ul className='sub-menu'>
              <li style={{ display: 'flex', padding: '10px' }} onClick={handleViewProfile}>
                <AccountBoxOutlined />
                <h3>Profile</h3>
              </li>
              <li style={{ display: 'flex', padding: '10px' }} onClick={handleLogout}>
                <Logout />
                <h3>Logout</h3>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
