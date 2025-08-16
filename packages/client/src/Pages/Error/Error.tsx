import { FC } from 'react'
import { useNavigate } from 'react-router'

import clsx from 'clsx'
import styles from './Error.module.css'
import { Button } from '../../Common'

interface IProps {
  title: string
  description: string
}

export const Error: FC<IProps> = ({ title, description }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className={clsx(styles.wrapper)}>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <Button text="назад" onClick={goBack} />
    </div>
  )
}
