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

export function Router() {
  // TODO как появится store произвести замену
  const [isAuth] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/game" element={<Game />} />
        <Route path="/main" element={<Main />} />
        <Route path="/leaderBoard" element={<LeaderBoard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/topic" element={<Topic />} />
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
