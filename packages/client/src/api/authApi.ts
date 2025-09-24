import { Iargs } from './apiInterfaces';
import apiInstance from './fetch';
import BaseAPI from './baseApi';
import { GetAppID, GetProfileResponse } from './types';

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
    const { path, dataToSend } = args;
    if (dataToSend) {
      return apiInstance.get<R>(path, {
        data: dataToSend,
      });
    }
    return apiInstance.get<R>(path);
  }

  register(args: Iargs) {
    return this._create({ path: 'auth/signup', dataToSend: args });
  }

  login(args: Iargs) {
    return this._create({ path: 'auth/signin', dataToSend: args });
  }

  getUserInfo() {
    return this._request<GetProfileResponse>({ path: 'auth/user' });
  }

  logout() {
    return this._create({ path: 'auth/logout' });
  }

  getYandexOAuthID(args: Iargs) {
    return this._request<GetAppID>({
      path: 'oauth/yandex/service-id',
      dataToSend: args,
    });
  }

  signInUpWithYandex(args: Iargs) {
    return this._create({ path: 'oauth/yandex', dataToSend: args });
  }
}

const authApi = new AuthAPI();
export default authApi;
