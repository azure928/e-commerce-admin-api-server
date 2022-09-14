import express from 'express';
import * as couponController from './couponController.js';

const router = express.Router();

//새로운 쿠폰 타입 신설
router.post('/coupontypes', couponController.createCouponTypes);

//발급된 쿠폰의 사용 내역 열람
router.get('/issuedcoupons/:id', couponController.readIssuedCoupon);

export default router;
