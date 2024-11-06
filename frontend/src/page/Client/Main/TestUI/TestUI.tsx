import { Box } from '@mui/material'
import { useState } from 'react'
import AudioRecorder from '~/components/Microphone/AudioRecorder'

export default function TestUI() {
  const [transcript, setTranscript] = useState<string>('')

  const handleTranscriptChange = (newTranscript: string) => {
    setTranscript(newTranscript)
  }
  return (
    <div>
      <AudioRecorder mode='transcribe' onTranscriptChange={handleTranscriptChange} />
      <Box sx={{ color: 'red' }}>Hallo {transcript}</Box>
    </div>
  )
}
