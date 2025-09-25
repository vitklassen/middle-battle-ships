import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { initPage, PageInitArgs, usePage } from '../../Router';

export const initTopicPage = async (args: PageInitArgs) => {
  await initPage(args);
};

export const TopicPage = authorizationChecker(() => {
  usePage({ initPage: initTopicPage });

  return <div>Topic</div>;
});
