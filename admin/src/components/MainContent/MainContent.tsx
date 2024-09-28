import { KeyboardArrowDown } from '@mui/icons-material'
import './MainContent.css'
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar'
import HorizontalBar from '../HorizontalBar/HorizontalBar'
import Album from '../../assets/icon/Album.svg?react'
import Song from '../../assets/icon/Song.svg?react'
import Playlist from '../../assets/icon/Playlist.svg?react'

const MainContent = () => {
  return (
    <div>
      <div className='Bg'>
        <div className='TopArtist'>
          <div className='Top'>
            <div className='Left'>
              <h3>Top Artist</h3>
            </div>
            <div className='Right'>
              <div>View All</div>
              <KeyboardArrowDown />
            </div>
          </div>
          <div className='Top'>
            <div className='Left'>
              <div>Show</div>
              <select>
                <option value='home'>Home</option>
                <option value='about'>About</option>
                <option value='services'>Services</option>
                <option value='contact'>Contact</option>
              </select>
              <div>entries</div>
            </div>
            <div className='Right'>
              <div>Search </div>
              <input></input>
            </div>
          </div>
          <div className='TableContainer'>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Artist Name</th>
                  <th>Joining Date</th>
                  <th>Total Songs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>
                    Nguyen Van A
                    <br />
                    <td>nguyenvana@gmail.com</td>
                  </td>
                  <td>14/9/2024</td>
                  <td>160</td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>
                    Nguyen Van A
                    <br />
                    <td>nguyenvana@gmail.com</td>
                  </td>
                  <td>14/9/2024</td>
                  <td>160</td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>
                    Nguyen Van A
                    <br />
                    <td>nguyenvana@gmail.com</td>
                  </td>
                  <td>14/9/2024</td>
                  <td>160</td>
                </tr>
                <tr>
                  <td>04</td>
                  <td>
                    Nguyen Van A
                    <br />
                    <td>nguyenvana@gmail.com</td>
                  </td>
                  <td>14/9/2024</td>
                  <td>160</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='Top'>
            <div className='Left'>Showing 1 to 3 of 3 entries</div>
            <div className='Right'>
              <div className='Pagination'>
                <button>Previous</button>
                <button>1</button>
                <button>Next</button>
              </div>
            </div>
          </div>
        </div>
        <div className='TotalReviews'>
          <h3>Total Reviews</h3>
          <div className='content'>
            <div className='CircularProgressBar'>
              <CircularProgressBar></CircularProgressBar>
            </div>
            <div className='HorizontalBar' style={{ marginTop: '20px' }}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: '18px', height: '18px' }}>
                      <Song />
                    </td>
                    <td>
                      <div className='Right'>5.674</div>
                      <HorizontalBar />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Album />
                    </td>
                    <td>
                      <div className='Right'>5.674</div>
                      <HorizontalBar />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Playlist />
                    </td>
                    <td>
                      <div className='Right'>5.674</div>
                      <HorizontalBar />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='Bg'>
        <div className='RecentUsers'>
          <h3>Recent Users</h3>
          <div className='TableContainer'>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src='src/assets/img/img1.jpg' />
                  </td>
                  <td>
                    Nguyen Van A
                    <br />
                    <td>nguyenvana@gmail.com</td>
                  </td>
                  <td>
                    <div style={{ color: '#1DB954' }}>12 hours ago</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src='src/assets/img/img2.jpg' />
                  </td>
                  <td>
                    Nguyen Van B
                    <br />
                    <td>nguyenvanb@gmail.com</td>
                  </td>
                  <td>
                    <div style={{ color: '#1DB954' }}>14 hours ago</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src='src/assets/img/img3.jpg' />
                  </td>
                  <td>
                    Nguyen Van C
                    <br />
                    <td>nguyenvanc@gmail.com</td>
                  </td>
                  <td>
                    <div style={{ color: '#1DB954' }}>16 hours ago</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src='src/assets/img/img1.jpg' />
                  </td>
                  <td>
                    Nguyen Van D
                    <br />
                    <td>nguyenvand@gmail.com</td>
                  </td>
                  <td>
                    <div style={{ color: '#1DB954' }}>18 hours ago</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='TotalReviews2'>
          <h3>Total Reviews</h3>
          <div className='TableContainer'>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src='src/assets/img/img1.jpg' />
                  </td>
                  <td>
                    This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics.
                    <br />
                    <div className='Top'>
                      <div className='Left'>By Nguyen Van A</div>
                      <div className='Right'>
                        <div style={{ color: '#1DB954' }}>2 hours ago</div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src='src/assets/img/img2.jpg' />
                  </td>
                  <td>
                    This song resonates deeply with my emotions, coloring my world with its enchanting melody and sincere lyrics.
                    <br />
                    <div className='Top'>
                      <div className='Left'>By Nguyen Van B</div>
                      <div className='Right'>
                        <div style={{ color: '#1DB954' }}>3 hours ago</div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src='src/assets/img/img3.jpg' />
                  </td>
                  <td>
                    This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics.
                    <br />
                    <div className='Top'>
                      <div className='Left'>By Nguyen Van C</div>
                      <div className='Right'>
                        <div style={{ color: '#1DB954' }}>4 hours ago</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent
