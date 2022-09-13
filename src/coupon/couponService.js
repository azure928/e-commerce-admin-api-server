import * as couponRepository from './couponRepository.js';

export async function createCouponTypes(data) {
  const { type, discount_amount, coupon_name, coupon_code } = data;

  if (!type) {
    const error = new Error(
      '쿠폰 타입 선택은 필수입니다. (delivery, percent, fixed 중 선택)'
    );
    error.statusCode = 400;
    throw error;
  }
  if (!discount_amount) {
    const error = new Error('할인 금액 혹은 할인 %를 입력해 주세요.');
    error.statusCode = 400;
    throw error;
  } else {
    return await couponRepository.createCouponTypes(
      type,
      discount_amount,
      coupon_name,
      coupon_code
    );
  }
}
