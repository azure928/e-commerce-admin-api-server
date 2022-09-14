import express from 'express';
import orderRouter from './order/orderRouter.js';
import couponRouter from './coupon/couponRouter.js';

const router = express.Router();

// test
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

router.use(orderRouter);
router.use(couponRouter);

export default router;
