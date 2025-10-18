Для работы на проекте используйте версию Node 22.19.0

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как работать с SSR?
1. Выполните команду `yarn build` на клиенте
2. Выполните команду `yarn link` на клиенте
3. Выполните команду `yarn link client` на сервере
4. Выполните команду `yarn build` на сервере
5. Выполните команду `node dist/index.js` на сервере

### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Dev окружение в докере
 Чтобы работать в dev окружении нужно выполнить след команды:
 1. Полная пересборка: docker-compose build --no-cache
 2. Запуск: docker-compose up -d
 3. Прекращение работы: docker-compose down

## Production окружение в докере
 Чтобы работать в production окружении нужно выполнить след команды:
 1. Полная пересборка: docker-compose -f docker-compose.prod.yml build --no-cache
 2. Запуск: docker-compose -f docker-compose.prod.yml up -d
 3. Прекращение работы: docker-compose -f docker-compose.prod.yml down

## Для командного зачёта №2

[Ссылка на видео](https://www.loom.com/share/f82f3d9f653546919f1c8d4bed3d7ae7?sid=467f9116-0ba3-4368-a3ee-04345d3bb2e8)
