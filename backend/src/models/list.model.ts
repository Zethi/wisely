import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../config/sequelize';
import BoardModel from './board.model';

class ListModel extends Model {
    public id!: number;
    public index!: number;
    public name!: string;
    public order!: number;
    public board_id!: number;
}

ListModel.init(
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
        board_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: BoardModel,
                key: 'id',
            },
        },
    },
    {
        sequelize: sequelizeConnection,
        modelName: 'list',
        tableName: 'List',
        timestamps: false,
        underscored: true,
        hooks: {
            async beforeCreate(list) {
                const lastList = await ListModel.findOne({
                    order: [['order', 'DESC']],
                    where: { board_id: list.board_id },
                });

                const newOrder = list.order ? list.order : lastList ? lastList.order + 1 : 0;
                list.order = newOrder
            },
        },
    },
);

BoardModel.hasMany(ListModel, { onDelete: 'CASCADE' });
ListModel.belongsTo(BoardModel, { foreignKey: 'board_id' });

export default ListModel;
