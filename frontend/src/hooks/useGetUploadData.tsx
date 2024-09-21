/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react'

// Interface để quản lý dữ liệu upload
interface UploadContextType {
  name: string
  audioFile: File | null
  imageFile: File | null
  lyrics: string
  setName: (name: string) => void
  setAudioFile: (file: File | null) => void
  setImageFile: (file: File | null) => void
  setLyrics: (data: string) => void
  artistName: string
  setArtistName: (data: string) => void
  clearData: () => void
}

// Tạo context
export const UploadContext = createContext<UploadContextType | undefined>(undefined)

// Custom hook để truy cập dữ liệu từ UploadProvider
// eslint-disable-next-line react-refresh/only-export-components
export const useGetUploadData = () => {
  const context = useContext(UploadContext)

  if (!context) {
    throw new Error('useUploadMusic must be used within an UploadProvider')
  }

  return context
}
