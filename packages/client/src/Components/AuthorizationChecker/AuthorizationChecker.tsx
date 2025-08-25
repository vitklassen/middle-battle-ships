import { ComponentType, FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { getProfile, setProfile } from '../../Features/profile';
import { useSelector } from '../../Store';
import { Path } from '../../Router';

export function authorizationChecker(WrappedComponent: ComponentType) {
  const CheckedComponent: FC = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const profile = useSelector((state) => state.profile.value);

    useEffect(() => {
      getProfile().then((profile) => {
        dispatch(setProfile(profile));
      });
    }, []);

    useEffect(() => {
      if (!profile) {
        if (pathname === Path.Main) {
          navigate(Path.SignIn);
        }
      } else if (pathname === Path.SignIn || pathname === Path.SignUp) {
        navigate(Path.Main);
      }
    }, [profile]);

    if (!profile) {
      return;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  return CheckedComponent;
}
