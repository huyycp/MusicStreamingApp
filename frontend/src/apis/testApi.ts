import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/songs/v2/get-details',
  params: {
    id: '1217912247',
    l: 'en-US'
  },
  headers: {
    'x-rapidapi-key': '5d02b5cf26msh7650848cc86c18cp14e901jsn6ecfff81015d',
    'x-rapidapi-host': 'shazam.p.rapidapi.com'
  }
}

export const fetchSongData = async () => {
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching song data:', error)
    return null
  }
}
