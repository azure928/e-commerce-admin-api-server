import express from 'express';
import * as orderController from './orderController.js';

const router = express.Router();

//주문 내역 조회 - 검색, 필터링
router.get('/orders', orderController.readOrders);

//주문건에 대하여 발송 처리 (제품 배송 상태 업데이트)
router.patch('/orders/:id', orderController.updateOrder);

export default router;
