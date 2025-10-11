import { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReaction, setComment, TComment } from '../../../Features/forum';
import { Card } from '../../../Common/Blocks/Card';
import { Button } from '../../../Common/Blocks/Button';
import { AddCommentForm } from '../../AddCommentForm';
import { AddReactionPopout } from '../AddReactionPopout';

type Props = {
  comment: TComment;
  comments: TComment[];
  level: number;
}

export const Comments = ({ comment, comments, level }: Props) => {
  const [isAddCommentFormVisible, setIsAddCommentFormVisible] = useState(false);
  const [isChildCommentVisible, setIsChildCommentVisible] = useState(false);
  const [isAddReactionPopoutVisible, setIsAddReactionPopoutVisible] = useState(false);

  const addReactionPopoutAnchor = useRef<HTMLElement | null>(null);

  const childComments = useMemo(
    () => comments.filter((childComment) => childComment.parentId === comment.id),
    [comments, comment.id],
  );

  const dispatch = useDispatch();

  const handleSelectReaction = (code: number) => {
    addReaction({ code: code.toString(16), comment_id: comment.id })
      .then(() => {
        setIsAddReactionPopoutVisible(false);
        const reaction = comment.reactions?.find((reaction) => reaction.code === code);
        return dispatch(setComment({
          ...comment,
          reactions: [
            ...(comment.reactions?.filter((reaction) => reaction.code !== code) || []),
            { code, count: (reaction?.count || 0) + 1 }],
        }));
      });
  };

  if (!comment) {
    return;
  }

  return (
    <div>
      {isAddReactionPopoutVisible && (
      <AddReactionPopout
        onSelectReaction={handleSelectReaction}
        anchor={addReactionPopoutAnchor}
        setClosed={() => setIsAddReactionPopoutVisible(false)}
      />
      )}
      <Card key={comment.id}>
        <p>{`${comment.owner.firstName} ${comment.owner.lastName}`}</p>
        <p>{comment.content}</p>
        {childComments.length !== 0 && (
          <Button onClick={() => setIsChildCommentVisible((value) => !value)}>
            {isChildCommentVisible ? 'Скрыть комментарии' : 'Показать комментарии'}
          </Button>
        )}
        <Button mode="secondary" onClick={() => setIsAddCommentFormVisible(true)}>Ответить</Button>
        <Button mode="secondary" rootRef={addReactionPopoutAnchor} onClick={() => setIsAddReactionPopoutVisible(true)}>Добавить реакцию</Button>
        {
        comment.reactions && comment.reactions.map((reaction) => (
          <div key={reaction.code}>
            {`${reaction.count} ${String.fromCodePoint(reaction.code)}`}
          </div>
        ))
      }
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
