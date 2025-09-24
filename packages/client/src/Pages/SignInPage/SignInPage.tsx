import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { SignInComponent } from '../../Components/Signin';
import { initPage, PageInitArgs, usePage } from '../../Router';

import styles from './SignInPage.module.css';

export const initSignInPage = async (args: PageInitArgs) => {
  await initPage(args);
};

export const SignInPage = () => {
  usePage({ initPage: initSignInPage });

  return (
    <div className={styles.root}>
      <CenteredLayout>
        <SignInComponent />
      </CenteredLayout>
    </div>
  );
};
