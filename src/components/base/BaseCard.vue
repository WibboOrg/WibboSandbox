<template>
    <div class="relative overflow-hidden break-words rounded shadow shadow-gray-600" :class="{ 'bg-gray-800': !hiddenBackground }">
        <h4 class="my-2 text-center" v-if="hasTitleSlot">
            <span class="font-bold">
                <slot name="title"></slot>
            </span>
        </h4>

        <div class="overflow-auto">
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
