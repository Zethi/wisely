import { BoardDTO } from '@/types/dto/boardDTO';
import apiClient from './apiClientV1';
import { BoardResponse } from '@/types/response/boardResponse';

class BoardService {
    async getAllBoards(): Promise<BoardResponse[]> {
        const response = await apiClient.get('/board');
        return response.data;
    }

    async getBoardById(id: number): Promise<BoardResponse> {
        const response = await apiClient.get(`/board/${id}`);
        return response.data;
    }

    async createBoard(board: BoardDTO) {
        const response = await apiClient.post('/board', board);
        return response.data;
    }

    async deleteBoardById(id: number): Promise<BoardResponse> {
        const response = await apiClient.delete(`/board/${id}`);
        return response.data;
    }

    async updateBoardById(id: number, board: BoardDTO): Promise<BoardResponse> {
        const response = await apiClient.patch(`/board/${id}`, board);
        return response.data;
    }
}

export default new BoardService();