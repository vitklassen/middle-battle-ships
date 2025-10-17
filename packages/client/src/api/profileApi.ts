import apiInstance from './fetch';
import { GetProfileResponse } from './types';

export class ProfileApi {
  changePassword(oldPassword: string, newPassword: string) {
    return apiInstance.put('/api/v2/user/password', {
      data: {
        oldPassword,
        newPassword,
      },
    });
  }

  uploadAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return apiInstance.put<GetProfileResponse>('/api/v2/user/profile/avatar', {
      formData,
    });
  }

  setTheme(isAlt: boolean) {
    return apiInstance.post('/api/theme', {
      data: { theme: isAlt },
    });
  }
}

const profileApi = new ProfileApi();

export default profileApi;
