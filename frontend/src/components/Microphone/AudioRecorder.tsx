import { IconButton } from '@mui/material'
import { useState, useRef } from 'react'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      mediaRecorderRef.current = new MediaRecorder(stream)
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioUrl(audioUrl)
        audioChunksRef.current = []
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch {
      //
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // Toggle between start and stop recording
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
          fontSize: '27px',
          color: (theme) => (!isRecording ? theme.palette.secondary4.main : theme.palette.primary.main)
        }}
      >
        <MusicNoteIcon />
      </IconButton>
    </div>
  )
}

export default AudioRecorder
