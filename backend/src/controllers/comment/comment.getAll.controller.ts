import { Request, Response } from "express";
import { commentService } from "../../services/comment.service";
import httpStatus from "http-status";
import asyncHandler from "../../handlers/asyncHandler";

export const getAllCommentsController = asyncHandler(async (request: Request, response: Response) =>{
    const boardId = parseInt(request.params.boardId);
    const listId = parseInt(request.params.listId);
    const taskId = parseInt(request.params.taskId);

    const allComments = commentService.getAll(boardId, listId, taskId);

    response.status(httpStatus.OK).send(allComments);
});