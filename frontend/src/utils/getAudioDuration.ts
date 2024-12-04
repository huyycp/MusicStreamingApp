export const getAudioDuration = (url: string): Promise<number> => {
  return new Promise((resolve) => {
    const audio = new Audio(url)

    audio.onloadedmetadata = () => {
      resolve(audio.duration)
    }

    audio.onerror = () => {
      resolve(0)
    }
  })
}
