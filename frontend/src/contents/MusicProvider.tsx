import { useState, useEffect, ReactNode } from 'react'
import MusicContext from '~/hooks/useMusic'
import { IMusic } from '~/type/IMusic'

interface MusicProviderProps {
  intialMusic: IMusic
  children: ReactNode
  onNextTrack: () => IMusic
  onPreviousTrack: () => IMusic
}

export function MusicProvider({ children, intialMusic, onNextTrack, onPreviousTrack }: MusicProviderProps) {
  const [pause, setPause] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.5)
  const [mute, setMute] = useState<boolean>(false)
  const [repeat, setRepeat] = useState<boolean>(false)
  const [music, setMusic] = useState<IMusic>(intialMusic)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(music.musicUrl)
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    const handleTimeUpdate = () => {
      if (audio) {
        setPosition(audio.currentTime)
      }
    }
    const handleEnded = () => {
      const nextMusic = onNextTrack()
      setMusic(nextMusic)
      audio.src = nextMusic.musicUrl
      audio.play()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    setAudioElement(audio)

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('ended', handleEnded)
        audio.pause()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onNextTrack])

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
  }, [audioElement, pause])

  const playNextTrack = () => {
    const nextMusic = onNextTrack()
    setMusic(nextMusic)
    if (audioElement) {
      audioElement.src = nextMusic.musicUrl
      setPosition(0)
      audioElement.play()
    }
  }

  const playPreviousTrack = () => {
    const prevMusic = onPreviousTrack()
    setMusic(prevMusic)
    if (audioElement) {
      audioElement.src = prevMusic.musicUrl
      setPosition(0)
      audioElement.play()
    }
  }

  const changeMusic = (song: IMusic) => {
    if (song._id === music._id) setPause(!pause)
    else {
      if (audioElement) {
        audioElement.src = song.musicUrl
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
