import { db } from '../../database/models/index.js';
const Coupon_types = db.coupon_types;
const Issued_coupon = db.issued_coupon;

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

export const readIssuedCoupon = async id => {
  return await Issued_coupon.findOne({
    attributes: ['id', 'is_used'],

    where: {
      id: id,
    },
  });
};
