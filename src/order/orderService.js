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
