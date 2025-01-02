// import { KeyboardArrowDown } from '@mui/icons-material'
import './MainContent.css'
import { Result, ResultTopAlbum, ResultTopArtist } from '../../type/IDashBoard'
import DoughnutChart from '../Chart/DoughnutChart'
import { useEffect, useState } from 'react'
import { apiGetTopArtist, apiGetTopAlbum, apiInfo } from '../../Auth/DashboardAPI'
import MusicBarChart from '../Chart/CustomContentOfTooltip'

const MainContent = () => {
  const [labels, setLabels] = useState<string[]>([])
  const [data, setData] = useState<number[]>([])
  const [gets, setGets] = useState<Result | null>(null)
  const [topAlbum, setTopAlbum] = useState<ResultTopAlbum[]>([])
  const [topArtist, setTopArtist] = useState<ResultTopArtist[]>([])

  const fetchData = async () => {
    try {
      const data = await apiInfo()

      if (!data.result) {
        throw new Error('Network response was not ok')
      }
      setGets(data.result)

      if (data.result?.genre_ratios) {
        // eslint-disable-next-line no-console
        console.log(gets)
        const genreLabels = data.result.genre_ratios.map((item) => item.genre)
        const genreData = data.result.genre_ratios.map((item) => item.ratio)

        // Cập nhật labels và data
        setLabels(genreLabels)
        setData(genreData)
      }
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', err)
      }
    }
  }

  const fetchTopAlbum = async () => {
    try {
      const data = await apiGetTopAlbum()

      if (!data.result) {
        throw new Error('Network response was not ok')
      }
      setTopAlbum(data.result)
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', err)
      }
    }
  }

  const fetchTopArtist = async () => {
    try {
      const data = await apiGetTopArtist()

      if (!data.result) {
        throw new Error('Network response was not ok')
      }
      setTopArtist(data.result)
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', err)
      }
    }
  }

  useEffect(() => {
    fetchData()
    fetchTopAlbum()
    fetchTopArtist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {gets && (
        <>
          <div>
            <div className='Bg'>
              <div className='TopArtist'>
                <h2>Top Track</h2>
                <MusicBarChart data={gets.top_track} />
              </div>
              <div className='TotalReviews'>
                <DoughnutChart labels={labels} data={data} />
              </div>
            </div>
            <div className='Bg'>
              <div className='RecentUsers'>
                <h2>Top Albums</h2>
                <div className='TableContainer'>
                  <table>
                    <tbody>
                      {topAlbum.map((album) => (
                        <tr>
                          <td>
                            <img className='imgAvatar' src={album.image} />
                          </td>
                          <td>
                            {album.name}
                            <br />
                            <p style={{ color: 'var(--main-color)' }}>
                              {Array.isArray(album.owners) && album.owners.length > 0 ? album.owners.map((owner) => owner.name).join(', ') : 'Null'}
                            </p>
                          </td>
                          <td>
                            {album?.created_at ? new Date(album.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='TotalReviews2'>
                <h2>Top Artist</h2>
                <div className='TableContainer'>
                  <table>
                    <tbody>
                      {topArtist.map((artist) => (
                        <tr>
                          <td>
                            <img
                              className='imgAvatar'
                              src={
                                artist.avatar ? artist.avatar : 'https://res.cloudinary.com/dswj1rtvu/image/upload/v1727670619/no-image_vueuvs.avif'
                              }
                              alt='avatar'
                            />
                          </td>
                          <td>
                            {artist.name}
                            <br />
                            <p style={{ color: 'var(--main-color)' }}>{artist.email}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MainContent
