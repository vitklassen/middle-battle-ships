import { Button } from '../../Common/Blocks/Button';
import { Card } from '../../Common/Blocks/Card';
import { getAvatarUrl } from '../../Common/utils/getAvatarUrl';
import { TTopic } from '../../Features/forum';
import { Comments } from './Comments';
import styles from './TopicView.module.css';

type Props = {
    topic: TTopic;
    onAddCommentClick: VoidFunction;
}

const shortDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
});

export const TopicView = ({ topic, onAddCommentClick }: Props) => (
  <>
    <Card>
      <div className={styles.container}>
        <img src={getAvatarUrl(topic.owner)} alt="" className={styles.avatar} />
        <div className={styles.info}>
          <div className={styles.user}>
            {`${topic.owner.firstName} ${topic.owner.lastName}`}
            <span>{`${shortDateFormatter.format(Date.parse(topic.createdAt))}`}</span>
          </div>
          <h1 className={styles.title}>{topic.title}</h1>
          <div className={styles.info} />
          <p className={styles.content}>{topic.content}</p>
          <div className={styles.footer}>
            <Button mode="tertiary" onClick={onAddCommentClick}>Добавить комментарий</Button>
          </div>
        </div>
      </div>
    </Card>
    <h3 className={styles.commentTitle}>
      {`Комментарии (${topic.commentCount})`}
    </h3>
    {
      topic.comments
        .filter((comment) => comment.parentId === null)
        .map((comment) => (
          <Comments
            key={comment.id}
            topicId={topic.id}
            comment={comment}
            comments={topic.comments}
            level={0}
            className={styles.comment}
          />
        ))
    }
  </>
);
