import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import httpStatus from "http-status";
import { boardService } from "../../services/board.service";

export const createBoardController = asyncHandler(async (request: Request, response: Response) => {
    const newBoard = await boardService.create(request.body);
    response.status(httpStatus.CREATED).send(newBoard);
});