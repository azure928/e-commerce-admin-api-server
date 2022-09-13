import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class coupon_types extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        type: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        discount_amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        coupon_code: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'coupon_types',
        timestamps: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
  }
}
