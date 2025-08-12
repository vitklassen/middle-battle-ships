import avatar from '../../assets/images/profile.png'
import home from '../../assets/images/home.svg'
import mail from '../../assets/images/mail.svg'
import phone from '../../assets/images/phone.svg'

import { Cell } from './Cell'
import styles from './ProfileCard.module.css'
import { profileMock } from './mock'
import { Button } from '../../Common/Blocks/Button/Button'

export const ProfileCard = () => {
  return (
    <div className={styles.root}>
      <img
        src={profileMock.avatar || avatar}
        className={styles.avatar}
        alt="avatar"
      />
      <h2>
        {profileMock.firstName} {profileMock.lastName}
      </h2>
      <h3>@{profileMock.displayName}</h3>
      <div className={styles.cells}>
        <Cell icon={home} label="Логин">
          {profileMock.login}
        </Cell>
        <Cell icon={mail} label="Почта">
          {profileMock.email}
        </Cell>
        <Cell icon={phone} label="Телефон">
          {profileMock.phone}
        </Cell>
      </div>
      <Button stretched className={styles.button}>
        Сменить пароль
      </Button>
      <Button mode="secondary" stretched className={styles.button}>
        Выйти
      </Button>
    </div>
  )
}
