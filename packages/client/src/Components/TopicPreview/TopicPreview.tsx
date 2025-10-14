import { Button } from '../../Common/Blocks/Button';
import { Card } from '../../Common/Blocks/Card';
import { getAvatarUrl } from '../../Common/utils/getAvatarUrl';
import { TTopicPreview } from '../../Features/forum';
import styles from './TopicPreview.module.css';
import comment from './assets/comment.svg';

type Props = {
  topic: TTopicPreview;
  onClick?: (id: number) => void;
  className?: string;
};

const shortDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
});

export const TopicPreview = ({ topic, onClick, className }: Props) => (
  <Card className={className}>
    <div className={styles.container}>
      <img src={console.log(topic.owner) || getAvatarUrl(topic.owner)} alt="" className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.user}>
          {`${topic.owner.firstName} ${topic.owner.lastName}`}
          <span>{`${shortDateFormatter.format(Date.parse(topic.createdAt))}`}</span>
        </div>
        <h1 className={styles.title}>{topic.title}</h1>
        <div className={styles.info} />
        <p className={styles.content}>{topic.content}</p>
        <div className={styles.footer}>
          <div className={styles.commentCount}>
            <img src={comment} alt="" className={styles.commentIcon} />
            {topic.commentCount}
          </div>
          <Button onClick={onClick && (() => onClick(topic.id))} mode="tertiary">Перейти</Button>
        </div>
      </div>
    </div>
  </Card>
);
