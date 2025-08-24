import { Iargs } from './apiInterfaces'
import apiInstance from './fetch'
import BaseAPI from './baseApi'

const authApiInstance = apiInstance;

export class AuthAPI extends BaseAPI {
  _create(args: Iargs) {
    // post
    const { path, dataToSend } = args;
    return authApiInstance.post(path, {
      data: dataToSend,
    });
  }

  _request(args: Iargs) {
    // get
    const { path } = args
    return authApiInstance.get(path)
  }

  register(args: Iargs) {
    return this._create({ path: 'auth/signup', dataToSend: args })
  }

  login(args: Iargs) {
    return this._create({ path: 'auth/signin', dataToSend: args })
  }

  getUserInfo() {
    return this._request({ path: 'auth/user' });
  }

  logout() {
    return this._create({ path: 'auth/logout', dataToSend: '' })
  }
}

const authApi = new AuthAPI();
export default authApi;
