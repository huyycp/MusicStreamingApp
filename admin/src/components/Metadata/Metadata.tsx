import Artist from '../../assets/icon/Artist.svg?react'
import Album from '../../assets/icon/Album.svg?react'
import Song from '../../assets/icon/Song.svg?react'
import User from '../../assets/icon/User.svg?react'
import './Metadata.css'
import { Result } from '../../type/IDashBoard'
import { useEffect, useState } from 'react'
import { apiInfo } from '../../Auth/DashboardAPI'
import Loader from '../Loader/Loader'
import { Box } from '@mui/material'

const Metadata = () => {
  const [gets, setGets] = useState<Result | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiInfo()

        if (!data.result) {
          throw new Error('Network response was not ok')
        }
        setGets(data.result)
      } catch (err) {
        if (err instanceof Error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching data:', err)
        }
      }
    }

    fetchData()
  }, [])

  return (
    <Box>
      {gets ? (
        <div className='Wrapper'>
          <div className='BG'>
            <div className='bgcircle'>
              <Artist />
            </div>
            <div className='title'>{gets?.total_artist}</div>
            <p className='metadata'>Total Music Artist</p>
          </div>
          <div className='BG'>
            <div className='bgcircle'>
              <Album />
            </div>
            <div className='title'>{gets?.total_album}</div>
            <p className='metadata'>Total Music Albums</p>
          </div>
          <div className='BG'>
            <div className='bgcircle'>
              <Song />
            </div>
            <div className='title'>{gets?.total_track}</div>
            <p className='metadata'>Total Tracks</p>
          </div>
          <div className='BG'>
            <div className='bgcircle'>
              <User />
            </div>
            <div className='title'>{gets?.total_listener}</div>
            <p className='metadata'>Total Users</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Box>
  )
}

export default Metadata
