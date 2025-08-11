import { FormItem } from '../SignInUpForm/types'

export const signInFields: FormItem = {
  pageName: 'Вход',
  submitText: 'Войти',
  fields: [
    {
      name: 'login',
      requiredError: 'Необходимо заполнить поле',
      placeholder: 'Логин',
      minLength: {
        value: 3,
        message: 'Логин должен быть не менее 3 символов',
      },
      maxLength: {
        value: 20,
        message: 'Логин должен быть не более 20 символов',
      },
      pattern: {
        value: /^[a-zA-Z-_\d]*(?=[a-zA-Z])[a-zA-Z-_\d]*$/,
        message: 'Некорректный логин',
      },
    },
    {
      name: 'password',
      requiredError: 'Необходимо заполнить поле',
      placeholder: 'Пароль',
      minLength: {
        value: 8,
        message: 'Пароль должен быть не менее 8 символов', // JS only: <p>error message</p> TS only support string
      },
      maxLength: {
        value: 40,
        message: 'Пароль должен быть не более 40 символов',
      },
      pattern: {
        value: /^.*[A-ZА-ЯЁ\d].*$/,
        message: 'Некорректный пароль',
      },
    },
  ],
}
