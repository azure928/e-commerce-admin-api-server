import * as orderRepository from './orderRepository.js';

//주문 내역 조회 - 검색, 필터링
export async function readOrders(keyword, start, end) {
  const selectedOrders = await orderRepository.readOrders(keyword, start, end);

  if (selectedOrders.length == 0) {
    const error = new Error();
    error.statusCode = 204;
    throw error;
  } else {
    return selectedOrders;
  }
}

//제품 배송 상태 업데이트
export async function updateOrder(id, delivery_status) {
  const selectedOrder = await orderRepository.readOrderById(id);

  if (!selectedOrder) {
    const error = new Error('수정할 주문내역이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  } else {
    if (!delivery_status) {
      const error = new Error('업데이트할 배송상태를 선택해 주세요.');
      error.statusCode = 400;
      throw error;
    } else {
      await orderRepository.updateOrderById(id, delivery_status);
    }
  }
}

//주문 내역 추가
export async function createOrder(data) {
  const {
    buyer_name,
    product_id,
    quantity,
    country_code,
    buyr_city,
    buyr_zipx,
    issued_coupon_id,
  } = data;

  //product_id에 해당하는 상품이 존재하지 않을 경우
  const selectedProduct = await orderRepository.readProductById(product_id);
  if (!selectedProduct) {
    const error = new Error('해당하는 상품이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }

  //country_code에 해당하는 국가가 존재하지 않을 경우
  const selectedCountry = await orderRepository.readCountryNameByCode(
    country_code
  );
  if (!selectedCountry) {
    const error = new Error('해당하는 국가가 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }

  //country_code로 국가명 가져오기
  const country_name = selectedCountry.country_name;

  //quantity, country_name으로 배송비 가져오기
  const deliveryCost = await orderRepository.readDeliveryCost(
    quantity,
    country_name
  );

  let payment_amount;

  if (!issued_coupon_id) {
    //입력된 쿠폰이 없는 경우
    payment_amount = selectedProduct.price * quantity + deliveryCost[0];
  } else {
    //입력된 쿠폰이 있는 경우
    const selectedIssuedCoupons = await orderRepository.readIssuedCouponById(
      issued_coupon_id
    );

    //입력된 쿠폰 아이디에 해당하는 쿠폰이 없는 경우
    if (!selectedIssuedCoupons) {
      const error = new Error('입력하신 쿠폰이 존재하지 않습니다.');
      error.statusCode = 404;
      throw error;
    }

    //쿠폰 타입 가져오기
    const couponType = await orderRepository.readCouponTypeById(
      selectedIssuedCoupons.coupon_type_id
    );

    //쿠폰 타입별로 주문금액 계산
    if (couponType.type == 'delivery' || couponType.type == 'fixed') {
      console.log('쿠폰 타입이 배송비거나 정액할인일때');
      payment_amount =
        selectedProduct.price * quantity +
        deliveryCost[0] -
        couponType.discount_price;
    } else if (couponType.type == 'percent') {
      console.log('쿠폰 타입이 % 할인일때');
      payment_amount =
        (selectedProduct.price * quantity * (100 - couponType.discount_price)) /
          100 +
        deliveryCost[0];
    }
  }

  //주문 데이터 생성
  const orderInfo = {
    buyer_name,
    product_id,
    quantity,
    country_code,
    buyr_city,
    buyr_zipx,
    payment_amount,
    issued_coupon_id,
  };

  return await orderRepository.createOrder(orderInfo);
}
