import { CommentDTO } from '@/types/dto/commentDTO';
import apiClient from './apiClientV1';
import { CommentResponse } from '@/types/response/commentResponse';

class CommentService {
  async getAllComments(boardId: number, listId: number, taskId: number): Promise<CommentResponse[]> {
    const response = await apiClient.get(`/board/${boardId}/list/${listId}/task/${taskId}/comment`);
    return response.data;
  }

  async getCommentById(boardId: number, listId: number, taskId: number, commentId: number): Promise<CommentResponse> {
    const response = await apiClient.get(`/board/${boardId}/list/${listId}/task/${taskId}/comment/${commentId}`);
    return response.data;
  }

  async createComment(boardId: number, listId: number, taskId: number, comment: CommentDTO): Promise<CommentResponse> {
    const response = await apiClient.post(`/board/${boardId}/list/${listId}/task/${taskId}/comment`, comment);
    return response.data;
  }

  async deleteCommentById(boardId: number, listId: number, taskId: number, commentId: number): Promise<CommentResponse> {
    const response = await apiClient.delete(`/board/${boardId}/list/${listId}/task/${taskId}/comment/${commentId}`);
    return response.data;
  }

  async updateCommentById(boardId: number, listId: number, taskId: number, commentId: number, comment: CommentDTO): Promise<CommentResponse> {
    const response = await apiClient.patch(`/board/${boardId}/list/${listId}/task/${taskId}/comment/${commentId}`, comment);
    return response.data;
  }
}

export default new CommentService();
