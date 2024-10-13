import httpStatus from "http-status";
import ListModel from "../models/list.model";
import { ListDTO } from "../types/dto/list.dto";


class ListService {

    public async getAllList(boardId: number) {
        return await ListModel.findAll({ where: { board_id: boardId } });
    }

    public async getListById(boardId: number, listId: number) {
        const list = await ListModel.findOne({
            where: { board_id: boardId, id: listId }
        });
    
        if (!list) {
            const error = new Error(`List with id ${listId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }
    
        return list;
    }

    public async createList(list: ListDTO) {
        return await ListModel.create({ ...list });
    }

    public async updateList(boardId: number, listId: number, updatedList: ListDTO) {
        const listToUpdate = await ListModel.findOne({where: { board_id: boardId, id: listId }});
    
        if (!listToUpdate) {
            const error = new Error(`List with id ${listId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }
    
        await listToUpdate.update({ ...updatedList });
        return listToUpdate;
    }

    public async deleteListById(boardId: number, listId: number) {
        const listToDelete = await ListModel.findOne({where: { board_id: boardId, id: listId }});

        if (!listToDelete) {
            const error = new Error(`List with id ${listId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }

        await listToDelete.destroy();
    
        return listToDelete;
    }
}

export const listService = new ListService();