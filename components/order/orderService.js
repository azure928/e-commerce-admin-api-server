import * as orderRepository from './orderRepository.js';

export async function readOrders() {
  const selectedOrders = await orderRepository.readOrders();

  if (selectedOrders.length == 0) {
    const error = new Error();
    error.statusCode = 204;
    throw error;
  } else {
    return selectedOrders;
  }
}
