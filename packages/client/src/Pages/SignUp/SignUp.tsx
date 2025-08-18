import { CenteredLayout } from '../../Common/Layouts/CenteredLayout';
import { SignUpComponent } from '../../Components/SignUp';

import styles from './SignUp.module.css';

export const SignUp = () => (
  <div className={styles.root}>
    <CenteredLayout>
      <SignUpComponent />
    </CenteredLayout>
  </div>
);
