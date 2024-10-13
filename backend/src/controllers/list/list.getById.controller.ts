import { Request, Response } from "express";
import { listService } from "../../services/list.service";
import httpStatus from "http-status";
import asyncHandler from "../../handlers/asyncHandler";

export const getListByIdController = asyncHandler(async (request: Request, response: Response) => {
    const boardId = parseInt(request.params.boardId);
    const listId = parseInt(request.params.listId);
    const listObtained = await listService.getListById(boardId, listId);

    response.status(httpStatus.OK).send(listObtained);
});