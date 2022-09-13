import express from 'express';
import * as orderController from './orderController.js';

const router = express.Router();

//주문 내역 조회 - 검색, 필터링
router.get('/order', orderController.readOrders);

export default router;
