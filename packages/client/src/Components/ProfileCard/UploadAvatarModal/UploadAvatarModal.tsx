import { useState } from 'react'
import { Button } from '../../../Common/Blocks/Button'
import { Modal } from '../../../Common/Layouts/Modal'
import styles from './UploadAvatarModal.module.css'

type Props = {
  setClosed: VoidFunction
}

export const UploadAvatarModal: React.FC<Props> = ({ setClosed }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
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
      <Button stretched className={styles.uploadButton}>
        Загрузить
      </Button>
    </Modal>
  )
}
