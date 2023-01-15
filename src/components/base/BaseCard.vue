<template>
    <div class="overflow-hidden break-words rounded bg-gray-800 shadow shadow-gray-600" :class="{ 'bg-gray-900': !hiddenBackground }">
        <h4 class="pl-1 my-2 text-center" v-if="hasTitleSlot">
            <span class="font-bold">
                <slot name="title"></slot>
            </span>
        </h4>

        <div class="px-4 py-2">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
const slots = useSlots()

defineProps({
    hiddenBackground: { type: Boolean, default: false },
})

const hasTitleSlot = computed(() => !!slots['title'])
</script>
