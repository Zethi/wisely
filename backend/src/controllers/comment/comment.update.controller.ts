import { Request, Response } from "express";
import httpStatus from "http-status";
import { commentService } from "../../services/comment.service";
import asyncHandler from "../../handlers/asyncHandler";

export const updateCommentByIdController = asyncHandler(async (request: Request, response: Response) => {
    const boardId = parseInt(request.params.boardId);
    const listId = parseInt(request.params.listId);
    const taskId = parseInt(request.params.taskId);
    const commentId = parseInt(request.params.commentId);

    const updatedComment = commentService.update(boardId, listId, taskId, commentId, request.body);

    response.status(httpStatus.OK).send(updatedComment);
});