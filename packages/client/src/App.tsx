import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Path, Router } from './Router';
import { ErrorSnackbar } from './Components/ErrorSnackbar';
import { getProfile, setProfile, loadThemeInfo } from './Features/profile';
import authApi from './api/authApi';
import { useSelector } from './Store';
import rootStyles from './index.module.css';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    const cutSubstr = queryStr.slice(
      queryStr.lastIndexOf(codeSubstr) + codeSubstr.length,
    );
    const oAuthCode = cutSubstr.slice(0, cutSubstr.indexOf('&'));
    if (oAuthCode.length > 0) {
      authApi.signInUpWithYandex({
        code: oAuthCode,
        redirect_uri: window.location.origin,
      }).then((res): void => {
        getProfile().then((profile) => {
          profile = loadThemeInfo(profile);
          dispatch(setProfile(profile));
        });
      });
    }
  }, []);

  const profileInfo = useSelector((state) => state.profile, {
    devModeChecks: { stabilityCheck: 'always' },
  });

  useEffect(() => {
    getProfile()
      .then((profile) => {
        profile = loadThemeInfo(profile);
        dispatch(setProfile(profile));
        if (pathname === Path.SignIn || pathname === Path.SignUp) {
          navigate(Path.Main, { replace: true });
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(setProfile(null));
      });
  }, []);

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
    <div className="App">
      <Router />
      <ErrorSnackbar />
    </div>
  );
}

export default App;
