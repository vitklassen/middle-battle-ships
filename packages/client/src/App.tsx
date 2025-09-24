import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorSnackbar } from './Components/ErrorSnackbar';
import { getProfile, setProfile } from './Features/profile';
import authApi from './api/authApi';
import { ErrorBoundary } from './Common/Layouts/ErrorBoundary';
import { Error } from './Components/Error';

type AppProps = {
  router: ReactNode;
  modalRoot: HTMLElement | null
}

function App({ router, modalRoot }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__ || 3000} `;
      const response = await fetch(url);
      const data = await response.json();
    };

    fetchServerData();
  }, []);

  useEffect(() => {
    // При авторизации через яндекс происходит редирект на главную страницу,
    // Но при этом к ней прилепляется query с переменной code, для продолжения входа
    const queryStr = window.location.search;
    const codeSubstr = 'code=';
    const cutSubstr = queryStr.slice(queryStr.lastIndexOf(codeSubstr) + codeSubstr.length);
    const oAuthCode = cutSubstr.slice(0, cutSubstr.indexOf('&'));
    if (oAuthCode.length > 0) {
      authApi.signInUpWithYandex({
        code: oAuthCode,
        redirect_uri: window.location.origin,
      }).then((res): void => {
        getProfile().then((profile) => {
          dispatch(setProfile(profile));
          // убрал navigate(Path.Main), т.к. этот запрос проводится на странице Main
        });
      });
    }
  }, []);

  return (
    <ErrorBoundary
      errorComponent={(
        <Error
          title="Произошла ошибка"
          description="Попробуйте перезагрузить страницу"
        />
      )}
    >
      {router}
      <ErrorSnackbar modalRoot={modalRoot} />
    </ErrorBoundary>
  );
}

export default App;
