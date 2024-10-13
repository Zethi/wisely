import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { listService } from "../../services/list.service";
import httpStatus from "http-status";

export const createListController = asyncHandler(async (request: Request, response: Response) => {
    const boardId = parseInt(request.params.boardId);
    const newList = { ...request.body, board_id: boardId };

    const createdList = await listService.createList(newList);

    response.status(httpStatus.CREATED).send(createdList);
});