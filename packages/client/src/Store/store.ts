import { configureStore } from '@reduxjs/toolkit'
import { profileReducer } from '../Features/profile'
import { errorReducer } from '../Features/error'
import { getMiddleware } from './middleware'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    error: errorReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(getMiddleware()),
})
