import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../Common/Blocks/Button';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { Header } from '../../Components/Header';
import { TopicPreview } from '../../Components/TopicPreview';
import { setError } from '../../Features/error';
import { getTopics, setTopics } from '../../Features/forum';
import { initPage, PageInitArgs, usePage } from '../../Router';
import { useSelector } from '../../Store';
import styles from './ForumPage.module.css';
import { CreateTopicModal } from './CreateTopicModal';

export const initForumPage = async (args: PageInitArgs) => {
  await initPage(args);

  const { state, dispatch, cookie } = args;

  if (typeof state.forum.topics !== 'undefined') {
    return;
  }

  return getTopics(cookie)
    .then((topics) => dispatch(setTopics(topics)))
    .catch((error) => dispatch(setError(error)));
};

export const ForumPage = authorizationChecker(() => {
  usePage({ initPage: initForumPage });

  const [isCreateTopicModalVisible, setIsCreateTopicModalVisible] =
      useState(false);

  const topics = useSelector((state) => state.forum.topics);

  const navigate = useNavigate();

  const navigateToTopicPage = (id: number) => {
    navigate(`/topic/${id}`);
  };

  return (
    <>
      {isCreateTopicModalVisible && (
      <CreateTopicModal
        setClosed={() => setIsCreateTopicModalVisible(false)}
      />
      )}
      <Header />
      <main className={styles.root}>
        <div className={styles.header}>
          <Button onClick={() => setIsCreateTopicModalVisible(true)}>Создать тему</Button>
        </div>
        {!topics ? '...Loading' : topics.map((topic) => (
          <TopicPreview key={topic.id} topic={topic} onClick={navigateToTopicPage} className={styles.topic} />
        ))}
      </main>
    </>
  );
});
