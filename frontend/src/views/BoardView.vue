<template>
    <div v-if="board">
        <div class="p-12">
            <div class="flex items-center flex-wrap justify-between">
                <div class="flex flex-row text-2xl">
                    Visualizando tablero:&nbsp;<h1 class="font-bold">{{ board.name }}</h1>
                </div>

                <ButtonComponent label="Crear nueva lista" bg-color="bg-wisely-blue" hover-color="hover:bg-wisely-dark"
                    @click="openModal" />
            </div>

            <div v-if="lists.length > 0" class="mt-8 flex w-full flex-nowrap gap-4 overflow-x-scroll">
                <TaskListComponent v-for="list in lists" :key="list.id" :list="list" :tasks="tasksByList[list.id]"
                    :priorities="priorities" @delete-list="getLists" class="min-w-[300px] sm:min-w-[400px] md:min-w-[600px]" />
            </div>
            <div v-else class="flex items-center justify-center h-64">
                <p class="text-3xl font-bold text-gray-600">No hay listas disponibles en este tablero.</p>
            </div>
        </div>

        <ModalComponent :isOpen="isModalOpen" @close="closeModal">
            <template #default>
                <div class="w-80">
                    <div>
                        <h2 class="text-xl font-bold mb-4">Crear nueva lista</h2>
                        <input v-model="newListName" type="text" placeholder="Nombre de la lista"
                            class="p-2 w-full border border-gray-300 rounded-lg" :class="{ 'border-red-500': nameError }" />
                        <p v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</p>
                    </div>
                    <div class="flex justify-end gap-4">
                        <ButtonComponent @click="createList" class="mt-4 bg-wisely-blue text-white py-2 px-4 rounded"
                            label="Crear" bg-color="bg-wisely-blue" hover-color="hover:bg-wisely-dark" />
                    </div>
                </div>
            </template>
        </ModalComponent>
    </div>
    <div v-else class="flex items-center justify-center h-screen">
        <svg class="animate-spin h-12 w-12 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"></path>
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import boardService from '@/services/api/boardService';
import listService from '@/services/api/listService';
import taskService from '@/services/api/taskService';
import { BoardResponse } from '@/types/response/boardResponse';
import TaskListComponent from '@/components/common/TaskListComponent.vue';
import { ListResponse } from '@/types/response/listResponse';
import { TaskResponse } from '@/types/response/taskResponse';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import ModalComponent from '@/components/common/ModalComponent.vue';
import { ListDTO } from '@/types/dto/listDTO';
import { PriorityResponse } from '@/types/response/priorityResponse';
import priorityService from '@/services/api/priorityService';

export default defineComponent({
    name: 'BoardView',
    components: {
        TaskListComponent,
        ButtonComponent,
        ModalComponent,
    },
    setup() {
        const route = useRoute();
        const board = ref<BoardResponse>();
        const lists = ref<ListResponse[]>([]);
        const tasksByList = ref<{ [key: number]: TaskResponse[] }>({});
        const isModalOpen = ref(false);
        const priorities = ref<PriorityResponse[]>([]);
        const newListName = ref('');
        const nameError = ref('');

        onMounted(async () => {
            const boardId = route.params.id as unknown as number;

            try {
                priorities.value = await priorityService.getAllPriorities();
            } catch (error) {
                console.error('Error al obtener las prioridades:', error);
            }

            try {
                const response = await boardService.getBoardById(boardId);
                board.value = response as BoardResponse;

                await getAllLists();

                for (const list of lists.value) {
                    const tasks: TaskResponse[] = await taskService.getAllTasks(boardId, list.id);
                    tasksByList.value[list.id] = tasks;
                }
            } catch (error) {
                console.error('Error al obtener el tablero o las listas:', error);
            }
        });

        const getAllLists = async () => {
            try {
                const boardId = route.params.id as unknown as number;
                lists.value = await listService.getAllLists(boardId);
            } catch (error) {
                console.error('Error al obtener las listas:', error);
            }
        };

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            newListName.value = '';
            nameError.value = '';
        };

        const createList = async () => {
            nameError.value = '';
            if (!newListName.value.trim()) {
                nameError.value = "El nombre de la lista es obligatorio.";
                return;
            }
            if (newListName.value.length > 50) {
                nameError.value = "El nombre de la lista no puede tener más de 50 caracteres.";
                return;
            }

            const boardId = route.params.id as unknown as number;
            try {
                const newList = await listService.createList(boardId, { name: newListName.value } as ListDTO);
                lists.value.push(newList);
                closeModal();
            } catch (error) {
                console.error('Error creando la lista:', error);
            }
        };

        return {
            board,
            lists,
            tasksByList,
            isModalOpen,
            newListName,
            nameError,
            openModal,
            closeModal,
            createList,
            getLists: getAllLists,
            priorities
        };
    },
});
</script>