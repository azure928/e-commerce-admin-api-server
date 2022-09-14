import { db } from '../../database/models/index.js';
const Coupon_types = db.coupon_types;
const Issued_coupons = db.issued_coupons;
import sequelize from 'sequelize';

export const createCouponTypes = async (
  type,
  discount_price,
  coupon_name,
  coupon_code
) => {
  return await Coupon_types.create({
    type: type,
    discount_price: discount_price,
    name: coupon_name,
    coupon_code: coupon_code,
  });
};

export const readIssuedCouponById = async id => {
  return await Issued_coupons.findOne({
    attributes: [
      ['id', '발급된 쿠폰 id'],
      ['is_used', '사용내역'],
      [sequelize.col('coupon_type.name'), '쿠폰 이름'],
      [sequelize.col('coupon_type.type'), '쿠폰 종류'],
      ['discounted_amount', '할인된 금액'],
    ],
    include: [
      {
        model: Coupon_types,
        as: 'coupon_type',
        attributes: [],
      },
    ],
    where: {
      id: id,
    },
  });
};

export const readCouponTypesStatistic = async () => {
  const selectedCouponTypes = await Issued_coupons.findAll({
    attributes: [
      ['coupon_type_id', '쿠폰 타입 id'],
      [sequelize.col('coupon_type.name'), '쿠폰 이름'],
      [sequelize.col('coupon_type.type'), '쿠폰 종류'],
      [sequelize.fn('sum', sequelize.col('discounted_amount')), '총 할인액'],
      [sequelize.fn('count', '*'), '사용 횟수'],
    ],
    include: [
      {
        model: Coupon_types,
        as: 'coupon_type',
        attributes: [],
      },
    ],
    group: ['coupon_type_id'],
    where: {
      is_used: '사용완료',
    },
  });
  return selectedCouponTypes;
};
