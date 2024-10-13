import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { listService } from "../../services/list.service";
import httpStatus from "http-status";

export const deleteListByIdController = asyncHandler(async (request: Request, response: Response) => {
    const boardId = parseInt(request.params.boardId);
    const listId = parseInt(request.params.listId);

    const deletedList = await listService.deleteListById(boardId, listId);

    response.status(httpStatus.OK).send(deletedList);
});