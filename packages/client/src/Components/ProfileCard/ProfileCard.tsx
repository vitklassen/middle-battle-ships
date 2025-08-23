import { useState } from 'react';
import home from '../../assets/images/home.svg';
import mail from '../../assets/images/mail.svg';
import phone from '../../assets/images/phone.svg';
import { Cell } from './Cell';
import { Button } from '../../Common/Blocks/Button';
import { UploadAvatarModal } from './UploadAvatarModal';
import styles from './ProfileCard.module.css';
import { ChangePasswordModal } from './ChangePasswordModal';
import { getAvatarUrl } from './utils/getAvatarUrl';
import { useSelector } from '../../Store';
import { useProfile } from '../../Features/profile';

export const ProfileCard = () => {
  const [isUploadAvatarModalVisible, setIsUploadAvatarModalVisible] =
    useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);

  useProfile();

  const profile = useSelector((state) => state.profile.value);

  if (!profile) {
    return;
  }

  /* eslint-disable consistent-return */
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
          setIsUploadAvatarModalVisible(true);
        }}
        aria-hidden="true"
      >
        <img
          src={getAvatarUrl(profile)}
          className={styles.avatar}
          alt="avatar"
        />
      </div>
      <h2>
        {profile.firstName}
        {' '}
        {profile.lastName}
      </h2>
      <h3>
        @
        {profile.displayName}
      </h3>
      <div className={styles.cells}>
        <Cell icon={home} label="Логин">
          {profile.login}
        </Cell>
        <Cell icon={mail} label="Почта">
          {profile.email}
        </Cell>
        <Cell icon={phone} label="Телефон">
          {profile.phone}
        </Cell>
      </div>
      <Button
        onClick={() => setIsChangePasswordModalVisible(true)}
        stretched
        className={styles.button}
      >
        Изменить пароль
      </Button>
      <Button mode="secondary" stretched className={styles.button}>
        Выйти
      </Button>
    </div>
  );
};
