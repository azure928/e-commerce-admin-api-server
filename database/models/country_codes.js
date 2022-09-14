import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class country_codes extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        country_code: {
          type: DataTypes.STRING(100),
          allowNull: true,
          unique: 'unique_name',
        },
        country_dcode: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        country_name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'country_codes',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'unique_name',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'country_code' }],
          },
        ],
      }
    );
  }
}
