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
  // функция для проверки авторизации (добавить на каждой странице или перед route'ами)
  authApi
    .getUserInfo()
    .then(() => {
      console.log('215');
    })
    .catch((err: Error) => {
      console.log(err);
      if (err.message.includes('401')) {
        console.log('unauthorized');
        window.location.href = './sign-in';
      }
    });
};

export const throwError = async (res: unknown) => {
  console.log(res);
  const errorData = await (res as Response).json();
  console.log(errorData);
  throw new Error(
    `${(res as XMLHttpRequest).status.toString()} - ${
      errorData.reason
    }`,
  );
};
