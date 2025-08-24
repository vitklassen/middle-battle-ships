import { useNavigate } from 'react-router';
import authApi from './authApi';

export const queryStringify = (data: { [key: string]: unknown }) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${encodeURIComponent(data[key] as string)}${
      index < keys.length - 1 ? '&' : ''
    }`,
    '?',
  );
};

export const checkIfAuthorized = () => {
  const navigate = useNavigate();
  // функция для проверки авторизации (добавить на каждой странице или перед route'ами)
  authApi
    .getUserInfo()
    .catch((err: Error) => {
      console.log(err);
      if (err.message.includes('401')) {
        console.log('unauthorized');
        navigate('../sign-in');
      }
    });
};
