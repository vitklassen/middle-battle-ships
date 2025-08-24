import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  SignIn,
  SignUp,
  Profile,
  Game,
  LeaderBoard,
  Forum,
  Topic,
  Main,
  Error,
} from '../Pages';
import { authorizationChecker } from '../Components/AuthorizationChecker';

export function Router() {
  // TODO как появится store произвести замену
  const [isAuth] = useState(false);
  const WrappedProfile = authorizationChecker(Profile);
  const WrappedGame = authorizationChecker(Game);
  const WrappedMain = authorizationChecker(Main);
  const WrappedLeaderBoard = authorizationChecker(LeaderBoard);
  const WrappedForum = authorizationChecker(Forum);
  const WrappedTopic = authorizationChecker(Topic);

  return (
    <>
      <Routes>
        <Route path="/profile" element={<WrappedProfile />} />
        <Route path="/game" element={<WrappedGame />} />
        <Route path="/main" element={<WrappedMain />} />
        <Route path="/leaderBoard" element={<WrappedLeaderBoard />} />
        <Route path="/forum" element={<WrappedForum />} />
        <Route path="/topic" element={<WrappedTopic />} />
        <Route
          path="/not-found"
          element={
            <Error title="404 ошибка" description="Страница не найдена" />
          }
        />
        <Route
          path="/error"
          element={<Error title="500 ошибка" description="Произошла ошибка" />}
        />
      </Routes>
      {!isAuth && (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      )}
    </>
  );
}
