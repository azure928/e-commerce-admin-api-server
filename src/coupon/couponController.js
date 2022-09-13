import * as couponService from './couponService.js';
import { v4 } from 'uuid';

export const createCouponTypes = async (req, res) => {
  try {
    const data = {
      type: req.body.type,
      discount_amount: req.body.discount_amount,
      coupon_name: req.body.coupon_name,
      coupon_code: v4(),
    };

    await couponService.createCouponTypes(data);
    return res.status(201).json({ message: '쿠폰 타입 생성 성공' });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};
