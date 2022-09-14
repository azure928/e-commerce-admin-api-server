import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orders extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        buyer_name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        pay_state: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: '결제완료',
        },
        delivery_status: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: '배송대기',
        },
        delivery_num: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        payment_amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        issued_coupon_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'issued_coupons',
            key: 'id',
          },
        },
        country_code: {
          type: DataTypes.STRING(300),
          allowNull: true,
          references: {
            model: 'country_codes',
            key: 'country_code',
          },
        },
        buyer_city: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        buyer_zipx: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        vccode: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'orders',
        timestamps: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'user_id',
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
          {
            name: 'product_id',
            using: 'BTREE',
            fields: [{ name: 'product_id' }],
          },
          {
            name: 'issued_coupon_id',
            using: 'BTREE',
            fields: [{ name: 'issued_coupon_id' }],
          },
          {
            name: 'country_code',
            using: 'BTREE',
            fields: [{ name: 'country_code' }],
          },
        ],
      }
    );
  }
}
