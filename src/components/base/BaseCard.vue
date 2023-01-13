<template>
    <div>
        <h4 class="relative pl-1 my-2 text-center" v-if="hasTitleSlot">
            <div class="absolute top-0 left-0 z-0 flex flex-col-reverse items-start h-full gap-1 pointer-events-none">
                <BaseAnimate transition-name="pill-reverse" :delay="3" class="w-8 h-4 bg-gray-800 rounded-full"></BaseAnimate>
                <BaseAnimate transition-name="pill-reverse" :delay="5" class="w-12 h-4 bg-gray-700 rounded-full"></BaseAnimate>
                <BaseAnimate transition-name="pill-reverse" :delay="7" class="w-16 h-4 bg-gray-900 rounded-full"></BaseAnimate>
            </div>

            <span class="relative z-10 uppercase">
                <slot name="title"></slot>
            </span>

            <div class="absolute top-0 right-0 z-0 flex flex-col items-end h-full gap-1 pointer-events-none">
                <BaseAnimate transition-name="pill" :delay="3" class="w-8 h-4 bg-gray-800 rounded-full"></BaseAnimate>
                <BaseAnimate transition-name="pill" :delay="5" class="w-12 h-4 bg-gray-700 rounded-full"></BaseAnimate>
                <BaseAnimate transition-name="pill" :delay="7" class="w-16 h-4 bg-gray-900 rounded-full"></BaseAnimate>
            </div>
        </h4>

        <div class="px-4 py-4 card" :class="{ 'card--transparent': hiddenBackground }">
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

<style lang="scss">
.card {
    background-color: #0e1c27;
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.45), inset 0px 0px 0px 2px rgba(255, 255, 255, 0.05);

    @apply overflow-hidden break-words rounded-sm;

    &--transparent {
        @apply shadow-none bg-transparent;
    }
}
</style>
