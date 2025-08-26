import { authorizationChecker } from '../Components/AuthorizationChecker';

export const Forum = authorizationChecker(() => <div>Forum</div>);
