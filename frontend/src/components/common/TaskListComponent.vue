<template>
    <div class="flex flex-col space-y-4">
        <div class="bg-wisely-dark text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
            <div v-if="isEditing" class="flex gap-6 justify-between w-full">
                <div class="flex flex-col">
                    <input v-model="editedListName" type="text"
                        class="border border-gray-300 px-2 rounded-lg text-black w-full" :class="{ 'border-red-500': listNameError }" @keyup.enter="saveListName" />
                    <p v-if="listNameError" class="text-red-500 text-sm">{{ listNameError }}</p>
                </div>
                <div class="flex gap-2">
                    <ButtonComponent label="Cancelar" bg-color="bg-red-500" hover-color="hover:bg-red-600"
                        @click="cancelEditing" :size="'small'" />
                    <ButtonComponent label="Guardar" bg-color="bg-green-500" hover-color="hover:bg-green-600"
                        @click="saveListName" :size="'small'" />

                </div>
            </div>
            <div v-else class="flex justify-between w-full">
                <div class="w-[50%] cursor-pointer flex items-center md:justify-start" @click="startEditing">
                    <h1 class="text-xl font-bold text-ellipsis overflow-hidden">{{ editedListName }}</h1>
                </div>
                <div class="flex flex-col justify-center md:flex-row md:space-x-2">
                    <ButtonComponent :bgColor="'bg-red-500'" :hoverColor="'hover:bg-red-600'" label="Eliminar"
                        @click="deleteList" :size="'small'" class="w-full flex justify-center" />
                    <ButtonComponent label="Crear nueva tarea" bg-color="bg-wisely-blue"
                        hover-color="hover:bg-wisely-dark" @click="openModal" :size="'small'"
                        class="w-full flex justify-center" />
                </div>
            </div>
        </div>

        <div class="bg-gray-100 p-4 rounded-lg shadow-lg">
            <ul class="mt-2">
                <li class="py-1" v-for="(task, index) in sortedTasks" :key="task.id" @dragover.prevent>
                    <TaskComponent :boardId="list.board_id" :listId="list.id" :task="task" @taskDeleted="onTaskDeleted"
                        @taskReordered="onTaskReordered" :draggable="true" :index="index" />
                </li>
            </ul>
        </div>

        <ModalComponent :isOpen="isModalOpen" @close="closeModal">
            <div class="flex flex-col w-80">
                <h2 class="text-lg font-bold">Crear Nueva Tarea</h2>
                <input v-model="newTaskName" type="text" placeholder="Nombre de la tarea"
                    :class="['mt-2 border', nameError ? 'border-red-500' : 'border-gray-300', 'p-2 rounded-lg w-full']" />
                <p v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</p>
                <textarea v-model="newTaskDescription" placeholder="Descripción de la tarea"
                    class="mt-2 border border-gray-300 p-2 rounded-lg w-full resize-none" rows="3"></textarea>

                <select v-model="newTaskPriority"
                    :class="['mt-2 border', priorityError ? 'border-red-500' : 'border-gray-300', 'p-2 rounded-lg w-full']">
                    <option value="" disabled selected>Selecciona la prioridad</option>
                    <option v-for="priority in priorities" :key="priority.id" :value="priority.id">
                        {{ priority.name }}
                    </option>
                </select>
                <p v-if="priorityError" class="text-red-500 text-sm">{{ priorityError }}</p>

                <div class="flex justify-end mt-4 gap-4">
                    <ButtonComponent @click="closeModal" bg-color="bg-wisely-blue" hover-color="hover:bg-wisely-dark"
                        label="Cancelar" />
                    <ButtonComponent @click="addTask" bg-color="bg-wisely-blue" hover-color="hover:bg-wisely-dark"
                        label="Crear" />
                </div>
            </div>
        </ModalComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, watch, computed } from "vue";
import TaskComponent from "./TaskComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";
import ModalComponent from "./ModalComponent.vue";
import { TaskResponse } from "@/types/response/taskResponse";
import { TaskDTO } from "@/types/dto/taskDTO";
import listService from "@/services/api/listService";
import { PriorityResponse } from "@/types/response/priorityResponse";
import taskService from "@/services/api/taskService";
import eventBus from "@/eventBus";
import { ListResponse } from "@/types/response/listResponse";
import { ListDTO } from "@/types/dto/listDTO";

