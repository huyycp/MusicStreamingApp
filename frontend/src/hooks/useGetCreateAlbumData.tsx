/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react'

// Interface để quản lý dữ liệu upload
interface CreateAlbumType {
  name: string
  imageFile: File | null
  trackList: string[]
  artistName: string[]
  setName: (name: string) => void
  setImageFile: (file: File | null) => void
  setTrackList: (data: string[]) => void
  setArtistName: (data: string[]) => void
  clearData: () => void
  imageUrl: string
  setImageUrl: (url: string) => void
}

// Tạo context
export const CreateAlbumContent = createContext<CreateAlbumType | undefined>(undefined)

// Custom hook để truy cập dữ liệu từ UploadProvider
// eslint-disable-next-line react-refresh/only-export-components
export const useGetCreateAlbumData = () => {
  const context = useContext(CreateAlbumContent)

  if (!context) {
    throw new Error('useCreateAlbum must be used within an CreateAlbumProvider')
  }

  return context
}
