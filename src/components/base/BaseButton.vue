<template>
    <button type="submit" class="relative btn" :class="btnClass" :disabled="loading || disabled" v-if="to == ''">
        <BaseSpinner :loading="loading" />
        <slot></slot>
    </button>
    <NuxtLink class="btn" :class="btnClass" :to="to" v-else>
        <slot></slot>
    </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps({
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    to: { type: String, default: '' },
    min: { type: Boolean, default: false },
    little: { type: Boolean, default: false },
    big: { type: Boolean, default: false },
    primary: { type: Boolean, default: false },
    red: { type: Boolean, default: false },
})

const btnClass = computed(() => {
    return {
        'btn--min': props.min,
        'btn--big': props.big,
        'btn--little': props.little,
        'btn--primary': props.primary,
        'btn--red': props.red,
    }
})
</script>

<style lang="scss">
.btn {
    @apply bg-green-700 inline-block w-full px-2 py-2 rounded-sm cursor-pointer text-xl font-bold text-center text-white mb-1 transition-colors outline-none;
    box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 0.3), inset 0 -3px 0 0 rgba(20, 20, 20, 0.25);

    border: solid 1px rgba(0, 0, 0, 0.3);

    &:disabled,
    &--loading {
        @apply opacity-60 cursor-auto;
    }

    &:hover:not([disabled]) {
        @apply bg-green-600;
    }

    &--min {
        @apply w-auto;
    }

    &--big {
        line-height: 60px;
        font-size: 2rem;
    }

    &--little {
        @apply text-base m-0;
    }

    &--primary {
        background-color: var(--primary-color);
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.45), inset 0px 0px 0px 2px rgba(255, 255, 255, 0.05);
        backdrop-filter: contrast(5px);

        &:hover:not([disabled]) {
            background-color: var(--primary-color-hover);
        }
    }

    &--red {
        background-color: #f44336;
        // border: solid 2px #c3473d;

        &:hover:not([disabled]) {
            background-color: #ea5c52;
        }
    }
}
</style>
