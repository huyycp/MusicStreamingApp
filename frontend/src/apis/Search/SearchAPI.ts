import axios from 'axios'
import instance from '~/axiosConfig'

export const apiSearchByAudio = async (audio: File) => {
  const formData = new FormData()
  formData.append('audioFile', audio)
  const response = await axios.post('https://1shzcdf6-5000.asse.devtunnels.ms/recognize', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const apiSearch = async (keyword: string) => {
  const response = await instance.get('/search', {
    params: {
      keyword
    }
  })
  return response.data
}

export const apiSearchWithParam = async (keyword: string, type: 'albums' | 'artists' | 'tracks') => {
  const response = await instance.get('/search', {
    params: {
      keyword,
      type
    }
  })
  return response.data
}
