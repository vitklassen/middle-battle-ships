import { useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
  addReaction, deleteReaction, Reaction, setComment, TComment,
} from '../../../Features/forum';
import { Card } from '../../../Common/Blocks/Card';
import { Button } from '../../../Common/Blocks/Button';
import { AddCommentForm } from '../../AddCommentForm';
import { AddReactionPopout } from '../AddReactionPopout';
import styles from './Comments.module.css';
import { getAvatarUrl } from '../../../Common/utils/getAvatarUrl';

type Props = {
  comment: TComment;
  comments: TComment[];
  level: number;
  className?: string;
}

const shortDateFormatter = new Intl.DateTimeFormat('fr-FR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
});

export const Comments = ({
  comment, comments, level, className,
}: Props) => {
  const [isAddCommentFormVisible, setIsAddCommentFormVisible] = useState(false);
  const [isChildCommentVisible, setIsChildCommentVisible] = useState(false);
  const [isAddReactionPopoutVisible, setIsAddReactionPopoutVisible] = useState(false);

  const addReactionPopoutAnchor = useRef<HTMLButtonElement | null>(null);

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

        if (!reaction) {
          return;
        }

        return dispatch(setComment({
          ...comment,
          reactions: [
            ...(comment.reactions?.filter((reaction) => reaction.code !== code) || []),
            { ...reaction, count: (reaction.count || 0) + 1, isOwner: true }],
        }));
      });
  };

  const handleDeleteReaction = (code: number) => {
    deleteReaction({ code: code.toString(16), comment_id: comment.id })
      .then(() => {
        const reaction = comment.reactions?.find((reaction) => reaction.code === code);

        if (!reaction) {
          return;
        }

        return dispatch(setComment({
          ...comment,
          reactions: [
            ...(comment.reactions?.filter((reaction) => reaction.code !== code) || []),
            { ...reaction, count: (reaction.count || 0) - 1, isOwner: false }],
        }));
      });
  };

  if (!comment) {
    return;
  }

  return (
    <div className={className} style={{ marginLeft: `${level * 50}px` }}>
      {isAddReactionPopoutVisible && (
      <AddReactionPopout
        onSelectReaction={handleSelectReaction}
        anchor={addReactionPopoutAnchor}
        setClosed={() => setIsAddReactionPopoutVisible(false)}
      />
      )}
      <Card key={comment.id} className={styles.card}>
        <div className={styles.info}>
          <div className={styles.user}>
            <img src={getAvatarUrl(comment.owner)} alt="" className={styles.avatar} />
            <p>{`${comment.owner.firstName} ${comment.owner.lastName}`}</p>
          </div>
          <span>{`${shortDateFormatter.format(Date.parse(comment.createdAt))}`}</span>
        </div>
        <p>{comment.content}</p>
        <div className={styles.reactions}>
          {comment.reactions && comment.reactions.map((reaction) => (
            <Button
              mode={reaction.isOwner ? 'primary' : 'secondary'}
              key={reaction.code}
              className={styles.reactionButton}
              onClick={() => (reaction.isOwner ? handleDeleteReaction(reaction.code) : handleSelectReaction(reaction.code))}
            >
              {`${reaction.count}`}
              <span className={styles.reaction}>{`${String.fromCodePoint(reaction.code)}`}</span>
            </Button>
          ))}
          <Button
            mode="secondary"
            rootRef={addReactionPopoutAnchor}
            className={styles.reactionButton}
            onClick={() => setIsAddReactionPopoutVisible(true)}
          >
            +
          </Button>
        </div>
        {childComments.length !== 0 && (
          <Button mode="tertiary" onClick={() => setIsChildCommentVisible((value) => !value)}>
            {isChildCommentVisible ? 'Скрыть комментарии' : `Показать комментарии (${childComments.length})`}
          </Button>
        )}
        <Button mode="tertiary" onClick={() => setIsAddCommentFormVisible(true)}>Ответить</Button>
      </Card>
      {isAddCommentFormVisible && (
        <AddCommentForm commentId={comment.id} onSubmit={() => setIsAddCommentFormVisible(false)} onClose={() => setIsAddCommentFormVisible(false)} />
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
