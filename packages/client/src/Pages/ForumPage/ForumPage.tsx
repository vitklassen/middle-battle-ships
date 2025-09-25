import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { initPage, PageInitArgs, usePage } from '../../Router';

export const initForumPage = async (args: PageInitArgs) => {
  await initPage(args);
};

export const ForumPage = authorizationChecker(() => {
  usePage({ initPage: initForumPage });

  return <div>Forum</div>;
});
