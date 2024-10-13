import apiClient from './apiClientV1';
import { ListDTO } from '@/types/dto/listDTO';
import { ListResponse } from '@/types/response/listResponse';

class ListService {
  async getAllLists(boardId: number): Promise<ListResponse[]> {
    const response = await apiClient.get(`/board/${boardId}/list`);
    return response.data;
  }

  async getListById(boardId: number, listId: number): Promise<ListResponse> {
    const response = await apiClient.get(`/board/${boardId}/list/${listId}`);
    return response.data;
  }

  async createList(boardId: number, list: ListDTO): Promise<ListResponse> {
    const response = await apiClient.post(`/board/${boardId}/list`, list);
    return response.data;
  }

  async deleteListById(boardId: number, listId: number): Promise<ListResponse> {
    const response = await apiClient.delete(`/board/${boardId}/list/${listId}`);
    return response.data;
  }

  async updateListById(boardId: number, listId: number, list: ListDTO): Promise<ListResponse> {
    const response = await apiClient.patch(`/board/${boardId}/list/${listId}`, list);
    return response.data;
  }
}

export default new ListService();