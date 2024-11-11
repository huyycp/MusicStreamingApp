import { useState, useEffect, ReactNode } from 'react'
import useGetAlbumDetail from '~/hooks/Album/useGetLibraryDetail'
import MusicContext from '~/hooks/useMusic'
import { ITrack } from '~/type/Tracks/ITrack'

interface MusicProviderProps {
  children: ReactNode
  listAlbumId: string[]
  initIndexAlbum: number
  // eslint-disable-next-line no-unused-vars
  addAlbumToList: (albumId: string, currentAlbumIndex: number, currentTrackIndex: number) => void
  trackIndex: number
}

export function MusicProvider({ children, listAlbumId, initIndexAlbum, addAlbumToList, trackIndex }: MusicProviderProps) {
  const [pause, setPause] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.5)
  const [mute, setMute] = useState<boolean>(false)
  const [repeat, setRepeat] = useState<boolean>(false)
  const [music, setMusic] = useState<ITrack | null>(null)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState<number>(0 + initIndexAlbum)
  const [listMusic, setListMusic] = useState<ITrack[]>([])
  const [defaultIndex, setDefaultIndex] = useState<number>(trackIndex)

  const { data, isPending } = useGetAlbumDetail(listAlbumId[currentAlbumIndex])

  useEffect(() => {
    if (data) {
      const tracks = data.result.list_of_tracks as ITrack[]
      setListMusic(tracks)
      setCurrentTrackIndex(defaultIndex)
      setMusic(tracks[defaultIndex] || null)
    }
  }, [data, defaultIndex])

  const handleNextTrack = () => {
    const nextIndex = currentTrackIndex + 1
    if (nextIndex >= listMusic.length) {
      if (currentAlbumIndex < listAlbumId.length - 1 && !isPending) {
        setCurrentAlbumIndex((prevIndex) => prevIndex + 1)
        setCurrentTrackIndex(0)
      } else {
        setCurrentAlbumIndex(0)
        setCurrentTrackIndex(0)
      }
    } else {
      setCurrentTrackIndex(nextIndex)
    }
  }

  const handlePreviousTrack = () => {
    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : listMusic.length - 1

    if (currentTrackIndex === 0 && !isPending) {
      if (currentAlbumIndex > 0 && !isPending) {
        setCurrentAlbumIndex((prevIndex) => prevIndex - 1)

        setDefaultIndex(0)
      } else {
        setCurrentAlbumIndex(listAlbumId.length - 1)
        setCurrentTrackIndex(listMusic.length - 1)
        changeMusic(listMusic[listMusic.length - 1])
      }
    } else {
      setCurrentTrackIndex(prevIndex)
    }
  }

  const changeMusic = (song: ITrack) => {
    if (audioElement) {
      audioElement.pause()
      audioElement.src = ''
      audioElement.load()
    }

    const newAudio = new Audio(song.path_audio)
    setMusic(song)
    setPosition(0)
    setAudioElement(newAudio)

    newAudio.play()
    setPause(false)
  }

  useEffect(() => {
    const handleEnded = () => {
      if (repeat) {
        audioElement?.play()
      } else {
        playNextTrack()
      }
    }

    const updatePositionAndDuration = () => {
      if (audioElement) {
        setPosition(audioElement.currentTime)
        setDuration(audioElement.duration || 0)
      }
    }

    if (audioElement) {
      audioElement.addEventListener('ended', handleEnded)
      audioElement.addEventListener('timeupdate', updatePositionAndDuration)

      return () => {
        audioElement.removeEventListener('ended', handleEnded)
        audioElement.removeEventListener('timeupdate', updatePositionAndDuration)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioElement, repeat])

  useEffect(() => {
    if (audioElement) {
      audioElement.volume = mute ? 0 : volume
      audioElement.loop = repeat
    }
  }, [mute, volume, repeat, audioElement])

  useEffect(() => {
    if (!isPending && listMusic.length > 0) {
      const initialMusic = listMusic[currentTrackIndex]
      changeMusic(initialMusic)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, listMusic, currentTrackIndex])

  useEffect(() => {
    if (audioElement) {
      if (pause) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
    }
  }, [pause, audioElement])

  const playNextTrack = () => {
    if (!isPending) {
      const nextIndex = currentTrackIndex + 1
      if (nextIndex < listMusic.length) {
        setCurrentTrackIndex((prev) => prev + 1)
        changeMusic(listMusic[nextIndex])
      } else {
        handleNextTrack()
      }
    }
  }

  const playPreviousTrack = () => {
    if (!isPending) {
      if (currentTrackIndex > 0) {
        const prevIndex = currentTrackIndex - 1
        setCurrentTrackIndex(prevIndex)
        changeMusic(listMusic[prevIndex])
      }
      handlePreviousTrack()
    }
  }

  const addAlbum = (albumId: string, musicIndex: number) => {
    const existingIndex = listAlbumId.indexOf(albumId)
    setDefaultIndex(musicIndex)
    if (existingIndex !== -1) {
      setCurrentAlbumIndex(existingIndex)
    } else {
      addAlbumToList(albumId, currentAlbumIndex + 1, musicIndex)
    }
  }

  return (
    <MusicContext.Provider
      value={{
        audioElement,
        position,
        setPosition,
        duration,
        playNextTrack,
        playPreviousTrack,
        pause,
        setPause,
        repeat,
        setRepeat,
        mute,
        setMute,
        volume,
        setVolume,
        music,
        changeMusic,
        addAlbum,
        currentAlbumIndex: listAlbumId[currentAlbumIndex]
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
