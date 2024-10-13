import httpStatus from "http-status";
import { PriorityDTO } from "../types/dto/priority.dto";
import PriorityModel from "../models/priority.model";


class PriorityService {

    public async getAll() {
        return await PriorityModel.findAll();
    }

    public async getById(id: number) {
        const priority = await PriorityModel.findByPk(id);
    
        if (!priority) {
            const error = new Error(`Priority with id ${id} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }
    
        return priority;
    }

    public async create(priority: PriorityDTO) {
        return await PriorityModel.create({ ...priority });
    }

    public async updateById(id: number, updatedPriority: PriorityDTO) {
        const priority = await PriorityModel.findByPk(id);
    
        if (!priority) {
            const error = new Error(`Priority with id ${id} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }
    
        await priority.update({ ...updatedPriority });
        return priority;
    }

    public async deleteById(priorityId: number) {
        const priorityToDelete = await PriorityModel.findOne({ where: { id: priorityId }});
    
        if (!priorityToDelete) {
            const error = new Error(`Priority with id ${priorityId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }

        await priorityToDelete.destroy();
    
        return priorityToDelete;
    }
}

export const priorityService = new PriorityService();