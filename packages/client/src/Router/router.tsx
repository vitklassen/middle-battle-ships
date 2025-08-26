import { Routes, Route } from 'react-router-dom';
import {
  SignIn,
  SignUp,
  Error,
  Forum,
  Game,
  LeaderBoard,
  Main,
  Profile,
  Topic,
} from '../Pages';
import { Path } from './types';
import { useSelector } from '../Store';

export function Router() {
  const profile = useSelector((state) => state.profile.value);

  return (
    <Routes>
      <Route path={Path.Profile} element={<Profile />} />
      <Route path={Path.Game} element={<Game />} />
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Leaderboard} element={<LeaderBoard />} />
      <Route path={Path.Forum} element={<Forum />} />
      <Route path={Path.Topic} element={<Topic />} />
      {!profile && (
        <>
          <Route path={Path.SignIn} element={<SignIn />} />
          <Route path={Path.SignUp} element={<SignUp />} />
        </>
      )}
      <Route
        path={Path.Error}
        element={<Error title="500 ошибка" description="Произошла ошибка" />}
      />
      <Route
        path="*"
        element={<Error title="404 ошибка" description="Страница не найдена" />}
      />
    </Routes>
  );
}
