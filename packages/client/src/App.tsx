import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Path, Router } from './Router';
import { ErrorSnackbar } from './Components/ErrorSnackbar';
import { getProfile, setProfile } from './Features/profile';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__ || 3000} `;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  useEffect(() => {
    getProfile()
      .then((profile) => {
        dispatch(setProfile(profile));
        if (pathname === Path.SignIn || pathname === Path.SignUp) {
          navigate(Path.Main, { replace: true });
        }
      })
      .catch(() => {
        dispatch(setProfile(null));
      });
  }, []);

  return (
    <div className="App">
      <Router />
      <ErrorSnackbar />
    </div>
  );
}

export default App;
