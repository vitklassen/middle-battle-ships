import apiInstance from './fetch'

export class ProfileApi {
  changePassword(oldPassword: string, newPassword: string) {
    return apiInstance
      .put('/user/password', {
        data: {
          oldPassword,
          newPassword,
        },
      })
      .then(async response => {
        const json = await response.json()
        if (!response.ok) {
          throw json
        }
        return json
      })
  }

  uploadAvatar(avatar: File) {
    return apiInstance
      .put('/user/profile/avatar', {
        data: {
          avatar,
        },
      })
      .then(async response => {
        const json = await response.json()
        if (!response.ok) {
          throw json
        }
        return json
      })
  }
}

const profileApi = new ProfileApi()

export default profileApi
