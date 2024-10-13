<template>
  <Modal :isOpen="isOpen" @close="close">
    <div class="md:w-80">
      <h2 class="text-lg font-semibold">Crear tablero</h2>
      <input type="text" v-model="boardName" placeholder="Introduce el nombre"
        :class="['border rounded-md p-2 mt-4 w-full', { 'border-red-500': errorMessage }]" />
      <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
      <div class="flex justify-end mt-4 gap-3">
        <ButtonComponent @click="close" label="Cancelar" bg-color="bg-wisely-blue" hover-color="hover:bg-wisely-dark" />
        <ButtonComponent @click="createBoard" label="Crear" bg-color="bg-wisely-blue"
          hover-color="hover:bg-wisely-dark" />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import Modal from '../ModalComponent.vue';
import ButtonComponent from '../ButtonComponent.vue';
import boardService from '@/services/api/boardService';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'boardCreated']);

const boardName = ref('');
const errorMessage = ref('');

const close = () => {
  boardName.value = '';
  errorMessage.value = '';
  emit('close');
};

const createBoard = async () => {
  if (!boardName.value) {
    errorMessage.value = 'El nombre del tablero es obligatorio.';
    return;
  }

  if (boardName.value.length > 50) {
    errorMessage.value = 'El nombre del tablero no puede exceder los 50 caracteres.';
    return;
  }

  await boardService.createBoard({ name: boardName.value });
  emit('boardCreated');
  close();
};

watch(boardName, (newVal) => {
  if (newVal && errorMessage.value && newVal.length <= 50) {
    errorMessage.value = '';
  }
});
</script>