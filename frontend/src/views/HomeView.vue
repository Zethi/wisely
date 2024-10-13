<template>
  <div class="p-12">
    <div class="flex justify-between flex-wrap mb-8 gap-8 md:gap-0">
      <h1 class="font-bold text-4xl">Tableros</h1>
      <div>
        <Button label="Crear nuevo tablero" bg-color="bg-wisely-blue" hover-color="hover:bg-wisely-dark"
          @click="openModal" />
        <CreateBoardModalComponent :isOpen="isModalOpen" @close="closeModal" @boardCreated="fetchBoards" />
      </div>
    </div>
    <div class="flex gap-4 flex-wrap justify-center md:justify-start">
      <Board v-for="board in boards" :key="board.id" :board="board" @delete="removeBoard" @update="updateBoardName" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Board from '@/components/common/BoardComponent.vue';
import Button from '@/components/common/ButtonComponent.vue';
import CreateBoardModalComponent from '@/components/common/modals/CreateBoardModalComponent.vue';

import { BoardResponse } from '@/types/response/boardResponse';
import boardService from '@/services/api/boardService';

const isModalOpen = ref(false);
const boards = ref<BoardResponse[]>([]);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const fetchBoards = async () => {
  try {
    boards.value = await boardService.getAllBoards();
  } catch (error) {
    console.error('Error fetching boards:', error);
  }
};

const removeBoard = (id: number) => {
  boards.value = boards.value.filter(board => board.id !== id);
};
const updateBoardName = (updatedBoard: BoardResponse) => {
  const boardIndex = boards.value.findIndex(board => board.id === updatedBoard.id);
  if (boardIndex !== -1) {
    boards.value[boardIndex].name = updatedBoard.name;
  }
};

onMounted(fetchBoards);
</script>