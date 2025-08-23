import { Iargs } from './apiInterfaces'
import authApi from './authApi'

export const queryStringify = (data: { [key: string]: any }) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data)
  return keys.reduce(
    (result, key, index) =>
      `${result}${key}=${encodeURIComponent(data[key])}${
        index < keys.length - 1 ? '&' : ''
      }`,
    '?'
  )
}

export const checkIfAuthorized = () => {
  // функция для проверки авторизации (добавить на каждой странице или перед route'ами)
  authApi
    .getUserInfo()
    .then((data: Iargs) => {
      if (data) {
        window.location.href = './main'
      }
    })
    .catch((err: Error) => {
      if (err.message.includes('401')) {
        console.log('unauthorized')
      }
    })
}
