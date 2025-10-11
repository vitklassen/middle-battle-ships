import { AppDispatch, GlobalState } from '../Store';

export enum Path {
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  Error = '/error',
  Profile = '/profile',
  Game = '/game',
  Main = '/',
  Leaderboard = '/leaderboard',
  Forum = '/forum',
  Topic = '/topic/:id',
}

export type PageInitArgs = {
  state: GlobalState
  dispatch: AppDispatch
  cookie?: string;
}
