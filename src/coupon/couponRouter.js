import express from 'express';
import * as couponController from './couponController.js';

const router = express.Router();

//새로운 쿠폰 타입 신설
router.post('/coupontypes', couponController.createCouponTypes);

export default router;
