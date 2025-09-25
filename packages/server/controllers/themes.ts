import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  const { theme } = req.body;
  if (!theme || typeof theme !== 'boolean') {
    res.status(400);
    res.send({ status: 400, reason: 'Invalid theme param' });
  }
});

export default router;
