import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import { taskService } from "../../services/task.service";
import httpStatus from "http-status";

export const updateTaskByIdController = asyncHandler(async (request: Request, response: Response) => {
    const listId = parseInt(request.params.listId);
    const taskId = parseInt(request.params.taskId);
    
    const newTask = { ...request.body };

    const updatedTask = await taskService.updateById(listId, taskId, newTask);

    response.status(httpStatus.OK).send(updatedTask);
});