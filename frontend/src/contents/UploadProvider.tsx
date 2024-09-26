import { useState, ReactNode } from 'react'
import { UploadContext } from '~/hooks/useGetUploadData'

// Provider để quản lý dữ liệu upload
export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('')
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [lyrics, setLyrics] = useState<string>('')
  const [artistName, setArtistName] = useState<string>('')

  const clearData = () => {
    setName('')
    setAudioFile(null)
    setImageFile(null)
    setLyrics('')
    setArtistName('')
  }

  return (
    <UploadContext.Provider value={{ name, audioFile, imageFile, lyrics, setName, setAudioFile, setImageFile, setLyrics, artistName, setArtistName, clearData }}>
      {children}
    </UploadContext.Provider>
  )
}
