<template>
    <div class="w-full">
        <header class="bg-wisely-dark text-white flex items-center justify-between h-20 px-8 w-full">
            <ButtonComponent 
                bgColor="bg-wisely-blue" 
                hoverColor="hover:bg-wisely-dark" 
                @click="goHome" 
                :size="'medium'" 
                icon 
                iconPath="M3 9l9-7 9 7-1 1-8-6-8 6-1-1zM3 12v9h5v-5h8v5h5v-9l-9-7-9 7z" 
                iconSize="h-5 w-5" 
                class="h-10" />
            <div class="flex-grow flex justify-center">
                <img src="@/assets/logos/wisely_logo_header.png" alt="App Logo" class="h-10" />
            </div>

        </header>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router"; // Asegúrate de tener vue-router instalado
import ButtonComponent from "../common/ButtonComponent.vue";

export default defineComponent({
    name: "HeaderComponent",
    components: {
        ButtonComponent,
    },
    setup() {
        const router = useRouter();

        const goHome = () => {
            router.push({ name: 'home' }); // Reemplaza 'home' con el nombre de la ruta de tu página de inicio
        };

        return {
            goHome,
        };
    },
});
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style>
