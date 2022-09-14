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

  const selectedIssuedCoupons = await orderRepository.readIssuedCouponsById(
    issued_coupon_id
  );
  console.log('selectedIssuedCoupons!!!!!!!!!!!', selectedIssuedCoupons);
  if (!selectedIssuedCoupons) {
    const error = new Error('해당하는 쿠폰이 존재하지 않습니다.');
    error.statusCode = 404;
    throw error;
  }

  //return await couponRepository.createOrder(data);
}
