import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/sequelize';

export class PriorityModel extends Model { }

PriorityModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' },
        max: 15,
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'priority',
    tableName: 'Priority',
    underscored: true,
    timestamps: false,
  }
);

export default PriorityModel;