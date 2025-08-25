import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Profile, ProfileState } from './types'
import authApi from '../../api/authApi'
import { mapProfileResponse } from './mapProfileResponse'

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
    resetProfile: state => {
      state.value = null
    },
  },
})

export const { setProfile, setAvatar, resetProfile } = profileSlice.actions

export const getProfile = async () => {
  const profile = await authApi.getUserInfo()
  return mapProfileResponse(profile)
}

export const profileReducer = profileSlice.reducer
