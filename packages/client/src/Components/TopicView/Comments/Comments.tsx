import { useMemo } from 'react';
import { Comment } from '../../../Features/forum';
import { Card } from '../../../Common/Blocks/Card';

type Props = {
    comment: Comment;
    comments: Comment[];
}

export const Comments = ({ comment, comments }: Props) => {
  const childComments = useMemo(() => comments.filter((comment) => comment.parentId === comment.id), [comments, comment.id]);

  if (!comment) {
    return;
  }

  return (
    <div>
      <Card key={comment.id}>
        <p>{`${comment.owner.firstName} ${comment.owner.lastName}`}</p>
        <p>{comment.content}</p>
      </Card>
      {childComments.map((childComment) => (<Comments key={childComment.id} comment={childComment} comments={comments} />))}
    </div>
  );
};
