import { Router } from 'express';
import { Comment, Topic } from '../models';

const router = Router();

// добавление
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

// обновление
router.patch('/:id', async (req, res) => {
  const { id: topicId } = req.params;
  const { title, content } = req.body;
  const ownerId = 1;

  if (typeof topicId !== 'number') {
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

  const updateData: { title?: string; content?: string } = {};

  if (title) updateData.title = title;
  if (content) updateData.content = content;

  try {
    await Topic.update(updateData, {
      where: {
        id: topicId,
        owner_id: ownerId,
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

  if (!topicId || typeof topicId !== 'number') {
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
router.post('/comment', async (req, res) => {
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

// получение всех топиков
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

// получение топика по id
router.get('/:id', async (req, res) => {
  const { id: topicId } = req.params;

  if (!topicId || typeof topicId !== 'number') {
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

    res.send(topic);
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
