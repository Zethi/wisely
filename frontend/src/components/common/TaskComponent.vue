<template>
    <div class="border border-gray-300 p-4 rounded-lg w-full flex justify-between items-center" :draggable="true"
        @dragstart="handleDragStart" @dragover.prevent @drop="handleDrop">
        <div v-if="isEditing" class="flex justify-between w-full items-center gap-2">
            <input v-model="taskName" type="text" class="border border-gray-300 p-4 h-10 rounded-lg w-36" />
            <div class="flex gap-2 flex-row">
                <ButtonComponent label="Cancelar" bgColor="bg-gray-500" hoverColor="hover:bg-gray-600"
                    textColor="text-white" size="small" @click="cancelEdit" />
                <ButtonComponent label="Guardar" bgColor="bg-green-500" hoverColor="hover:bg-green-600"
                    textColor="text-white" size="small" @click="saveTaskName" />
            </div>
        </div>
        <div v-else class="flex justify-between w-full">
            <h3 class="text-lg font-semibold cursor-pointer" @click="openModal">{{ taskName }}</h3>
            <div class="flex gap-2">
                <ButtonComponent label="Editar" bgColor="bg-yellow-500" hoverColor="hover:bg-yellow-600"
                    textColor="text-white" size="small" @click="editTaskName" />
                <ButtonComponent label="Eliminar" bgColor="bg-red-500" hoverColor="hover:bg-red-600"
                    textColor="text-white" size="small" @click="handleDelete" />
            </div>
        </div>

        <ModalComponent :isOpen="isModalOpen" @close="closeModal">
            <template v-slot>
                <div class="w-[300px] md:w-[500px]">
                    <h2 class="text-2xl font-bold mb-1">{{ taskName }}</h2>
                    <hr>
                    <div class="mt-4">
                        <div v-if="isEditingDescription">
                            <textarea v-model="newTaskDescription"
                                class="border border-gray-300 p-2 rounded-lg w-full resize-none"></textarea>
                            <div class="flex justify-end gap-2 mt-2">
                                <ButtonComponent label="Cancelar" bgColor="bg-gray-500" hoverColor="hover:bg-gray-600"
                                    textColor="text-white" size="small" @click="cancelEditDescription" />
                                <ButtonComponent label="Guardar" bgColor="bg-green-500" hoverColor="hover:bg-green-600"
                                    textColor="text-white" size="small" @click="saveTaskDescription" />
                            </div>
                        </div>
                        <div v-else @click="editTaskDescription" class="cursor-pointer">
                            <p>{{ taskDescription || "Agregar descripción..." }}</p>
                        </div>
                    </div>
                </div>
            </template>
        </ModalComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import ModalComponent from './ModalComponent.vue';
import taskService from "@/services/api/taskService";
import { TaskResponse } from "@/types/response/taskResponse";
import { TaskDTO } from '@/types/dto/taskDTO';

export default defineComponent({
    name: "TaskComponent",
    props: {
        boardId: {
            type: Number,
            required: true,
        },
        task: {
            type: Object as PropType<TaskResponse>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const isEditing = ref(false);
        const taskName = ref(props.task.name);
        const isModalOpen = ref(false);

        const isEditingDescription = ref(false);
        const taskDescription = ref(props.task.description || "");
        const newTaskDescription = ref(taskDescription.value);

        const editTaskName = () => {
            isEditing.value = true;
        };

        const cancelEdit = () => {
            isEditing.value = false;
            taskName.value = props.task.name;
        };

        const saveTaskName = async () => {
            if (taskName.value.trim() === "") {
                console.error("El nombre de la tarea no puede estar vacío.");
                return;
            }

            try {
                const updatedTask: TaskDTO = { name: taskName.value };
                await taskService.updateTaskById(props.boardId, props.task.list_id, props.task.id, updatedTask);
                emit('taskUpdated', props.task.id, taskName.value);
                isEditing.value = false;
            } catch (error) {
                console.error('Error al actualizar la tarea:', error);
            }
        };

        const editTaskDescription = () => {
            isEditingDescription.value = true;
        };

        const cancelEditDescription = () => {
            isEditingDescription.value = false;
            newTaskDescription.value = taskDescription.value;
        };

        const saveTaskDescription = async () => {
            if (newTaskDescription.value.trim() === "") {
                console.error("La descripción de la tarea no puede estar vacía.");
                return;
            }

            try {
                const updatedTask: TaskDTO = { description: newTaskDescription.value };
                await taskService.updateTaskById(props.boardId, props.task.list_id, props.task.id, updatedTask);
                emit('taskUpdated', props.task.id, newTaskDescription.value);
                taskDescription.value = newTaskDescription.value;
                isEditingDescription.value = false;
            } catch (error) {
                console.error('Error al actualizar la descripción:', error);
            }
        };

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            cancelEditDescription();
        };

        return {
            isEditing,
            taskName,
            isModalOpen,
            isEditingDescription,
            newTaskDescription,
            editTaskName,
            cancelEdit,
            saveTaskName,
            editTaskDescription,
            cancelEditDescription,
            saveTaskDescription,
            openModal,
            closeModal,
            taskDescription
        };
    },
    methods: {
        handleDragStart(event: DragEvent) {
            if (this.task.id !== undefined && this.task.order !== undefined) {
                event.dataTransfer?.setData("taskId", this.task.id.toString());
                event.dataTransfer?.setData("listId", this.task.list_id.toString());
                event.dataTransfer?.setData("boardId", this.boardId.toString());
                event.dataTransfer?.setData("taskOrder", this.task.order.toString());
            } else {
                console.error("taskId or order is undefined:", this.task.id, this.task.order);
            }
        },

        async handleDrop(event: DragEvent) {
            const targetTaskId = event.dataTransfer?.getData("taskId");
            const targetTaskOrder = parseInt(event.dataTransfer?.getData("taskOrder") || "0");
            const targetListId = parseInt(event.dataTransfer?.getData("listId") || "0");

            if (targetTaskId && targetTaskOrder !== undefined && this.task.order !== undefined) {
                const originalOrder = this.task.order;
                this.$emit("taskReordered", this.task.id, targetTaskOrder, targetListId, this.task.list_id);
                this.$emit("taskReordered", targetTaskId, originalOrder, this.task.list_id, targetListId);
            } else {
                console.error("Failed to get valid task id or order on drop");
            }
        },

        async handleDelete() {
            try {
                await taskService.deleteTaskById(this.boardId, this.task.list_id, this.task.id);
                this.$emit('taskDeleted', this.task.id);
            } catch (error) {
                console.error('Error al eliminar la tarea:', error);
            }
        },
    },
    components: {
        ButtonComponent,
        ModalComponent,
    },
});
</script>
