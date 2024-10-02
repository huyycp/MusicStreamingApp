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
  const [music, setMusic] = useState<ITrack | null>(null)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null)

  // Lấy chỉ số bài hát từ localStorage khi trang load
  useEffect(() => {
    const savedTrackIndex = localStorage.getItem('currentTrackIndex')
    if (savedTrackIndex !== null) {
      const index = parseInt(savedTrackIndex, 10)
      setCurrentTrackIndex(index)
      setMusic(listMusic[index])
    } else {
      setCurrentTrackIndex(0)
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

  const changeMusic = (song: ITrack) => {
    if (audioElement) {
      // Dừng bài hát hiện tại
      audioElement.pause()

      if (song._id === music?._id) {
        setPause(!pause)
      } else {
        // Cập nhật source và play bài hát mới
        audioElement.src = song.path_audio
        setMusic(song)
        setPosition(0)
        audioElement.play()
      }

      setPause(false)
    }
  }

  // useEffect để khởi tạo và quản lý `audioElement`
  useEffect(() => {
    const audio = new Audio() // Khởi tạo một lần duy nhất
    setAudioElement(audio)

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    const handleTimeUpdate = () => {
      setPosition(audio.currentTime)
    }

    const handleEnded = () => {
      const nextMusic = handleNextTrack()
      setMusic(nextMusic)
      audio.src = nextMusic.path_audio
      document.title = `${nextMusic.name}`
      audio.play()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      // Hủy các sự kiện khi component bị unmount
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (audioElement && music) {
      // Dừng nhạc hiện tại trước khi phát nhạc mới
      audioElement.pause()

      audioElement.src = music.path_audio
      document.title = `${music.name}`
      setPosition(0)

      // Nếu không tạm dừng, tự động phát bài mới
      if (!pause) {
        audioElement.play()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music, audioElement])

  useEffect(() => {
    if (audioElement) {
      audioElement.volume = mute ? 0 : volume
      audioElement.loop = repeat
    }
  }, [mute, volume, repeat, audioElement])

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
