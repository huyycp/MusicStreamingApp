import { useState, useEffect, ReactNode } from 'react'
import MusicContext from '~/hooks/useMusic'
import { ITrack } from '~/type/Tracks/ITrack'

interface MusicProviderProps {
  initMusic: ITrack[]
  children: ReactNode
}

export function MusicProvider({ children, initMusic }: MusicProviderProps) {
  const [pause, setPause] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.5)
  const [mute, setMute] = useState<boolean>(false)
  const [repeat, setRepeat] = useState<boolean>(false)
  const [music, setMusic] = useState<ITrack | null>(null)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
  const [isNextAlbum, setIsNextAlbum] = useState<boolean>(false)
  const [listMusic, setListMusic] = useState<ITrack[]>(initMusic)

  // Lấy chỉ số bài hát từ localStorage khi trang load
  useEffect(() => {
    const savedTrackIndex = localStorage.getItem('currentTrackIndex')
    if (savedTrackIndex !== null) {
      const index = parseInt(savedTrackIndex, 10)
      setCurrentTrackIndex(index)
      setMusic(listMusic[index])
    } else if (savedTrackIndex === null) {
      setCurrentTrackIndex(0)
      setMusic(listMusic[0])
    }
  }, [listMusic])

  const handleNextTrack = () => {
    const nextIndex = currentTrackIndex + 1
    if (nextIndex >= listMusic.length + 1) {
      setIsNextAlbum(true)
      setCurrentTrackIndex(listMusic.length + 1)
      return listMusic[listMusic.length + 1]
    } else {
      setCurrentTrackIndex(nextIndex)
      localStorage.setItem('currentTrackIndex', nextIndex.toString())
      return listMusic[nextIndex]
    }
  }

  const handlePreviousTrack = () => {
    const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : listMusic.length - 1
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

  const changeListMusic = (newList: ITrack[]) => {
    setListMusic(newList)
    localStorage.setItem('currentTrackIndex', '0')
    setCurrentTrackIndex(0)
    setMusic(newList[0])
    if (audioElement) {
      audioElement.src = newList[0].path_audio
      setPosition(0)
      audioElement.play()
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
      if (repeat) {
        audio.play()
      } else {
        setCurrentTrackIndex((prevIndex) => {
          const nextIndex = prevIndex + 1
          if (nextIndex < listMusic.length) {
            const nextMusic = listMusic[nextIndex]
            setMusic(nextMusic)
            audio.src = nextMusic.path_audio
            document.title = `${nextMusic.name}`
            audio.play()
            setIsNextAlbum(false)
          } else {
            setIsNextAlbum(true)
            audio.pause()
          }
          return nextIndex < listMusic.length ? nextIndex : prevIndex
        })
      }
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
    if (!isNextAlbum) {
      const nextMusic = handleNextTrack()
      setMusic(nextMusic)
      if (audioElement) {
        audioElement.src = nextMusic.path_audio
        setPosition(0)
        audioElement.play()
      }
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
        changeMusic,
        isNextAlbum,
        changeListMusic
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
