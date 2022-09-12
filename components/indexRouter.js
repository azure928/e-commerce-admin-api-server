import express from 'express';

const router = express.Router();

// test
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

export default router;
