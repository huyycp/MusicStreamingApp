import { useContext } from 'react'
import { AudioContext } from '~/contents/AudioProvider'

export const useAudioContext = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider')
  }
  return context
}
