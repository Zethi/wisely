import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/sequelize';
import TaskModel from './task.model';

export class CommentModel extends Model { }

CommentModel.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'comment',
    tableName: 'Comment',
    timestamps: true,
    underscored: true,
  }
);

TaskModel.hasMany(CommentModel, { onDelete: 'CASCADE' });
CommentModel.belongsTo(TaskModel, { foreignKey: 'task_id' });

export default CommentModel;