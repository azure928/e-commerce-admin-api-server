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
