import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { commentService } from "../../services/comment.service";
import httpStatus from "http-status";

export const createCommentController = asyncHandler(async (request: Request, response: Response) => {
    const boardId = parseInt(request.params.boardId);
    const listId = parseInt(request.params.listId);
    const taskId = parseInt(request.params.taskId);

    const commentToCreate = { ...request.body, board_id: boardId, list_id: listId, task_id: taskId };
    const createdComment = await commentService.create(commentToCreate);

    response.status(httpStatus.CREATED).send(createdComment);
});