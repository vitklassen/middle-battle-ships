import { Middleware } from '@reduxjs/toolkit';

export const logger: Middleware = (store) => (next) => (action) => {
  // @ts-expect-error action type is unknown
  console.groupCollapsed(`Action: ${action.type}`);
  console.log('Previous State:', store.getState());
  console.log('Action:', action);

  const result = next(action);

  console.log('Next State:', store.getState());
  console.groupEnd();

  return result;
};

export const asyncFunctionMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState());
  }

  return next(action);
};

export const getMiddleware = () => {
  if (process.env.NODE_ENV === 'development') {
    return [logger, asyncFunctionMiddleware];
  }
  return [asyncFunctionMiddleware];
};
