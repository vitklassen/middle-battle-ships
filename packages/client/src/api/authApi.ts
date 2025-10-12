import apiInstance from './fetch';
import { GetAppID, GetProfileResponse } from './types';

export interface Iargs {
  // затычка ленивой типизации
  [key: string]: string;
}

export class AuthAPI {
  getUserInfo(cookie?: string) {
    return apiInstance.get<GetProfileResponse>('/api/v2/auth/user', {
      headers: {
        cookie,
      },
    });
  }

  register(args: Iargs, cookie?: string) {
    return apiInstance.post<Iargs>('/api/v2/auth/signup', {
      data: args,
      headers: {
        cookie,
      },
    });
  }

  login(args: Iargs) {
    return apiInstance.post('/api/v2/auth/signin', { data: args });
  }

  logout() {
    return apiInstance.post('/api/v2/auth/logout');
  }

  getYandexOAuthID(args: Iargs) {
    return apiInstance.get<GetAppID>('/api/v2/oauth/yandex/service-id', {
      data: args,
    });
  }

  signInUpWithYandex(args: Iargs) {
    return apiInstance.post('/api/v2/oauth/yandex', { data: args });
  }
}

const authApi = new AuthAPI();
export default authApi;
