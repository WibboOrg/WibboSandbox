<template>
  <div class="card bg-base-100 card-bordered" :class="{ '!bg-transparent': hiddenBackground }">
    <div class="card-body overflow-auto">
      <h4 class="card-title" v-if="hasTitleSlot"><slot name="title"></slot></h4>

      <slot name="body"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const slots = useSlots()

defineProps({
  hiddenBackground: { type: Boolean, default: false }
})

const hasTitleSlot = computed(() => !!slots['title'])
</script>
