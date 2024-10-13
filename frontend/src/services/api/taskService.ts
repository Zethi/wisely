import { TaskDTO } from '@/types/dto/taskDTO';
import apiClient from './apiClientV1';
import { TaskResponse } from '@/types/response/taskResponse';


class TaskService {
  async getAllTasks(boardId: number, listId: number): Promise<TaskResponse[]> {
    const response = await apiClient.get(`/board/${boardId}/list/${listId}/task`);
    return response.data;
  }

  async getTaskById(boardId: number, listId: number, taskId: number): Promise<TaskResponse> {
    const response = await apiClient.get(`/board/${boardId}/list/${listId}/task/${taskId}`);
    return response.data;
  }

  async createTask(boardId: number, task: TaskDTO): Promise<TaskResponse> {
    const response = await apiClient.post(`/board/${boardId}/list/${task.list_id}/task`, task);
    return response.data;
  }

  async deleteTaskById(boardId: number, listId: number, taskId: number): Promise<TaskResponse> {
    const response = await apiClient.delete(`/board/${boardId}/list/${listId}/task/${taskId}`);
    return response.data;
  }

  async updateTaskById(boardId: number, listId: number, taskId: number, task: TaskDTO): Promise<TaskResponse> {
    const response = await apiClient.patch(`/board/${boardId}/list/${listId}/task/${taskId}`, task);
    return response.data;
  }
}

export default new TaskService();