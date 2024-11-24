import { IconButton } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import { useAudioContext } from '~/hooks/useGetAudio'
import { useNavigate } from 'react-router-dom'

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const { setAudioFile } = useAudioContext()
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const navigate = useNavigate() // Khởi tạo navigate

  const clearCurrentRecording = () => {
    setAudioFile(null)
  }

  const startRecording = async () => {
    try {
      clearCurrentRecording()

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      audioChunksRef.current = []

      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const file = new File([audioBlob], 'recording.wav', { type: 'audio/wav' })
        setAudioFile(file)

        // Điều hướng sau khi nhận được audioFile
        navigate('/search')

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

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className='flex flex-col gap-2'>
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
