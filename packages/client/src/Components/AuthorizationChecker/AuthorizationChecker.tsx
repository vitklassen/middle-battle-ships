import { ComponentType, FC } from 'react';
import { useNavigate } from 'react-router';
import authApi from '../../api/authApi';

export function authorizationChecker(WrappedComponent: ComponentType) {
  const CheckedComponent: FC = (props) => {
    const navigate = useNavigate();

    authApi
      .getUserInfo()
      .catch((err: Error) => {
        console.log(err);
        if (err.message.includes('401')) {
          console.log('unauthorized');
          navigate('../sign-in');
        }
      });

    // eslint-disable-next-line react/jsx-props-no-spreading
    return (<WrappedComponent {...props} />);
  };

  return CheckedComponent;
}
