import { useState, useEffect, ReactNode } from 'react'
import MusicContext from '~/hooks/useMusic'
import { ITrack } from '~/type/Tracks/ITrack'

interface MusicProviderProps {
  listMusic: ITrack[]
  children: ReactNode
}

export function MusicProvider({ children, listMusic }: MusicProviderProps) {
  const [pause, setPause] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.5)
  const [mute, setMute] = useState<boolean>(false)
  const [repeat, setRepeat] = useState<boolean>(false)
  const [music, setMusic] = useState<ITrack | null>(null) // Bắt đầu với null, chưa set bài hát
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null) // Bắt đầu với null

  // Lấy chỉ số bài hát từ localStorage khi trang load
  useEffect(() => {
    const savedTrackIndex = localStorage.getItem('currentTrackIndex')
    if (savedTrackIndex !== null) {
      const index = parseInt(savedTrackIndex, 10)
      setCurrentTrackIndex(index)
      setMusic(listMusic[index])
    } else {
      setCurrentTrackIndex(0) // Nếu không có trong localStorage, set về 0 khi cần thiết
      setMusic(listMusic[0])
    }
  }, [listMusic])

  const handleNextTrack = () => {
    const nextIndex = currentTrackIndex !== null && currentTrackIndex < listMusic.length - 1 ? currentTrackIndex + 1 : 0
    setCurrentTrackIndex(nextIndex)
    localStorage.setItem('currentTrackIndex', nextIndex.toString()) // Lưu lại chỉ số bài hát vào localStorage
    return listMusic[nextIndex]
  }

  const handlePreviousTrack = () => {
    const prevIndex = currentTrackIndex !== null && currentTrackIndex > 0 ? currentTrackIndex - 1 : listMusic.length - 1
    setCurrentTrackIndex(prevIndex)
    localStorage.setItem('currentTrackIndex', prevIndex.toString()) // Lưu lại chỉ số bài hát vào localStorage
    return listMusic[prevIndex]
  }

  useEffect(() => {
    if (music) {
      const audio = new Audio(music.path_audio)
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })

      const handleTimeUpdate = () => {
        if (audio) {
          setPosition(audio.currentTime)
        }
      }
      const handleEnded = () => {
        const nextMusic = handleNextTrack()
        setMusic(nextMusic)
        audio.src = nextMusic.path_audio
        document.title = `${music.name}`
        audio.play()
      }

      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('ended', handleEnded)
      setAudioElement(audio)

      return () => {
        if (audio) {
          audio.removeEventListener('timeupdate', handleTimeUpdate)
          audio.removeEventListener('ended', handleEnded)
          document.title = 'Magic Music'
          audio.pause()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music])

  useEffect(() => {
    if (audioElement) {
      audioElement.volume = mute ? 0 : volume
      audioElement.loop = repeat
    }
  }, [mute, volume, repeat, audioElement])

  useEffect(() => {
    if (audioElement) {
      if (pause) {
        document.title = 'Magic Music'
        audioElement.pause()
      } else {
        document.title = `${music?.name || 'Music'}`
        audioElement.play()
      }
    }
  }, [audioElement, music?.name, pause])

  const playNextTrack = () => {
    const nextMusic = handleNextTrack()
    setMusic(nextMusic)
    if (audioElement) {
      audioElement.src = nextMusic.path_audio
      setPosition(0)
      audioElement.play()
    }
  }

  const playPreviousTrack = () => {
    const prevMusic = handlePreviousTrack()
    setMusic(prevMusic)
    if (audioElement) {
      audioElement.src = prevMusic.path_audio
      setPosition(0)
      audioElement.play()
    }
  }

  const changeMusic = (song: ITrack) => {
    if (song._id === music?._id) setPause(!pause)
    else {
      if (audioElement) {
        audioElement.src = song.path_audio
        setPosition(0)
        audioElement.play()
      }
      setMusic(song)
      setPause(false)
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
        changeMusic
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
