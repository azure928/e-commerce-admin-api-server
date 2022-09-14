import { db } from '../../database/models/index.js';
const Orders = db.orders;
const Products = db.products;
//import sequelize from 'sequelize';
import SQ from 'sequelize';
import { Op } from 'sequelize';
const Sequelize = SQ.Sequelize;

export async function readOrders(keyword, start, end) {
  console.log('keyword', keyword);
  let endDate = new Date();
  let startDate = new Date();

  if (start && !end) {
    startDate = new Date(start);
  } else if (!start && end) {
    endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 1);
    startDate.setDate(startDate.getDate() - 365);
  } else if (!start && !end) {
    startDate.setDate(startDate.getDate() - 365);
  } else if (start && end) {
    endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 1);
    startDate = new Date(start);
  }

  return await Orders.findAll({
    attributes: [
      ['id', '주문내역_id'],
      ['buyer_name', '주문자명'],
      ['pay_state', '결제상태'],
      ['delivery_status', '배송상태'],
      [Sequelize.col('product.name'), '상품명'],
      [Sequelize.col('product.price'), '상품가격'],
      ['quantity', '수량'],
      ['payment_amount', '결제금액'],
      ['createdAt', '주문일'],
    ],
    include: [
      {
        model: Products,
        as: 'product',
        attributes: [],
      },
    ],
    where: {
      [Op.or]: [
        {
          buyer_name: {
            [Op.like]: '%' + keyword + '%',
          },
        },
        {
          delivery_status: {
            [Op.like]: '%' + keyword + '%',
          },
        },
        {
          pay_state: {
            [Op.like]: '%' + keyword + '%',
          },
        },
      ],
      [Op.and]: [
        { createdAt: { [Op.lte]: endDate } },
        { createdAt: { [Op.gte]: startDate } },
      ],
    },
    order: [['createdAt', 'DESC']],
  });
}

export async function readOrderById(id) {
  return await Orders.findOne({
    attributes: ['id'],
    where: {
      id: id,
    },
  });
}

export const updateOrderById = async (id, delivery_status) => {
  return await Orders.update(
    {
      delivery_status: delivery_status,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
