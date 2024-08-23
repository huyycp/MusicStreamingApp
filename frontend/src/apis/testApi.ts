import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/songs/v2/get-details',
  params: {
    id: '1217912247',
    l: 'en-US'
  },
  headers: {
    'x-rapidapi-key': 'Need a key',
    'x-rapidapi-host': 'shazam.p.rapidapi.com'
  }
}

export const fetchSongData = async () => {
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error('Error fetching song data:', error)
    return null
  }
}
