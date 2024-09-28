import { NotificationsNoneOutlined, Search, SettingsOutlined } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='bg'>
      <div className='menuItem'>Home</div>
      <div className='menuItem'>Release</div>
      <div className='menuItem'>Albums</div>
      <div className='searchContainer'>
        <Search sx={{ marginRight: '5px' }} />
        <input className='nb' placeholder='Search Here...' />
      </div>
      <div className='right'>
        <div className='menuItem'>
          <SettingsOutlined />
        </div>
        <div className='menuItem'>
          <NotificationsNoneOutlined />
        </div>
        <div className='menuItem'>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' sx={{ marginRight: '15px' }} />
          <ul className='sub-menu'>
            <li>
              <a href=''>Profile</a>
            </li>
            <li>
              <a href=''>Priacy Setting</a>
            </li>
            <li>
              <a href=''>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
