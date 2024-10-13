import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { taskService } from "../../services/task.service";
import httpStatus from "http-status";

export const deleteTaskByIdController = asyncHandler(async (request: Request, response: Response) => {
    const listId = parseInt(request.params.listId);
    const taskId = parseInt(request.params.taskId);
    
    const deletedTask = await taskService.deleteListById(listId, taskId);

    response.status(httpStatus.OK).send(deletedTask);
});