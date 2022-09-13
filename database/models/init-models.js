import _sequelize from 'sequelize';
const DataTypes = _sequelize.DataTypes;
import _country_code from './country_code.js';
import _coupon_types from './coupon_types.js';
import _delivery_cost from './delivery_cost.js';
import _issued_coupon from './issued_coupon.js';
import _orders from './orders.js';
import _products from './products.js';

export default function initModels(sequelize) {
  const country_code = _country_code.init(sequelize, DataTypes);
  const coupon_types = _coupon_types.init(sequelize, DataTypes);
  const delivery_cost = _delivery_cost.init(sequelize, DataTypes);
  const issued_coupon = _issued_coupon.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);

  issued_coupon.belongsTo(coupon_types, {
    as: 'coupon_type',
    foreignKey: 'coupon_type_id',
  });
  coupon_types.hasMany(issued_coupon, {
    as: 'issued_coupons',
    foreignKey: 'coupon_type_id',
  });
  orders.belongsTo(issued_coupon, {
    as: 'issued_coupon',
    foreignKey: 'issued_coupon_id',
  });
  issued_coupon.hasMany(orders, {
    as: 'orders',
    foreignKey: 'issued_coupon_id',
  });
  orders.belongsTo(products, { as: 'products', foreignKey: 'product_id' });
  products.hasMany(orders, { as: 'orders', foreignKey: 'product_id' });

  return {
    country_code,
    coupon_types,
    delivery_cost,
    issued_coupon,
    orders,
    products,
  };
}
