import { Request, Response } from "express";
import { commentService } from "../../services/comment.service";
import httpStatus from "http-status";
import asyncHandler from "../../handlers/asyncHandler";

export const deleteCommentByIdController = asyncHandler(async (request: Request, response: Response) =>{
    const boardId = parseInt(request.params.boardId);
    const listId = parseInt(request.params.listId);
    const taskId = parseInt(request.params.taskId);
    const commentId = parseInt(request.params.commentId);

    const commentDeleted = commentService.deleteById(boardId, listId, taskId, commentId);

    response.status(httpStatus.OK).send(commentDeleted);
});