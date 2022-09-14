import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class issued_coupons extends Model {
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
        coupon_type_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'coupon_types',
            key: 'id',
          },
        },
        is_used: {
          type: DataTypes.STRING(100),
          allowNull: false,
          defaultValue: '미사용',
        },
        discounted_amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: 'issued_coupons',
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
            name: 'coupon_type_id',
            using: 'BTREE',
            fields: [{ name: 'coupon_type_id' }],
          },
        ],
      }
    );
  }
}
