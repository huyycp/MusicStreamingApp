import { useState, useRef } from 'react'
import MicNoneIcon from '@mui/icons-material/MicNone'
import IconButton from '@mui/material/IconButton'
import MicIcon from '@mui/icons-material/Mic'

type Props = {
  mode: 'record' | 'transcribe'
  // eslint-disable-next-line no-unused-vars
  onTranscriptChange?: (transcript: string) => void
}

const AudioRecorder = ({ mode, onTranscriptChange }: Props) => {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])

  const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'vi-VN'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.resultIndex]
      if (result.isFinal) {
        const transcript = result[0].transcript
        onTranscriptChange?.(transcript)
        resetSilenceTimer()
      }
    }

    recognition.onend = () => {
      if (isRecording) {
        recognition.start()
      }
    }

    recognition.start()
    return recognition
  }

  const resetSilenceTimer = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
    }

    silenceTimeoutRef.current = setTimeout(() => {
      stopRecording()
    }, 3000)
  }

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data)
      resetSilenceTimer()
    }

    mediaRecorderRef.current.onstop = () => {
      audioChunks.current = []
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
      }
    }

    mediaRecorderRef.current.start()
    setIsRecording(true)

    if (mode === 'transcribe') {
      startSpeechRecognition()
    }

    resetSilenceTimer()
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div>
      <IconButton
        onClick={handleToggleRecording}
        sx={{
          width: '27px',
          height: '27px',
          fontSize: '27',
          color: (theme) => (!isRecording ? theme.palette.secondary4.main : theme.palette.primary.main)
        }}
      >
        {isRecording ? <MicIcon /> : <MicNoneIcon />}
      </IconButton>
    </div>
  )
}

export default AudioRecorder
