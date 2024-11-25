import axios from 'axios'

export const apiSearchByAudio = async (audio: File) => {
  const formData = new FormData()
  formData.append('audioFile', audio)
  const response = await axios.post('https://93bscn29-5000.asse.devtunnels.ms/recognize', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
