import { db } from '../../database/models/index.js';
const Coupon_types = db.coupon_types;

export const createCouponTypes = async (
  type,
  discount_amount,
  coupon_name,
  coupon_code
) => {
  return await Coupon_types.create({
    type: type,
    discount_amount: discount_amount,
    name: coupon_name,
    coupon_code: coupon_code,
  });
};
