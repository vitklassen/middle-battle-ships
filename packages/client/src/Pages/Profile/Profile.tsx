import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { Header } from '../../Components/Header';
import { ProfileCard } from '../../Components/ProfileCard/ProfileCard';
import styles from './Profile.module.css';

export const Profile = authorizationChecker(() => (
  <>
    <Header />
    <main className={styles.root}>
      <CenteredLayout onlyHorizontally width="468px">
        <h1 className={styles.title}>Профиль</h1>
        <ProfileCard />
      </CenteredLayout>
    </main>
  </>
));
