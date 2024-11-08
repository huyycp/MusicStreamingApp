/* eslint-disable no-unused-vars */
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }

  type SpeechRecognition = {
    new (): SpeechRecognition
    lang: string
    interimResults: boolean
    maxAlternatives: number
    onresult: (event: SpeechRecognitionEvent) => void
    onend: () => void
    start: () => void
    stop: () => void
  }

  interface SpeechRecognitionEvent extends Event {
    resultIndex: number
    results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList {
    item(index: number): SpeechRecognitionResult
    length: number
  }

  interface SpeechRecognitionResult {
    isFinal: boolean
    length: number
    item(index: number): SpeechRecognitionAlternative
  }

  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }
}

// Xuất một tệp trống để TypeScript biết rằng đây là một tệp declaration
export {}
