import { PriorityDTO } from '@/types/dto/priorityDTO';
import apiClient from './apiClientV1';

class PriorityService {
  async getAllPriorities() {
    const response = await apiClient.get('/priority');
    return response.data;
  }

  async getPriorityById(id: number) {
    const response = await apiClient.get(`/priority/${id}`);
    return response.data;
  }

  async createPriority(priority: PriorityDTO) {
    const response = await apiClient.post('/priority', priority);
    return response.data;
  }

  async deletePriorityById(id: number) {
    const response = await apiClient.delete(`/priority/${id}`);
    return response.data;
  }

  async updatePriorityById(id: number, priority: PriorityDTO) {
    const response = await apiClient.patch(`/priority/${id}`, priority);
    return response.data;
  }
}

export default new PriorityService();
