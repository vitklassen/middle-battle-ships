import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Profile, ProfileState } from './types'

const initialState: ProfileState = {
  value: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.value = action.payload
    },
    setAvatar: (state, action: PayloadAction<Pick<Profile, 'avatar'>>) => {
      if (!state.value) {
        return
      }
      state.value = { ...state.value, avatar: action.payload.avatar }
    },
  },
})

export const { setProfile, setAvatar } = profileSlice.actions

export const profileReducer = profileSlice.reducer
