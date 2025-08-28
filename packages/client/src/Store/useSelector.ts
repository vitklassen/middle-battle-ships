import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import { GlobalState } from './types';

export const useSelector: TypedUseSelectorHook<GlobalState> = useReduxSelector;
