import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { priorityService } from "../../services/priority.service";
import httpStatus from "http-status";

export const updatePriorityByIdController = asyncHandler(async (request: Request, response: Response) => {
    const priorityId = parseInt(request.params.id);
    const newPriority = request.body;
    const updatedPriority = await priorityService.updateById(priorityId, newPriority);
    
    response.status(httpStatus.OK).send(updatedPriority);
});