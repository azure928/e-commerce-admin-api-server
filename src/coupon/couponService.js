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

export async function readIssuedCoupon(id) {
  const selectedIssuedCoupon = await couponRepository.readIssuedCouponById(id);

  if (!selectedIssuedCoupon) {
    const error = new Error('해당 하는 쿠폰이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  } else {
    return selectedIssuedCoupon;
  }
}

export async function readCouponTypesStatistic() {
  const selectedCouponTypes = await couponRepository.readCouponTypesStatistic();

  if (!selectedCouponTypes) {
    const error = new Error('쿠폰타입이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  } else {
    return selectedCouponTypes;
  }
}
