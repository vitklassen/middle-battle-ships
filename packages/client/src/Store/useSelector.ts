import { GlobalState } from './types'
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux'

export const useSelector: TypedUseSelectorHook<GlobalState> = useReduxSelector
