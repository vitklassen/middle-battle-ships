import { CenteredLayout } from '../../Common/Layouts/CenteredLayout'
import { SignInComponent } from '../../Components/Signin'

import styles from './SignIn.module.css'

export const SignIn = () => {
  return (
    <div className={styles.root}>
      <CenteredLayout>
        <SignInComponent />
      </CenteredLayout>
    </div>
  )
}
