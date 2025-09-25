import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { SignUpComponent } from '../../Components/SignUp';
import { initPage, PageInitArgs, usePage } from '../../Router';

import styles from './SignUpPage.module.css';

export const initSignUpPage = async (args: PageInitArgs) => {
  await initPage(args);
};

export const SignUpPage = () => {
  usePage({ initPage: initSignUpPage });

  return (
    <div className={styles.root}>
      <CenteredLayout>
        <SignUpComponent />
      </CenteredLayout>
    </div>
  );
};
