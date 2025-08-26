import { authorizationChecker } from '../Components/AuthorizationChecker';

export const Topic = authorizationChecker(() => <div>Topic</div>);
