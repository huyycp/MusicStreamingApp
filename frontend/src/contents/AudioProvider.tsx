import { createContext, useState, ReactNode } from 'react'

interface AudioContextProps {
  audioFile: File | null
  // eslint-disable-next-line no-unused-vars
  setAudioFile: (file: File | null) => void
  clearAudioFile: () => void
}

export const AudioContext = createContext<AudioContextProps | undefined>(undefined)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioFile, setAudioFileState] = useState<File | null>(null)

  const setAudioFile = (file: File | null) => {
    setAudioFileState(file)
  }

  const clearAudioFile = () => {
    setAudioFileState(null)
  }

  return <AudioContext.Provider value={{ audioFile, setAudioFile, clearAudioFile }}>{children}</AudioContext.Provider>
}
