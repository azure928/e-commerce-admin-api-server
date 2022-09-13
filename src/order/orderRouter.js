import express from 'express';
import * as orderController from './orderController.js';

const router = express.Router();

router.get('/order', orderController.readOrders);

export default router;
