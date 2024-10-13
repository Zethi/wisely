import { Request, Response } from "express";
import httpStatus from "http-status";
import { boardService } from "../../services/board.service";
import asyncHandler from "../../handlers/asyncHandler";

export const getAllBoardsController = asyncHandler(async (request: Request, response: Response) => {
    const allBoards = await boardService.getAll();

    response.status(httpStatus.OK).send(allBoards);
});