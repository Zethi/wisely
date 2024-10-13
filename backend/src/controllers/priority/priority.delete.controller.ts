import { Request, Response } from "express";
import httpStatus from "http-status";
import { priorityService } from "../../services/priority.service";
import asyncHandler from "../../handlers/asyncHandler";

export const deletePriorityByIdController = asyncHandler(async (request: Request, response: Response) => {
    const priorityId = parseInt(request.params.id);
    const deletedPriority = await priorityService.deleteById(priorityId);

    response.status(httpStatus.OK).send(deletedPriority);
});