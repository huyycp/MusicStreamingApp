/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react'
import MicNoneIcon from '@mui/icons-material/MicNone'
import IconButton from '@mui/material/IconButton'
import MicIcon from '@mui/icons-material/Mic'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

type Props = {
  mode: 'record' | 'transcribe'
  onTranscriptChange?: (transcript: string) => void
  onAudioFile?: (audioBlob: Blob, audioUrl: string) => void
}

const AudioRecognition = ({ mode, onTranscriptChange, onAudioFile }: Props) => {
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

    if (mode === 'record') {
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        onAudioFile?.(audioBlob, audioUrl)

        audioChunks.current = []
      }
    }

    mediaRecorderRef.current.start()

    if (mode === 'transcribe') {
      startSpeechRecognition()
    }

    setIsRecording(true)
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
        {isRecording && mode === 'transcribe' && <MicIcon />}
        {!isRecording && mode === 'transcribe' && <MicNoneIcon />}
        {isRecording && mode === 'record' && <MusicNoteIcon />}
        {!isRecording && mode === 'record' && <MusicNoteIcon />}
      </IconButton>
    </div>
  )
}

export default AudioRecognition
