import { Router } from "express";
import { createBoardController, deleteBoardByIdController, getAllBoardsController, getBoardByIdController, updateBoardByIdController } from "../controllers/board";
import { deleteListByIdController, getListByIdController, updateListByIdController, createListController, getAllListsController } from "../controllers/list";
import { createTaskController, deleteTaskByIdController, getAllTasksController, getTaskByIdController, updateTaskByIdController } from "../controllers/task";
import { createCommentController, deleteCommentByIdController, getAllCommentsController, getCommentByIdController, updateCommentByIdController } from "../controllers/comment";

export const boardRoutes = Router();

boardRoutes.get("/", getAllBoardsController);
boardRoutes.get("/:boardId", getBoardByIdController);
boardRoutes.post("/", createBoardController);
boardRoutes.delete("/:boardId", deleteBoardByIdController);
boardRoutes.patch("/:boardId", updateBoardByIdController);

// List Routes
boardRoutes.get("/:boardId/list", getAllListsController);
boardRoutes.get("/:boardId/list/:listId", getListByIdController);
boardRoutes.post("/:boardId/list", createListController);
boardRoutes.delete("/:boardId/list/:listId", deleteListByIdController);
boardRoutes.patch("/:boardId/list/:listId", updateListByIdController);

// Task Routes
boardRoutes.get("/:boardId/list/:listId/task", getAllTasksController);
boardRoutes.get("/:boardId/list/:listId/task/:taskId", getTaskByIdController);
boardRoutes.post("/:boardId/list/:listId/task", createTaskController);
boardRoutes.delete("/:boardId/list/:listId/task/:taskId", deleteTaskByIdController);
boardRoutes.patch("/:boardId/list/:listId/task/:taskId", updateTaskByIdController);

// Comment Routes
boardRoutes.get("/:boardId/list/:listId/task/:taskId/comment", getAllCommentsController);
boardRoutes.get("/:boardId/list/:listId/task/:taskId/comment/:commentId", getCommentByIdController);
boardRoutes.post("/:boardId/list/:listId/task/:taskId/comment", createCommentController);
boardRoutes.delete("/:boardId/list/:listId/task/:taskId/comment/:commentId", deleteCommentByIdController);
boardRoutes.patch("/:boardId/list/:listId/task/:taskId/comment/:commentId", updateCommentByIdController);