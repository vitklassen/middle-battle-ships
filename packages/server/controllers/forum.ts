import { Router } from 'express';
import { Comment, Topic } from '../models';

const router = Router();

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const ownerId = 1;

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
    await Topic.create({
      title,
      content,
      owner_id: ownerId,
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

router.post('/', async (req, res) => {
  const { topic_id: topicId, content } = req.body;
  const ownerId = 1;

  if (!topicId || typeof topicId !== 'number') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid topic_id param' });
    return;
  }

  if (!content) {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid content param' });
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

    await Comment.create({
      content,
      topic_id: topicId,
      parent_id: null,
      owner_id: ownerId,
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

router.get('/', async (_req, res) => {
  try {
    const topics = await Topic.findAll();

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

export default router;