export default defineComponent({
    name: "TaskListComponent",
    components: {
        TaskComponent,
        ButtonComponent,
        ModalComponent,
    },
    props: {
        list: {
            type: Object as PropType<ListResponse>,
            required: true,
        },
        tasks: {
            type: Array as PropType<TaskResponse[]>,
            required: true,
        },
        priorities: {
            type: Array as PropType<PriorityResponse[]>,
            required: true,
        },
    },
    emits: ["deleteList", "addTask", "allListUpdate"],
    setup(props, { emit }) {
        const isModalOpen = ref(false);
        const isEditing = ref(false);
        const editedListName = ref(props.list.name);
        const newTaskName = ref("");
        const newTaskDescription = ref("");
        const newTaskPriority = ref();
        const nameError = ref("");
        const priorityError = ref("");
        const listNameError = ref("");
        const localTasks = ref<TaskResponse[]>(props.tasks);

        const sortedTasks = computed(() => {
            return [...localTasks.value].sort((a, b) => a.order - b.order);
        });

        const handleListUpdate = async (listToBeUpdated: number) => {
            if (props.list.id !== listToBeUpdated) return;
            localTasks.value = await taskService.getAllTasks(props.list.board_id, props.list.id);
        };

        watch(
            () => props.tasks,
            (newTasks) => {
                localTasks.value = Array.isArray(newTasks) ? newTasks : [];
            },
            { immediate: true }
        );

        onMounted(async () => {
            eventBus.on("listNeedToBeUpdated", handleListUpdate);
        });

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            newTaskName.value = "";
            newTaskDescription.value = "";
            newTaskPriority.value = null;
            nameError.value = "";
            priorityError.value = "";
        };

        const startEditing = () => {
            isEditing.value = true;
        };

        const saveListName = async () => {
            if (editedListName.value.trim() === "") return;

            if (editedListName.value.length > 50) {
                listNameError.value = "El nombre de la lista no puede exceder los 50 caracteres.";
                return;
            }

            try {
                await listService.updateListById(props.list.board_id, props.list.id, {
                    name: editedListName.value,
                } as ListDTO);
                isEditing.value = false;
            } catch (error) {
                console.error("Error saving list name:", error);
            }
        };

        const cancelEditing = () => {
            isEditing.value = false;
            editedListName.value = props.list.name;
        };

        const addTask = async () => {
            nameError.value = "";
            priorityError.value = "";

            if (newTaskName.value.trim() === "") {
                nameError.value = "El nombre de la tarea es obligatorio.";
            } else if (newTaskName.value.length > 50) {
                nameError.value = "El nombre de la tarea no puede exceder los 50 caracteres.";
            }

            if (!newTaskPriority.value) {
                priorityError.value = "Por favor, selecciona una prioridad.";
            }

            if (nameError.value || priorityError.value) {
                return;
            }

            try {
                const newTask: TaskDTO = {
                    name: newTaskName.value,
                    description: newTaskDescription.value,
                    list_id: props.list.id,
                    priority_id: parseInt(newTaskPriority.value),
                };
                const createdTask = await taskService.createTask(props.list.board_id, newTask);
                emit("addTask", createdTask);
                localTasks.value.push(createdTask);
                closeModal();
            } catch (error) {
                console.error("Error adding task:", error);
            }
        };

        const onTaskDeleted = (taskId: number) => {
            localTasks.value = localTasks.value.filter((task) => task.id !== taskId);
        };

        const deleteList = async () => {
            try {
                await listService.deleteListById(props.list.board_id, props.list.id);
                emit("deleteList", props.list.id);
            } catch (error) {
                console.error("Error deleting list:", error);
            }
        };

        const onTaskReordered = async (taskId: number, newOrder: number, listId: number, newListId: number) => {
            await taskService.updateTaskById(props.list.board_id, newListId, taskId, { order: newOrder, list_id: listId });
            if (newListId !== listId) {
                eventBus.emit("listNeedToBeUpdated", newListId);
                return;
            }
            localTasks.value = await taskService.getAllTasks(props.list.board_id, props.list.id);
        };

        return {
            isModalOpen,
            isEditing,
            editedListName,
            newTaskName,
            newTaskDescription,
            newTaskPriority,
            nameError,
            priorityError,
            sortedTasks,
            openModal,
            closeModal,
            startEditing,
            saveListName,
            addTask,
            onTaskDeleted,
            deleteList,
            onTaskReordered,
            cancelEditing,
            listNameError,
        };
    },
});
</script>