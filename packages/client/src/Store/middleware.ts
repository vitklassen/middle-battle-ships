import { Middleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

export const asyncFunctionMiddleware: Middleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState())
  }

  return next(action)
}

export const getMiddleware = () => {
  if (process.env.NODE_ENV === 'development') {
    return [logger, asyncFunctionMiddleware]
  }
  return [asyncFunctionMiddleware]
}
