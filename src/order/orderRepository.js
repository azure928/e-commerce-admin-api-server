import { db } from '../../database/models/index.js';
const orders = db.orders;
import sequelize from 'sequelize';
const Op = sequelize.Op;

export async function readOrders() {
  return await orders.findAll({});
}
