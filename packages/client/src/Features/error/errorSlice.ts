import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Error, ErrorState } from './types'

const initialState: ErrorState = {
  value: null,
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<Error>) => {
      state.value = action.payload
    },
    resetError: state => {
      state.value = null
    },
  },
})

export const { setError, resetError } = errorSlice.actions

export const errorReducer = errorSlice.reducer
