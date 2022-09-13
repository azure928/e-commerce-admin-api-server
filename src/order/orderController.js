import * as orderService from './orderService.js';

export const readOrders = async (req, res) => {
  try {
    const { keyword, start, end } = req.query;

    const selectedOrders = await orderService.readOrders(keyword, start, end);
    res.status(200).json(selectedOrders);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};

export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { delivery_status } = req.body;

    await orderService.updateOrder(id, delivery_status);
    return res.status(201).json({ message: '제품 배송 상태 업데이트 성공' });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
};
