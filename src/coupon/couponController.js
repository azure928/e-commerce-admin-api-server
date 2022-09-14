import * as couponService from './couponService.js';
import { v4 } from 'uuid';

export const createCouponTypes = async (req, res) => {
  try {
    const data = {
      type: req.body.type,
      discount_price: req.body.discount_price,
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

export const readIssuedCouponsUsage = async (req, res) => {
  try {
    const id = req.params.id;

    const selectedIssuedCoupon = await couponService.readIssuedCouponsUsage(id);
    res.status(200).json(selectedIssuedCoupon);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};

export const readCouponTypesStatistic = async (req, res) => {
  try {
    const selectedCouponTypes = await couponService.readCouponTypesStatistic();
    res.status(200).json(selectedCouponTypes);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};
