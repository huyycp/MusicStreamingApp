import Artist from '../../assets/icon/Artist.svg?react'
import Album from '../../assets/icon/Album.svg?react'
import Song from '../../assets/icon/Song.svg?react'
import Playlist from '../../assets/icon/Playlist.svg?react'
import User from '../../assets/icon/User.svg?react'
import './Metadata.css'

const Metadata = () => {
  return (
    <div className='Wrapper'>
      <div className='BG'>
        <div className='Circle'>
          <Artist />
        </div>
        <p>Total Music Artist</p>
      </div>
      <div className='BG'>
        <div className='Circle'>
          <Album />
        </div>
        <p>Total Music Albums</p>
      </div>
      <div className='BG'>
        <div className='Circle'>
          <Song />
        </div>
        <p>Total Songs</p>
      </div>
      <div className='BG'>
        <div className='Circle'>
          <Playlist />
        </div>
        <p>Total Playlist</p>
      </div>
      <div className='BG'>
        <div className='Circle'>
          <User />
        </div>
        <p>Total Users</p>
      </div>
    </div>
  )
}

export default Metadata
