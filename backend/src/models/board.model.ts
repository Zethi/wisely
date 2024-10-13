import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/sequelize';

class BoardModel extends Model {
  public order!: number;
}

BoardModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' },
        max: 50,
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'board',
    tableName: 'Board',
    timestamps: false,
    underscored: true,
    hooks: {
      async beforeCreate(board) {
        const lastBoard = await BoardModel.findOne({
          order: [['order', 'DESC']],
        });
        board.order = lastBoard ? lastBoard.order + 1 : 0;
      },
    },
  }
);

export default BoardModel;