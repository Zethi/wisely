import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { listService } from "../../services/list.service";
import httpStatus from "http-status";

export const updateListByIdController = asyncHandler(async (request: Request, response: Response) => {
    const boardId = parseInt(request.params.boardId);
    const listId = parseInt(request.params.listId);
    const updatedList = await listService.updateList(boardId, listId, request.body);

    response.status(httpStatus.OK).send(updatedList);
});