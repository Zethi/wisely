import httpStatus from "http-status";
import { TaskDTO } from "../types/dto/task.dto";
import TaskModel from "../models/task.model";


class TaskService {

    public async getAll(listId: number) {
        return await TaskModel.findAll({ where: { list_id: listId }});
    }

    public async getById(listId: number, taskId: number) {
        const taskFound = await TaskModel.findOne({
            where: { list_id: listId, id: taskId }
        });
    
        if (!taskFound) {
            const error = new Error(`Task with id ${taskId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }
    
        return taskFound;
    }

    public async create(task: TaskDTO) {
        return await TaskModel.create({ ...task });
    }

    public async updateById(listId: number, taskId: number, updatedList: TaskDTO) {
        const listToUpdate = await TaskModel.findOne({where: { list_id: listId, id: taskId }});
    
        if (!listToUpdate) {
            const error = new Error(`Task with id ${taskId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }
    
        await listToUpdate.update({ ...updatedList });
        return listToUpdate;
    }

    public async deleteListById(listId: number, taskId: number) {
        const taskToDelete = await TaskModel.findOne({where: { list_id: listId, id: taskId }});

        if (!taskToDelete) {
            const error = new Error(`Task with id ${taskId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }

        await taskToDelete.destroy();
    
        return taskToDelete;
    }
}

export const taskService = new TaskService();