import { store } from './store'

export type GlobalState = ReturnType<typeof store.getState>
