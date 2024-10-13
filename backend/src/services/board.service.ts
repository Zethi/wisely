import httpStatus from "http-status";
import BoardModel from "../models/board.model";
import { BoardDTO } from "../types/dto/board.dto";


class BoardService {

    public async getAll() {
        return await BoardModel.findAll();
    }

    public async getById(id: number) {
        const board = await BoardModel.findByPk(id);
    
        if (!board) {
            const error = new Error(`Board with id ${id} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }
    
        return board;
    }

    public async create(board: BoardDTO) {
        return await BoardModel.create({ ...board });
    }

    public async updateById(id: number, updatedBoard: BoardDTO) {
        const board = await BoardModel.findByPk(id);
    
        if (!board) {
            const error = new Error(`Board with id ${id} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }
    
        await board.update({ ...updatedBoard });
        return board;
    }

    public async deleteById(boardId: number) {
        const boardToDelete = await BoardModel.findOne({ where: { id: boardId }});
    
        if (!boardToDelete) {
            const error = new Error(`Board with id ${boardId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }

        await boardToDelete.destroy();
    
        return boardToDelete;
    }
}

export const boardService = new BoardService();