import { Router } from 'express';
import { col, fn, Op } from 'sequelize';
import {
  Comment, Reaction, Topic, User,
} from '../models';

const router = Router();

// добавление
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid title param' });
    return;
  }

  if (!content) {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid content param' });
    return;
  }

  try {
    const topic = await Topic.create({
      title,
      content,
      owner_id: req.user.id,
    });

    const createdTopic = await Topic.findOne({
      where: { id: topic.id },
      raw: true,
      include: {
        model: User,
        required: true,
        foreignKey: 'owner_id',
        attributes: [],
      },
      attributes: [
        'id',
        'title',
        'content',
        'User.first_name',
        'User.second_name',
        'User.avatar',
        'createdAt',
      ],
    });

    const comments = await Comment.findAll({
      where: { topic_id: topic.id },
    });

    res.send({ ...createdTopic, comments_count: comments.length });
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      res.status(500).send({ reason: e.message });
    } else {
      res.status(500).send();
    }
  }
});

// обновление
router.patch('/:id', async (req, res) => {
  const { id: topicId } = req.params;
  const { title, content } = req.body;

  if (!topicId || Number.isNaN(Number(topicId))) {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid topic ID' });
    return;
  }

  if (!title && !content) {
    res.status(400);
    res.send({
      status: 400,
      reason: 'At least one of title or content must be provided',
    });
    return;
  }

  if (title && typeof title !== 'string') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid title param' });
    return;
  }

  if (content && typeof content !== 'string') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid content param' });
    return;
  }

  const topic = await Topic.findOne({
    where: { id: topicId },
  });

  if (topic === null) {
    res.status(404);
    res.send({ status: 404, reason: 'Topic not found' });
    return;
  }

  if (topic.owner_id !== req.user.id) {
    res.status(403).send({ reason: 'Topic editing is forbidden' });
    return;
  }

  const updateData: { title?: string; content?: string } = {};

  if (title) updateData.title = title;
  if (content) updateData.content = content;

  try {
    await Topic.update(updateData, {
      where: {
        id: topicId,
        owner_id: req.user.id,
      },
    });

    res.send('OK');
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      res.status(500).send({ reason: e.message });
    } else {
      res.status(500).send();
    }
  }
});

// удаление
router.delete('/:id', async (req, res) => {
  const { id: topicId } = req.params;

  if (!topicId || Number.isNaN(Number(topicId))) {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid topic ID' });
    return;
  }

  try {
    const topic = await Topic.findOne({
      where: { id: topicId },
    });

    if (topic === null) {
      res.status(404);
      res.send({ status: 404, reason: 'Topic not found' });
      return;
    }

    if (topic.owner_id !== req.user.id) {
      res.status(403).send({ reason: 'Topic deleting is forbidden' });
      return;
    }

    await Topic.destroy({
      where: { id: topicId },
    });

    res.send('OK');
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      res.status(500).send({ reason: e.message });
    } else {
      res.status(500).send();
    }
  }
});

// добавление комментария
router.post('/:id/comment', async (req, res) => {
  const { id: topicId } = req.params;

  const { comment_id: commentId, content } = req.body;

  if (!topicId || typeof Number(topicId) !== 'number') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid id' });
    return;
  }

  if (!content) {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid content param' });
    return;
  }

  if (commentId && typeof Number(commentId) !== 'number') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid comment_id param' });
    return;
  }

  try {
    const topic = await Topic.findOne({
      where: { id: topicId },
    });

    if (topic === null) {
      res.status(404);
      res.send({ status: 404, reason: 'Topic not found' });
      return;
    }

    if (commentId) {
      const comment = await Comment.findOne({
        where: { id: commentId },
      });

      if (!comment || comment.topic_id !== Number(topicId)) {
        res.status(400);
        res.send({ status: 400, reason: 'Invalid comment_id param' });
        return;
      }
    }

    const createdComment = await Comment.create({
      content,
      topic_id: topicId,
      parent_id: commentId || null,
      owner_id: req.user.id,
    });

    const comment = await Comment.findOne({
      where: { id: createdComment.id },
      include: {
        model: User,
        required: true,
        foreignKey: 'owner_id',
        attributes: ['first_name', 'second_name', 'avatar'],
      },
      attributes: ['id', 'parent_id', 'createdAt', 'content'],
    });

    res.send(comment);
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      res.status(500).send({ reason: e.message });
    } else {
      res.status(500).send();
    }
  }
});

