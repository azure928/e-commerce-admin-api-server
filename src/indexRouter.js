import express from 'express';
import orderRouter from './order/orderRouter.js';

const router = express.Router();

// test
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

router.use(orderRouter);

export default router;
