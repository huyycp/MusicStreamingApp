/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react'
import { ILibrary } from '~/type/Library/ILibrary'
import { ITrack } from '~/type/Tracks/ITrack'

interface MusicContextProps {
  audioElement: HTMLAudioElement | null
  position: number
  setPosition: React.Dispatch<React.SetStateAction<number>>
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
  pause: boolean
  setPause: React.Dispatch<React.SetStateAction<boolean>>
  repeat: boolean
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>
  mute: boolean
  setMute: React.Dispatch<React.SetStateAction<boolean>>
  duration: number
  playNextTrack: () => void
  playPreviousTrack: () => void
  music: ITrack | null
  nextMusic: ITrack | null
  changeMusic: (music: ITrack) => void
  addAlbum: (albumId: string, musicIndex: number, trackId?: string) => void
  currentAlbumIndex: string
  currentTrackIndex: number
  album: ILibrary,
  addTrackList: (trackList: ITrack[]) => void
}

const MusicContext = createContext<MusicContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}

export default MusicContext
