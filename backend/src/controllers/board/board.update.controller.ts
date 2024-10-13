import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { boardService } from "../../services/board.service";
import httpStatus from "http-status";

export const updateBoardByIdController = asyncHandler(async (request: Request, response: Response) => {
    const boardId = parseInt(request.params.boardId);
    const boardObtained = await boardService.updateById(boardId, request.body);

    response.status(httpStatus.OK).send(boardObtained);
});