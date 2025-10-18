import { ComponentType, FC } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from '../../Store';
import { Path } from '../../Router';

export function authorizationChecker(WrappedComponent: ComponentType) {
  const CheckedComponent: FC = (props) => {
    const profile = useSelector((state) => state.profile);

    if (typeof profile.value === 'undefined') {
      return;
    }

    if (profile.value === null) {
      return <Navigate to={Path.SignIn} />;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  return CheckedComponent;
}
