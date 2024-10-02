import { useState, ReactNode } from 'react'
import { CreateAlbumContent } from '~/hooks/useGetCreateAlbumData'

// Provider để quản lý dữ liệu upload
export const CreateAlbumProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [trackList, setTrackList] = useState<string[]>([])
  const [artistName, setArtistName] = useState<string[]>([])

  const clearData = () => {
    setName('')
    setImageFile(null)
    setTrackList([])
    setArtistName([])
  }

  return (
    <CreateAlbumContent.Provider value={{ name, imageFile, trackList, artistName, setName, setImageFile, setTrackList, setArtistName, clearData }}>
      {children}
    </CreateAlbumContent.Provider>
  )
}
