import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorSnackbar } from './Components/ErrorSnackbar';
import { getProfile, setProfile } from './Features/profile';
import authApi from './api/authApi';
import { useSelector } from './Store';
import rootStyles from './index.module.css';
import { ErrorBoundary } from './Common/Layouts/ErrorBoundary';
import { Error } from './Components/Error';

type AppProps = {
  router: ReactNode;
  modalRoot: HTMLElement | null
}

function App({ router, modalRoot }: AppProps) {
  const dispatch = useDispatch();

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
        });
      });
    }
  }, []);

  const profileInfo = useSelector((state) => state.profile, {
    devModeChecks: { stabilityCheck: 'always' },
  });

  useEffect(() => {
    const root = document.getElementById('root') as HTMLElement;
    if (profileInfo.value?.isThemeAlt) {
      // проставил вопросы чисто для тестов
      root?.classList.add(rootStyles.altTheme);
    } else {
      root?.classList.remove(rootStyles.altTheme);
    }
  }, [profileInfo]);

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
