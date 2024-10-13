<template>
    <div
        class="border rounded-lg shadow-md p-4 flex flex-col justify-between items-center text-white bg-wisely-dark w-full min-w-65 max-w-xs h-64">
        <div class="flex items-center w-full justify-between flex-nowrap">
            <template v-if="isEditing">
                <input v-model="editedName" @keyup.enter="updateBoardName"
                    :class="['border rounded-md px-2 py-1 mr-2 w-2/3 text-black ', { 'border-red-500': errorMessage }]"
                    placeholder="Nuevo nombre" />

                <ButtonComponent @click="updateBoardName" label="Guardar" bg-color="bg-wisely-blue"
                    hover-color="hover:bg-wisely-dark" />
            </template>
            <template v-else>
                <div class="flex justify-center w-full">
                    <span class="font-semibold overflow-hidden text-ellipsis text-lg" @click="editBoard">{{ board.name
                        }}</span>

                </div>
            </template>
        </div>

        <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>

        <div class="flex flex-row gap-4 flex-wrap justify-center md:flex-nowrap mt-4">
            <ButtonComponent @click="deleteBoard" label="Eliminar" bg-color="bg-wisely-blue"
                hover-color="hover:bg-wisely-dark" class="w-full justify-center" size="small" />
            <ButtonComponent @click="goToBoard" label="Ir al tablero" bgColor="bg-yellow-500"
                hoverColor="hover:bg-yellow-600" class="w-full justify-center" size="small" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import boardService from '@/services/api/boardService';
import ButtonComponent from './ButtonComponent.vue';
import { BoardResponse } from '@/types/response/boardResponse';

export default defineComponent({
    name: 'BoardComponent',
    components: {
        ButtonComponent,
    },
    props: {
        board: {
            type: Object as PropType<BoardResponse>,
            required: true,
        }
    },
    emits: ['delete', 'go', 'update'],
    setup(props, { emit }) {
        const isEditing = ref(false);
        const editedName = ref(props.board.name);
        const errorMessage = ref('');
        const router = useRouter();

        const editBoard = () => {
            isEditing.value = true;
            errorMessage.value = '';
        };

        const updateBoardName = async () => {
            if (!editedName.value.trim()) {
                errorMessage.value = 'El nombre del tablero no puede estar vacío.';
                return;
            }

            if (editedName.value.length > 50) {
                errorMessage.value = 'El nombre del tablero no puede exceder los 50 caracteres.';
                return;
            }

            errorMessage.value = '';

            try {
                await boardService.updateBoardById(props.board.id, { name: editedName.value });
                emit('update', { id: props.board.id, name: editedName.value });
                isEditing.value = false;
            } catch (error) {
                console.error('Error updating board name:', error);
            }
        };

        const deleteBoard = async () => {
            try {
                await boardService.deleteBoardById(props.board.id);
                emit('delete', props.board.id);
            } catch (error) {
                console.error('Error deleting board:', error);
            }
        };

        const goToBoard = () => {
            router.push(`/board/${props.board.id}`);
        };

        watch(editedName, (newValue) => {
            if (newValue.length <= 50 && newValue.trim()) {
                errorMessage.value = '';
            }
        });

        return {
            isEditing,
            editedName,
            errorMessage,
            editBoard,
            updateBoardName,
            deleteBoard,
            goToBoard,
        };
    },
});
</script>
