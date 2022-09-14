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
        buyer_name: {
          type: DataTypes.STRING(300),
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
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        issued_coupon_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'issued_coupon',
            key: 'id',
          },
        },
        buyer_city: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        buyer_country: {
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
            name: 'product_id',
            using: 'BTREE',
            fields: [{ name: 'product_id' }],
          },
          {
            name: 'issued_coupon_id',
            using: 'BTREE',
            fields: [{ name: 'issued_coupon_id' }],
          },
        ],
      }
    );
  }
}
