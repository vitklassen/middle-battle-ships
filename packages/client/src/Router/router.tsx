import { Routes, Route } from 'react-router-dom';
import { authorizationChecker } from '../Components/AuthorizationChecker';
import { AuthorizedRoutes } from './AuthorizedRoutes';
import { SignIn, SignUp, Error } from '../Pages';
import { Path } from './types';

export function Router() {
  const WrappedRoutes = authorizationChecker(AuthorizedRoutes);

  return (
    <>
      <WrappedRoutes />
      <Routes>
        <Route path={Path.SignIn} element={<SignIn />} />
        <Route path={Path.SignUp} element={<SignUp />} />
        <Route
          path={Path.Error}
          element={<Error title="500 ошибка" description="Произошла ошибка" />}
        />
        <Route
          path="*"
          element={
            <Error title="404 ошибка" description="Страница не найдена" />
          }
        />
      </Routes>
    </>
  );
}
