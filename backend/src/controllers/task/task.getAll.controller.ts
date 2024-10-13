import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { taskService } from "../../services/task.service";
import httpStatus from "http-status";

export const getAllTasksController = asyncHandler(async (request: Request, response: Response) => {
    const listId = parseInt(request.params.listId);
    
    const allTasks = await taskService.getAll(listId);
    console.log(allTasks);

    response.status(httpStatus.OK).send(allTasks);
});