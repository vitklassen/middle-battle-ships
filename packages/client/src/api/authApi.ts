import { Iargs } from './apiInterfaces'
import apiInstance from './fetch'
import BaseAPI from './baseApi'
import { GetProfileResponse } from './types';

export class AuthAPI extends BaseAPI {
  _create<R>(args: Iargs) {
    // post
    const { path, dataToSend } = args;
    return apiInstance.post<R>(path, {
      data: dataToSend,
    });
  }

  _request<R>(args: Iargs) {
    // get
    const { path } = args
    return apiInstance.get<R>(path)
  }

  register(args: Iargs) {
    return this._create({ path: 'auth/signup', dataToSend: args })
  }

  login(args: Iargs) {
    return this._create({ path: 'auth/signin', dataToSend: args })
  }

  getUserInfo() {
    return this._request<GetProfileResponse>({ path: 'auth/user' });
  }

  logout() {
    return this._create({ path: 'auth/logout' })
  }
}

const authApi = new AuthAPI();
export default authApi;
