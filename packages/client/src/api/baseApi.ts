import { Iargs } from './types';

export default class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  _create(_args: Iargs) {
    throw new Error('Не реализовано');
  } // post

  _request(_args: Iargs) {
    throw new Error('Не реализовано');
  } // get

  _update(_args: Iargs) {
    throw new Error('Не реализовано');
  } // put

  _delete(_args: Iargs) {
    throw new Error('Не реализовано');
  } // delete
}
