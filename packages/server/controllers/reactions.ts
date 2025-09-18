import { Router } from 'express';
import { Op } from 'sequelize';
import { Comment, Reaction, User } from '../models';

const router = Router();

router.post('/', async (req, res) => {
  const { comment_id: commentId, code } = req.body;
  const ownerId = 1;
  const numericCode = parseInt(code, 16);

  if (!commentId || typeof commentId !== 'number') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid comment_id param' });
    return;
  }

  if (!code || typeof code !== 'string' || Number.isNaN(numericCode)) {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid code param' });
    return;
  }

  try {
    const comment = await Comment.findOne({
      where: { id: commentId },
    });

    if (comment === null) {
      res.status(404);
      res.send({ status: 404, reason: 'Comment not found' });
      return;
    }

    const reaction = await Reaction.findOne({
      where: { [Op.and]: [{ owner_id: ownerId }, { code: numericCode }] },
    });

    if (!reaction) {
      await Reaction.create({
        code: numericCode,
        comment_id: commentId,
        owner_id: ownerId,
      });
    }

    res.send('OK');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500);
    res.send({ status: 500, reason: e.message });
    console.error(e);
  }
});

router.get('/comments/:comment_id', async (req, res) => {
  const commentId = req.params.comment_id;

  try {
    const comment = await Comment.findOne({
      where: { id: commentId },
    });

    if (comment === null) {
      res.status(404);
      res.send({ status: 404, reason: 'Comment not found' });
      return;
    }

    const reactions = (await Reaction.findAll({
      where: { comment_id: commentId },
      raw: true,
      include: {
        model: User,
        required: true,
        foreignKey: 'owner_id',
        attributes: [],
      },
      attributes: ['id', 'code', 'User.first_name', 'User.last_name', 'User.avatar'],
    })).map((reaction) => ({ ...reaction, code: reaction.code?.toString(16) }));

    res.send(reactions);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500);
    res.send({ status: 500, reason: e.message });
    console.error(e);
  }
});

export default router;
