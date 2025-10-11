import { Card } from '../../Common/Blocks/Card';
import { getAvatarUrl } from '../../Common/utils/getAvatarUrl';
import { TTopic, TTopicPreview } from '../../Features/forum';
import { Comments } from './Comments';

type Props = {
    topic: TTopic;
}

export const TopicView = ({ topic }: Props) => (
  <>
    <h2>{topic.title}</h2>
    <Card>
      <img src={getAvatarUrl(topic.owner)} alt="" />
      <p>{`${topic.owner.firstName} ${topic.owner.lastName}`}</p>
      <p>{topic.content}</p>
    </Card>
    <h3>
      Комментарии (
      {topic.commentCount}
      )
    </h3>
    {
      topic.comments
        .filter((comment) => comment.parentId === null)
        .map((comment) => <Comments key={comment.id} comment={comment} comments={topic.comments} />)
    }
  </>
);
