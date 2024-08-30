// songSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SongState {
  repeat: boolean
  volume: number
  mute: boolean
}

const initialState: SongState = {
  repeat: false,
  volume: 0.5,
  mute: false
}

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setVolumeState: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    setMuteState: (state, action: PayloadAction<boolean>) => {
      state.mute = action.payload
    },
    setRepeatState: (state) => {
      state.repeat = !state.repeat
    }
  }
})

export const { setVolumeState, setMuteState, setRepeatState } = songSlice.actions
export default songSlice.reducer
