import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { Header } from '../../Components/Header';
import { ProfileCard } from '../../Components/ProfileCard/ProfileCard';
import { initPage, PageInitArgs, usePage } from '../../Router';
import styles from './ProfilePage.module.css';

export const initProfilePage = async (args: PageInitArgs) => {
  await initPage(args);
};

export const ProfilePage = authorizationChecker(() => {
  usePage({ initPage: initProfilePage });

  return (
    <>
      <Header />
      <main className={styles.root}>
        <CenteredLayout width="468px">
          <h1 className={styles.title}>Профиль</h1>
          <ProfileCard />
        </CenteredLayout>
      </main>
    </>
  );
});
