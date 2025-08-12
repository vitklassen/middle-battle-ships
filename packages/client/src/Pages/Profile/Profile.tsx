import { CenteredLayout } from '../../Common/Layouts/CenteredLayout'
import { ProfileCard } from '../../Components/ProfileCard/ProfileCard'
import styles from './Profile.module.css'

export const Profile = () => {
  return (
    <div className={styles.root}>
      <CenteredLayout width="468px">
        <h1 className={styles.title}>Профиль</h1>
        <ProfileCard />
      </CenteredLayout>
    </div>
  )
}
