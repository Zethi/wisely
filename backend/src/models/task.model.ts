import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/sequelize';
import ListModel from './list.model';
import PriorityModel from './priority.model';

class TaskModel extends Model {
    public id!: number;
    public name!: string;
    public description?: string;
    public order!: number;
    public list_id!: number;
    public priority_id!: number;
    public deletedAt?: Date | null;

    async softDelete() {
        this.deletedAt = new Date();
        await this.save();
        
        setTimeout(async () => {
            const task = await TaskModel.findByPk(this.id);
            if (task!.deletedAt) {
                await task!.destroy();
            }
        }, 30000);
    }

    async restoreFromDelete() {
        this.deletedAt = null;
        await this.save();
    }
}

TaskModel.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Name is required' },
                max: 50,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 0,
            },
        },
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ListModel,
                key: 'id',
            },
        },
        priority_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PriorityModel,
                key: 'id',
            },
        },
    },
    {
        sequelize: sequelizeConnection,
        modelName: 'task',
        tableName: 'Task',
        timestamps: true,
        underscored: true,
        hooks: {
            async beforeCreate(task) {
                if (task.list_id) {
                    const lastTask = await TaskModel.findOne({
                        order: [['order', 'DESC']],
                        where: { list_id: task.list_id },
                    });
        
                    const newOrder = lastTask ? lastTask.order + 1 : 0;
                    task.order = newOrder;
                } else {
                    task.order = 0;
                }
            },
        },
    }
);

ListModel.hasMany(TaskModel, { onDelete: 'CASCADE' });
TaskModel.belongsTo(ListModel, { foreignKey: 'list_id' });
TaskModel.belongsTo(PriorityModel, { foreignKey: 'priority_id' });

export default TaskModel;