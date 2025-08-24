import apiInstance from './fetch'

export class ProfileApi {
  changePassword(oldPassword: string, newPassword: string) {
    return apiInstance.put('user/password', {
      data: {
        oldPassword,
        newPassword,
      },
    })
  }

  uploadAvatar(avatar: File) {
    const formData = new FormData()
    formData.append('avatar', avatar)

    return apiInstance.put('user/profile/avatar', {
      formData,
    })
  }
}

const profileApi = new ProfileApi()

export default profileApi
