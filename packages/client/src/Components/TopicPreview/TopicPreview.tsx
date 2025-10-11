import { Card } from '../../Common/Blocks/Card';
import { getAvatarUrl } from '../../Common/utils/getAvatarUrl';
import { TTopicPreview } from '../../Features/forum';
import styles from './TopicPreview.module.css';

type Props = {
  topic: TTopicPreview;
  onClick?: (id: number) => void;
};

export const TopicPreview = ({ topic, onClick }: Props) => (
  <Card onClick={onClick && (() => onClick(topic.id))}>
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
