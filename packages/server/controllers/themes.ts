import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.post('/', async (req, res) => {
  const { theme } = req.body;

  if (typeof theme !== 'boolean') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid theme param' });
    return;
  }

  try {
    const { user } = req;
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
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
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
