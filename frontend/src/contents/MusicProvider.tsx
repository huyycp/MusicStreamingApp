import { useState, useEffect, ReactNode } from 'react'
import MusicContext from '~/hooks/useMusic'

interface MusicProviderProps {
  musicUrl: string
  children: ReactNode
  onNextTrack: () => void
  onPreviousTrack: () => void
}

export function MusicProvider({ children, musicUrl, onNextTrack, onPreviousTrack }: MusicProviderProps) {
  const [pause, setPause] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.5)
  const [mute, setMute] = useState<boolean>(false)
  const [repeat, setRepeat] = useState<boolean>(false)

  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(musicUrl)
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    const handleTimeUpdate = () => {
      if (audio) {
        setPosition(audio.currentTime)
      }
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', onNextTrack)
    setAudioElement(audio)

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('ended', onNextTrack)
        audio.pause()
      }
    }
  }, [musicUrl, onNextTrack])

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
    if (audioElement) {
      audioElement.currentTime = 0
      setPosition(0)
      onNextTrack()
      audioElement.play()
    }
  }

  const playPreviousTrack = () => {
    if (audioElement) {
      audioElement.currentTime = 0
      setPosition(0)
      onPreviousTrack()
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
        setVolume
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
