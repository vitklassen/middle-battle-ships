import { Path } from './types';
import { NotFoundPage } from '../Pages/NotFoundPage';
import { ErrorPage } from '../Pages/ErrorPage';
import { initMainPage, MainPage } from '../Pages/MainPage';
import { initProfilePage, ProfilePage } from '../Pages/ProfilePage';
import { ForumPage, initForumPage } from '../Pages/ForumPage';
import { GamePage, initGamePage } from '../Pages/GamePage';
import { initLeaderboardPage, LeaderboardPage } from '../Pages/LeaderboardPage';
import { initSignInPage, SignInPage } from '../Pages/SignInPage';
import { initSignUpPage, SignUpPage } from '../Pages/SignUpPage';
import { initTopicPage, TopicPage } from '../Pages/TopicPage';

export const routes = [
  {
    path: Path.Main,
    Component: MainPage,
    init: initMainPage,
  },
  {
    path: Path.Error,
    Component: ErrorPage,
  },
  {
    path: Path.Forum,
    Component: ForumPage,
    init: initForumPage,
  },
  {
    path: Path.Game,
    Component: GamePage,
    init: initGamePage,
  },
  {
    path: Path.Leaderboard,
    Component: LeaderboardPage,
    init: initLeaderboardPage,
  },
  {
    path: Path.Profile,
    Component: ProfilePage,
    init: initProfilePage,
  },
  {
    path: Path.SignIn,
    Component: SignInPage,
    init: initSignInPage,
  },
  {
    path: Path.SignUp,
    Component: SignUpPage,
    init: initSignUpPage,
  },
  {
    path: Path.Topic,
    Component: TopicPage,
    init: initTopicPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
