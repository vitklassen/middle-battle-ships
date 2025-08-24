import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authApi from '../../api/authApi'
import { mapProfileResponse } from './mapProfileResponse'
import { setProfile } from './profileSlice'
import { GetProfileResponse } from './types'

export const useProfile = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    authApi.getUserInfo().then((profile: GetProfileResponse) => {
      dispatch(setProfile(mapProfileResponse(profile)))
    })
  }, [])
}
