import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.post('/', async (req, res) => {
  const { theme, user_id: userId } = req.body;
  if (!theme || typeof theme !== 'boolean') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid theme param' });
    return;
  }
  if (!userId || typeof userId !== 'number') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid user_id param' });
    return;
  }
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      res.status(404);
      res.send({ status: 404, reason: 'User not found' });
      return;
    }
    user.theme = theme;
    await user.save();
    res.send({ new_theme: theme });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ reason: error.message });
    } else {
      res.status(500).send();
    }
  }
});

router.get('/', async (req, res) => {
  const { user_id: userId } = req.body;
  if (!userId || typeof userId !== 'number') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid user_id param' });
    return;
  }
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      res.status(404);
      res.send({ status: 404, reason: 'User not found' });
      return;
    }
    res.send({ current_theme: user.theme });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ reason: error.message });
    } else {
      res.status(500).send();
    }
  }
});

export default router;
