import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authApi from '../../api/authApi'
import { mapProfileResponse } from './mapProfileResponse'
import { setProfile } from './profileSlice'

export const useProfile = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    authApi.getUserInfo().then(profile => {
      dispatch(setProfile(mapProfileResponse(profile)))
    })
  }, [])
}