router.delete('/:topic_id/comment/:id', async (req, res) => {
  const { topic_id: topicId, id: commentId } = req.params;

  if (!topicId || typeof Number(topicId) !== 'number') {
    res.status(400).send({ reason: 'Invalid path param topic_id' });
    return;
  }

  if (!commentId || typeof Number(commentId) !== 'number') {
    res.status(400).send({ reason: 'Invalid path param id' });
    return;
  }

  try {
    const comment = await Comment.findOne({
      where: { [Op.and]: [{ id: commentId }, { topic_id: topicId }] },
    });

    if (!comment) {
      res.status(404).send('Comment not found');
      return;
    }

    await Comment.destroy({
      where: { id: commentId },
    });

    res.send('OK');
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      res.status(500).send({ reason: e.message });
    } else {
      res.status(500).send();
    }
  }
});

// получение всех топиков
router.get('/', async (_req, res) => {
  try {
    const topics = await Topic.findAll({
      raw: true,
      include: [
        {
          model: Comment,
          attributes: [],
          duplicating: false,
        },
        {
          model: User,
          attributes: [],
        },
      ],
      group: [
        'Topic.id',
        'Topic.title',
        'Topic.content',
        'User.id',
      ],
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title',
        'content',
        'createdAt',
        [fn('COUNT', col('Comments.id')), 'comments_count'],
        'User.avatar', 'User.first_name', 'User.second_name', 'User.yandex_id',
      ],
    });

    res.send(topics);
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      res.status(500).send({ reason: e.message });
    } else {
      res.status(500).send();
    }
  }
});

// получение топика по id
router.get('/:id', async (req, res) => {
  const { id: topicId } = req.params;

  if (!topicId || typeof Number(topicId) !== 'number') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid topic ID' });
    return;
  }

  try {
    const topic = await Topic.findOne({
      where: { id: topicId },
      raw: true,
      include: {
        model: User,
        required: true,
        foreignKey: 'owner_id',
        attributes: [],
      },
      attributes: [
        'id',
        'title',
        'content',
        'User.yandex_id',
        'User.first_name',
        'User.second_name',
        'User.avatar',
        'createdAt',
      ],
    });

    if (topic === null) {
      res.status(404);
      res.send({ status: 404, reason: 'Topic not found' });
      return;
    }

    const comments = await Comment.findAll({
      where: { topic_id: topic.id },
      include: [{
        model: User,
        attributes: ['first_name', 'second_name', 'avatar', 'yandex_id'],
      }],
      attributes: [
        'id',
        'parent_id',
        'createdAt',
        'content',
      ],
    });

    const reactions = await Reaction.findAll({
      attributes: [
        'comment_id',
        'code',
        'owner_id',
      ],
      where: {
        comment_id: comments.map((comment) => comment.id),
      },
    });

    const commentsWithReactions = comments.map((comment) => {
      const reactionsByCode = reactions
        .filter((reaction) => reaction.comment_id === comment.id)
        .reduce((acc, reaction) => {
          const code = reaction.code!;
          return { ...acc, [code]: [...(acc[code] || []), reaction.owner_id!] };
        }, {} as Record<number, number[]>);

      return {
        ...comment.toJSON(),
        Reactions: Object.entries(reactionsByCode).reduce((acc, [code, ownerIds]) => {
          acc.push({
            code: Number(code), count: ownerIds.length, is_owner: ownerIds.includes(req.user.id),
          });
          return acc;
        }, [] as { code: number, count: number, is_owner: boolean }[]),
      };
    });

    res.send({
      ...topic, comments_count: comments.length, comments: commentsWithReactions,
    });
  } catch (e) {
    console.error(e);

    if (e instanceof Error) {
      res.status(500).send({ reason: e.message });
    } else {
      res.status(500).send();
    }
  }
});

export default router;
