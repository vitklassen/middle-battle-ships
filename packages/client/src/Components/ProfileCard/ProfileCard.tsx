import avatar from '../../assets/images/profile.png'
import home from '../../assets/images/home.svg'
import mail from '../../assets/images/mail.svg'
import phone from '../../assets/images/phone.svg'
import { Cell } from './Cell'
import { profileMock } from './mock'
import { Button } from '../../Common/Blocks/Button'
import { useState } from 'react'
import { UploadAvatarModal } from './UploadAvatarModal'
import styles from './ProfileCard.module.css'
import { ChangePasswordModal } from './ChangePasswordModal'

export const ProfileCard = () => {
  const [isUploadAvatarModalVisible, setIsUploadAvatarModalVisible] =
    useState(false)
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false)

  return (
    <div className={styles.root}>
      {isUploadAvatarModalVisible && (
        <UploadAvatarModal
          setClosed={() => setIsUploadAvatarModalVisible(false)}
        />
      )}
      {isChangePasswordModalVisible && (
        <ChangePasswordModal
          setClosed={() => setIsChangePasswordModalVisible(false)}
        />
      )}
      <div
        className={styles.avatarContainer}
        onClick={() => {
          setIsUploadAvatarModalVisible(true)
        }}>
        <img
          src={profileMock.avatar || avatar}
          className={styles.avatar}
          alt="avatar"
        />
      </div>
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
      <Button
        onClick={() => setIsChangePasswordModalVisible(true)}
        stretched
        className={styles.button}>
        Изменить пароль
      </Button>
      <Button mode="secondary" stretched className={styles.button}>
        Выйти
      </Button>
    </div>
  )
}
