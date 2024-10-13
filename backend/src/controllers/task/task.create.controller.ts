import { Request, Response } from "express";
import asyncHandler from "../../handlers/asyncHandler";
import httpStatus from "http-status";
import { taskService } from "../../services/task.service";

export const createTaskController = asyncHandler(async (request: Request, response: Response) => {
    const listId = parseInt(request.params.listId);
    const taskToCreate = { ...request.body, list_id: listId, };
    const createdTask = await taskService.create(taskToCreate)

    response.status(httpStatus.CREATED).send(createdTask);
});