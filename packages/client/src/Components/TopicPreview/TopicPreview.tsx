import { Card } from '../../Common/Blocks/Card';
import { getAvatarUrl } from '../../Common/utils/getAvatarUrl';
import { TTopic } from '../../Features/forum';
import styles from './TopicPreview.module.css';

type Props = {
  topic: TTopic;
};

export const TopicPreview = ({ topic }: Props) => (
  <Card>
    <p>
      <img src={getAvatarUrl(topic.owner)} alt="" className={styles.avatar} />
      {topic.owner.firstName}
      {' '}
      {topic.owner.lastName}
    </p>
    <h1>{topic.title}</h1>
    <p>{topic.content}</p>
    <span>
      Комментарии:
      {topic.commentCount}
    </span>
  </Card>
);
