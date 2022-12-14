import _sequelize from 'sequelize';
const DataTypes = _sequelize.DataTypes;
import _country_codes from './country_codes.js';
import _coupon_types from './coupon_types.js';
import _delivery_costs from './delivery_costs.js';
import _issued_coupons from './issued_coupons.js';
import _orders from './orders.js';
import _products from './products.js';
import _users from './users.js';

export default function initModels(sequelize) {
  const country_codes = _country_codes.init(sequelize, DataTypes);
  const coupon_types = _coupon_types.init(sequelize, DataTypes);
  const delivery_costs = _delivery_costs.init(sequelize, DataTypes);
  const issued_coupons = _issued_coupons.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  orders.belongsTo(country_codes, {
    as: 'country_code_country_code',
    foreignKey: 'country_code',
  });
  country_codes.hasMany(orders, { as: 'orders', foreignKey: 'country_code' });
  issued_coupons.belongsTo(coupon_types, {
    as: 'coupon_type',
    foreignKey: 'coupon_type_id',
  });
  coupon_types.hasMany(issued_coupons, {
    as: 'issued_coupons',
    foreignKey: 'coupon_type_id',
  });
  orders.belongsTo(issued_coupons, {
    as: 'issued_coupon',
    foreignKey: 'issued_coupon_id',
  });
  issued_coupons.hasMany(orders, {
    as: 'orders',
    foreignKey: 'issued_coupon_id',
  });
  orders.belongsTo(products, { as: 'product', foreignKey: 'product_id' });
  products.hasMany(orders, { as: 'orders', foreignKey: 'product_id' });
  issued_coupons.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
  users.hasMany(issued_coupons, {
    as: 'issued_coupons',
    foreignKey: 'user_id',
  });
  orders.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
  users.hasMany(orders, { as: 'orders', foreignKey: 'user_id' });

  return {
    country_codes,
    coupon_types,
    delivery_costs,
    issued_coupons,
    orders,
    products,
    users,
  };
}
