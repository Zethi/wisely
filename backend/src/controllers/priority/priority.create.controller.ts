import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { priorityService } from "../../services/priority.service";
import httpStatus from "http-status";

export const createPriorityController = asyncHandler(async (request: Request, response: Response) => {
    const newPriority = await priorityService.create(request.body);
    response.status(httpStatus.CREATED).send(newPriority);
});