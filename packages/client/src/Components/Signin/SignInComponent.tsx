import clsx from 'clsx'
import { signInFields } from './mock'
import styles from './SignInComponent.module.css'
import { SignInUpForm } from '../SignInUpForm'
import { FC } from 'react'
import { submitData } from '../SignInUpForm/types'
import authApi from '../../api/authApi'

export const SignInComponent: FC = () => {
  const onSubmitHandler = (data: submitData) => {
    console.log(data)
    authApi.login(data).then((res: unknown): void => {
      // данные после регистрации, пока что тут заглушка,
      // т.к. остальные страницы не реализованы
      console.log(res)
      // стоит добавить authApi.getUserInfo();
      // и затем отлов ошибок и отправка на 404 или 500
    })
  }

  return (
    <div className={clsx(styles.root)}>
      <SignInUpForm
        signInUpFields={signInFields}
        onSubmitHandler={onSubmitHandler}
        link="./sign-up"
        linkText="Нет аккаунта?"
      />
    </div>
  )
}
