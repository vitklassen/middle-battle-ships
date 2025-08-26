import { FormItem } from '../SignInUpForm/types'

export const signUpFields: FormItem = {
  pageName: 'Регистрация',
  submitText: 'Зарегистрироваться',
  fields: [
    {
      // Почта
      name: 'email',
      requiredError: 'Необходимо заполнить поле',
      placeholder: 'Почта',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Некорректная почта',
      },
    },
    {
      // Логин
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
      // Имя
      name: 'first_name',
      requiredError: 'Необходимо заполнить поле',
      placeholder: 'Имя',
      pattern: {
        value: /^[A-ZА-ЯЁ][-a-zа-яё]+$/i,
        message: 'Некорректный запись',
      },
    },
    {
      // Фамилия
      name: 'second_name',
      requiredError: 'Необходимо заполнить поле',
      placeholder: 'Фамилия',
      pattern: {
        value: /^[A-ZА-ЯЁ][-a-zа-яё]+$/i,
        message: 'Некорректная запись',
      },
    },
    {
      // Телефон
      name: 'phone',
      requiredError: 'Необходимо заполнить поле',
      placeholder: 'Телефон',
      minLength: {
        value: 10,
        message: 'Номер должен быть не менее 8 символов', // JS only: <p>error message</p> TS only support string
      },
      maxLength: {
        value: 15,
        message: 'Номер должен быть не более 40 символов',
      },
      pattern: {
        value: /^[+0-9][0-9]+$/,
        message: 'Некорректный номер',
      },
    },
    {
      // Пароль
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
      type: 'password',
    },
    {
      // Пароль (ещё раз)
      name: 'passwordAgain',
      requiredError: 'Необходимо заполнить поле',
      placeholder: 'Пароль (ещё раз)',
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
      type: 'password',
    },
  ],
}
