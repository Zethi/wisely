import httpStatus from "http-status";
import CommentModel from "../models/comment.model";
import { CommentDTO } from "../types/dto/comment.dto";


class CommentService {

    public async getAll(boardId: number, listId: number, taskId: number) {
        return await CommentModel.findAll({
            where: { board_id: boardId, list_id: listId, task_id: taskId }
        });
    }

    public async getById(boardId: number, listId: number, taskId: number, commentId: number) {
        const commentFound = await CommentModel.findOne({
            where: { board_id: boardId, list_id: listId, task_id: taskId, id: commentId }
        });

        if (!commentFound) {
            const error = new Error(`Comment with id ${commentId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }

        return commentFound;
    }

    public async create(comment: CommentDTO) {
        return await CommentModel.create({ ...comment });
    }

    public async update(boardId: number, listId: number, taskId: number, commentId: number, updatedComment: CommentDTO) {
        const commentToUpdate = await CommentModel.findOne({
            where: { board_id: boardId, list_id: listId, task_id: taskId, id: commentId }
        });

        if (!commentToUpdate) {
            const error = new Error(`Comment with id ${commentId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }

        await commentToUpdate.update({ ...updatedComment });
        return commentToUpdate;
    }

    public async deleteById(boardId: number, listId: number, taskId: number, commentId: number) {
        const commentToDelete = await CommentModel.findOne({
            where: { board_id: boardId, list_id: listId, task_id: taskId, id: commentId }
        });

        if (!commentToDelete) {
            const error = new Error(`Comment with id ${commentId} not found`);
            (error as any).statusCode = httpStatus.NOT_FOUND;
            throw error;
        }

        await commentToDelete.destroy();

        return commentToDelete;
    }
}

export const commentService = new CommentService();