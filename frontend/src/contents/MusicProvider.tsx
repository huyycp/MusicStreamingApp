import { useState, useEffect, ReactNode, useRef } from 'react'
import useGetAlbumDetail from '~/hooks/Album/useGetLibraryDetail'
import useViewIncrement from '~/hooks/Tracks/useViewIncrement'
import MusicContext from '~/hooks/useMusic'
import { ITrack } from '~/type/Tracks/ITrack'

interface MusicProviderProps {
  children: ReactNode
  listAlbumId: string[]
  initIndexAlbum: number
  initTrackId: string
  // eslint-disable-next-line no-unused-vars
  addAlbumToList: (albumId: string, currentAlbumIndex: number, currentTrackIndex: number, trackId?: string) => void
  trackIndex: number
}

export function MusicProvider({ children, listAlbumId, initIndexAlbum, addAlbumToList, trackIndex, initTrackId }: MusicProviderProps) {
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
  const [trackId, setTrackId] = useState<string>(initTrackId)
  const [listMusic, setListMusic] = useState<ITrack[]>([])
  const [defaultIndex, setDefaultIndex] = useState<number>(trackIndex)
  const { data, isPending } = useGetAlbumDetail(listAlbumId[currentAlbumIndex])
  const startTimeRef = useRef<number | null>(null)
  const [hasIncrementedView, setHasIncrementedView] = useState<boolean>(false)
  const { viewIncrement } = useViewIncrement()

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (repeat) {
        if (audioElement && audioElement.currentTime <= 10 && hasIncrementedView) {
          setHasIncrementedView(false)
          startTimeRef.current = null
        }
      }
      if (!audioElement || hasIncrementedView || pause) return

      if (startTimeRef.current === null && !pause) {
        startTimeRef.current = Date.now()
      }

      const currentListenTime = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0

      if (currentListenTime >= 60 && audioElement.currentTime >= 60 && !hasIncrementedView) {
        viewIncrement(music?._id as string)
        setHasIncrementedView(true)
      }
    }

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate)
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioElement, music, pause, hasIncrementedView, viewIncrement])

  useEffect(() => {
    if (data) {
      const tracks = data.result.list_of_tracks as ITrack[]
      setListMusic(tracks)
      if (trackId !== '') {
        const track = tracks.find((track) => track._id === trackId) || null
        setTrackId('')
        setCurrentTrackIndex(0)
        setListMusic(track ? [track] : [])
        setMusic(track)
      } else {
        setCurrentTrackIndex(defaultIndex)
        setMusic(tracks[defaultIndex] || null)
      }
    }
  }, [data, defaultIndex, trackId])

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

    const newAudio = new Audio(song?.path_audio)
    setMusic(song)
    setPosition(0)
    setAudioElement(newAudio)
    setHasIncrementedView(false)
    startTimeRef.current = null
    newAudio.play()
    setPause(false)
  }

  const addTrackList = (tracks: ITrack[]) => {
    if (tracks && tracks.length > 0) {
      setListMusic(tracks)
      setCurrentTrackIndex(0)
      changeMusic(tracks[0])
    }
  }

  useEffect(() => {
    const handleEnded = () => {
      if (repeat) {
        if (audioElement) {
          audioElement.currentTime = 0
          audioElement.play()
        }
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

  useEffect(() => {
    if (audioElement) {
      audioElement.preload = 'auto'
    }
  }, [audioElement])

  const playNextTrack = () => {
    if (!isPending) {
      const nextIndex = currentTrackIndex + 1
      if (nextIndex < listMusic.length - 1) {
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

  const addAlbum = (albumId: string, musicIndex: number, trackId?: string) => {
    const existingIndex = listAlbumId.indexOf(albumId)
    setDefaultIndex(musicIndex)
    if (existingIndex !== -1) {
      if (trackId) {
        setTrackId(trackId)
      }
      setCurrentAlbumIndex(existingIndex)
    } else {
      addAlbumToList(albumId, currentAlbumIndex + 1, musicIndex, trackId)
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
        nextMusic: listMusic[currentTrackIndex + 1],
        currentTrackIndex,
        changeMusic,
        addAlbum,
        addTrackList,
        currentAlbumIndex: listAlbumId[currentAlbumIndex],
        album: data?.result || null
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
