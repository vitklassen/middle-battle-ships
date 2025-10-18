import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { authorizationChecker } from '../../Components/AuthorizationChecker';
import { TopicView } from '../../Components/TopicView';
import {
  initPage, PageInitArgs, Path, usePage,
} from '../../Router';
import { useSelector } from '../../Store';
import { Header } from '../../Components/Header';
import styles from './TopicPage.module.css';
import {
  deleteTopic, getTopic, removeTopic, resetTopic, setTopic,
  TTopic,
} from '../../Features/forum';
import { setError } from '../../Features/error';
import { AddCommentModal } from './AddCommentModal';
import { Button } from '../../Common/Blocks/Button';
import { EditTopicModal } from './EditTopicModal';

export const initTopicPage = async (args: PageInitArgs) => {
  await initPage(args);

  const { state, dispatch, context: { cookie, path } } = args;

  if (typeof state.forum.currentTopic !== 'undefined' && state.forum.currentTopic !== null) {
    return;
  }

  const id = Number(path.split('/').slice(-1));

  return getTopic({ id }, cookie)
    .then((topic) => dispatch(setTopic(topic)))
    .catch((error) => dispatch(setError(error)));
};

export const TopicPage = authorizationChecker(() => {
  usePage({ initPage: initTopicPage });

  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(resetTopic());
  }, []);

  const [isAddCommentModalVisible, setIsAddCommentModalVisible] = useState(false);
  const [isEditTopicModalVisible, setIsEditTopicModalVisible] = useState(false);

  const topic = useSelector((state) => state.forum.currentTopic);
  const profile = useSelector((state) => state.profile.value);

  const navigate = useNavigate();

  const handleDeleteTopicClick = (topic: TTopic) => {
    deleteTopic(topic.id)
      .then(() => {
        dispatch(removeTopic(topic));
        navigate(Path.Forum);
      })
      .catch((error) => dispatch(setError(error)));
  };

  if (!topic) {
    return <>Topic not found</>;
  }

  return (
    <>
      {isAddCommentModalVisible && <AddCommentModal setClosed={() => setIsAddCommentModalVisible(false)} />}
      {isEditTopicModalVisible && <EditTopicModal setClosed={() => setIsEditTopicModalVisible(false)} topicId={topic.id} form={topic} />}
      <Header />
      <main className={styles.root}>
        {topic.owner.id === profile?.id && (
        <div className={styles.panel}>
          <Button mode="secondary" onClick={() => setIsEditTopicModalVisible(true)}>Редактировать тему</Button>
          <Button mode="secondary" className={styles.buttonDestructive} onClick={() => handleDeleteTopicClick(topic)}>Удалить тему</Button>
        </div>
        )}
        <TopicView topic={topic} onAddCommentClick={() => setIsAddCommentModalVisible(true)} />
      </main>
    </>
  );
});
