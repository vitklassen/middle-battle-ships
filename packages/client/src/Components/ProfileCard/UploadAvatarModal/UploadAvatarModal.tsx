import { useState } from 'react'
import { Button } from '../../../Common/Blocks/Button'
import { Modal } from '../../../Common/Layouts/Modal'
import styles from './UploadAvatarModal.module.css'
import profileApi from '../../../api/profileApi'

type Props = {
  setClosed: VoidFunction
}

export const UploadAvatarModal: React.FC<Props> = ({ setClosed }) => {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }

  const handleUploadAvatarClick = () => {
    if (!file) {
      return
    }

    profileApi
      .uploadAvatar(file)
      .then(() => {
        setClosed()
      })
      .catch(({ reason }) => {
        setError(reason)
      })
  }

  return (
    <Modal onBackdropClick={setClosed}>
      <h1 className={styles.title}>Загрузка аватара</h1>
      <label>
        <input
          onChange={handleUploadFile}
          type="file"
          className={styles.fileInput}
          accept=".png,.jpg"
        />
        <span className={styles.button}>Выбрать файл</span>
      </label>
      <span className={styles.file}>{file && file?.name}</span>
      <div className={styles.error}>Ошибка: {error}</div>
      <Button
        onClick={handleUploadAvatarClick}
        stretched
        className={styles.uploadButton}>
        Загрузить
      </Button>
    </Modal>
  )
}
