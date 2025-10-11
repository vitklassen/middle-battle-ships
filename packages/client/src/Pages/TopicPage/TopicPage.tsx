import { useParams } from 'react-router';
import { useState } from 'react';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { TopicView } from '../../Components/TopicView';
import { initPage, PageInitArgs, usePage } from '../../Router';
import { useSelector } from '../../Store';
import { Header } from '../../Components/Header';
import styles from './TopicPage.module.css';
import { getTopic, setTopic } from '../../Features/forum';
import { setError } from '../../Features/error';
import { AddCommentModal } from './AddCommentModal';

export const initTopicPage = async (args: PageInitArgs) => {
  await initPage(args);

  const { state, dispatch, cookie } = args;

  if (typeof state.forum.currentTopic !== 'undefined') {
    return;
  }

  return getTopic({ id: 1 }, cookie)
    .then((topic) => dispatch(setTopic(topic)))
    .catch((error) => dispatch(setError(error)));
};

export const TopicPage = authorizationChecker(() => {
  usePage({ initPage: initTopicPage });

  const [isAddCommentModalVisible, setIsAddCommentModalVisible] = useState(false);

  const topic = useSelector((state) => state.forum.currentTopic);

  if (!topic) {
    return <>Topic not found</>;
  }

  return (
    <>
      {isAddCommentModalVisible && <AddCommentModal setClosed={() => setIsAddCommentModalVisible(false)} />}
      <Header />
      <main className={styles.root}>
        <TopicView topic={topic} onAddCommentClick={() => setIsAddCommentModalVisible(true)} />
      </main>
    </>
  );
});
