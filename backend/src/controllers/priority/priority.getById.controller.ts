import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { priorityService } from "../../services/priority.service";
import httpStatus from "http-status";

export const getPrioriyByIdController = asyncHandler(async (request: Request, response: Response) => {
    const priorityId = parseInt(request.params.id);
    const priority = await priorityService.getById(priorityId);
    
    response.status(httpStatus.OK).send(priority);
});