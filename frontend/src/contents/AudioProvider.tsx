/* eslint-disable no-unused-vars */
import { createContext, useState, ReactNode } from 'react'

interface AudioContextProps {
  audioFile: File | null
  setAudioFile: (file: File | null) => void
  clearSearch: () => void
  setSearchValue: (keyword: string | null) => void
  searchKeyword: string
}

export const AudioContext = createContext<AudioContextProps | undefined>(undefined)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioFile, setAudioFileState] = useState<File | null>(null)
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const setAudioFile = (file: File | null) => {
    if (file !== null) {
      setAudioFileState(file)
      setSearchKeyword('')
    }
  }

  const clearSearch = () => {
    setAudioFileState(null)
    setSearchKeyword('')
  }

  const setSearchValue = (keyword: string | null) => {
    if (keyword === null) {
      setSearchKeyword('')
    }
    if (keyword !== null) {
      setSearchKeyword(keyword)
      setAudioFile(null)
    }
  }

  return <AudioContext.Provider value={{ audioFile, setAudioFile, clearSearch, setSearchValue, searchKeyword }}>{children}</AudioContext.Provider>
}
