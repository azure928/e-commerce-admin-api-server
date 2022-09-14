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
