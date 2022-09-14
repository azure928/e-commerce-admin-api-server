import * as orderRepository from './orderRepository.js';

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

  const selectedProduct = await orderRepository.readProductById(product_id);
  if (!selectedProduct) {
    const error = new Error('해당하는 상품이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }

  const selectedCountry = await orderRepository.readCountryNameByCode(
    country_code
  );
  //console.log('selectedCountry!!!!!!!!!!!', selectedCountry);
  if (!selectedCountry) {
    const error = new Error('해당하는 국가가 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }

  const country_name = selectedCountry.country_name;

  const deliveryCost = await orderRepository.readDeliveryCost(
    quantity,
    country_name
  );
  //console.log('배송비 확인!!!!!!!!!', deliveryCost[0]);

  let payment_amount;

  if (!issued_coupon_id) {
    console.log('쿠폰없음');
    payment_amount = selectedProduct.price * quantity + deliveryCost[0];
    //console.log('상품가격!!', selectedProduct.price);
    //console.log('수량!!', quantity);
    //console.log('배송비', deliveryCost[0]);
    //console.log('결제 금액!!', payment_amount);
  } else {
    console.log('쿠폰있음');
    const selectedIssuedCoupons = await orderRepository.readIssuedCouponById(
      issued_coupon_id
    );

    //console.log('selectedIssuedCoupons!!!!!!!!!!!', selectedIssuedCoupons);
    if (!selectedIssuedCoupons) {
      const error = new Error('입력하신 쿠폰이 존재하지 않습니다.');
      error.statusCode = 404;
      throw error;
    }

    const couponType = await orderRepository.readCouponTypeById(
      selectedIssuedCoupons.coupon_type_id
    );

    //console.log('쿠폰타입', couponType.type);
    //console.log('할인가격', couponType.discount_price);

    if (couponType.type == 'delivery') {
      payment_amount =
        selectedProduct.price * quantity +
        deliveryCost[0] -
        couponType.discount_price;
    }
  }

  //return await couponRepository.createOrder(data);
}
