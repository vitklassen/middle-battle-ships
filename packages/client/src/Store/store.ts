import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useSelectorBase, useStore as useStoreBase } from 'react-redux';
import { profileReducer } from '../Features/profile';
import { errorReducer } from '../Features/error';
import { getMiddleware } from './middleware';

declare global {
  interface Window {
    __PRELOADED_STATE__: GlobalState
  }
}

export const reducer = combineReducers({
  profile: profileReducer,
  error: errorReducer,
});

export const store = configureStore({
  reducer,
  preloadedState: typeof window === 'undefined' ? undefined : window.__PRELOADED_STATE__,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getMiddleware()),
});

export type GlobalState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export const useSelector: TypedUseSelectorHook<GlobalState> = useSelectorBase;
export const useStore = useStoreBase<GlobalState>;
