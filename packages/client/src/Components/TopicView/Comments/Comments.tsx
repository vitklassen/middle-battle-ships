import { useMemo, useState } from 'react';
import { TComment } from '../../../Features/forum';
import { Card } from '../../../Common/Blocks/Card';
import { Button } from '../../../Common/Blocks/Button';
import { AddCommentForm } from '../../AddCommentForm';

type Props = {
  comment: TComment;
  comments: TComment[];
  level: number;
}

export const Comments = ({ comment, comments, level }: Props) => {
  const [isAddCommentFormVisible, setIsAddCommentFormVisible] = useState(false);
  const [isChildCommentVisible, setIsChildCommentVisible] = useState(false);

  const childComments = useMemo(
    () => comments.filter((childComment) => childComment.parentId === comment.id),
    [comments, comment.id],
  );

  if (!comment) {
    return;
  }

  return (
    <div>
      <Card key={comment.id}>
        <p>{`${comment.owner.firstName} ${comment.owner.lastName}`}</p>
        <p>{comment.content}</p>
        {childComments.length !== 0 && (
          <Button onClick={() => setIsChildCommentVisible((value) => !value)}>
            {isChildCommentVisible ? 'Скрыть комментарии' : 'Показать комментарии'}
          </Button>
        )}
        <Button mode="secondary" onClick={() => setIsAddCommentFormVisible(true)}>Ответить</Button>
      </Card>
      {isAddCommentFormVisible && (
      <Card>
        <AddCommentForm commentId={comment.id} onSubmit={() => setIsAddCommentFormVisible(false)} />
      </Card>
      )}
      {isChildCommentVisible && childComments.map((childComment) => (
        <Comments
          key={childComment.id}
          comment={childComment}
          comments={comments}
          level={level + 1}
        />
      ))}
    </div>
  );
};
