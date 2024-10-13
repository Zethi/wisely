<template>
    <button :class="[
        'font-bold py-1 px-3 rounded-lg flex items-center transition-colors duration-300 ease-in-out text-nowrap',
        bgColorClass,
        hoverColorClass,
        textColorClass,
        sizeClass
    ]" @click="handleClick">
        <svg v-if="icon" :class="[iconSizeClass]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path :d="iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
        <span v-if="label">{{ label }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CustomButton',
    props: {
        label: {
            type: String,
            required: false,
        },
        bgColor: {
            type: String,
            default: 'bg-blue-500',
        },
        hoverColor: {
            type: String,
            default: 'hover:bg-blue-600',
        },
        textColor: {
            type: String,
            default: 'text-white',
        },
        size: {
            type: String,
            default: 'medium',
        },
        icon: {
            type: Boolean,
            default: false,
        },
        iconPath: {
            type: String,
            default: '',
        },
        iconSize: {
            type: String,
            default: 'h-5 w-5',
        },
    },
    emits: ['click'],
    methods: {
        handleClick() {
            this.$emit('click');
        },
    },
    computed: {
        bgColorClass(): string {
            return this.bgColor;
        },
        hoverColorClass(): string {
            return this.hoverColor;
        },
        textColorClass(): string {
            return this.textColor;
        },
        sizeClass(): string {
            if (this.size === 'small') return 'py-1 px-2 text-sm';
            if (this.size === 'large') return 'py-2 px-4 text-lg';
            return 'py-1.5 px-3';
        },
        iconSizeClass(): string {
            return this.iconSize;
        },
    },
});
</script>
