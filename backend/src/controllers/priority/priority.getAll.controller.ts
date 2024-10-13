import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { priorityService } from "../../services/priority.service";
import httpStatus from "http-status";

export const getAllPrioritysController = asyncHandler(async (request: Request, response: Response) => {
    const allPriorities = await priorityService.getAll();
    
    response.status(httpStatus.OK).send(allPriorities);
});