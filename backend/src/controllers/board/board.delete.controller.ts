import { Request, Response } from "express";
import { boardService } from "../../services/board.service";
import httpStatus from "http-status";
import asyncHandler from "../../handlers/asyncHandler";

export const deleteBoardByIdController = asyncHandler(async (request: Request, response: Response) => {
    const boardId = parseInt(request.params.boardId);
    await boardService.deleteById(boardId);

    response.status(httpStatus.NO_CONTENT).send();
});