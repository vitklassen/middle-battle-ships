import { Route } from 'react-router';
import {
  Profile, Game, LeaderBoard, Forum, Topic, Main,
} from '../Pages';
import { Path } from './types';

export const AuthorizedRoutes = () => (
  <>
    <Route path={Path.Profile} element={<Profile />} />
    <Route path={Path.Game} element={<Game />} />
    <Route path={Path.Main} element={<Main />} />
    <Route path={Path.Leaderboard} element={<LeaderBoard />} />
    <Route path={Path.Forum} element={<Forum />} />
    <Route path={Path.Topic} element={<Topic />} />
  </>
);
