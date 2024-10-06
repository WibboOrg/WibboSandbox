<template>
  <tr :class="props.isDeleted ? 'ring ring-red-700 ring-inset bg-red-900 text-white hover:bg-red-800' : props.isUpdated ? 'ring ring-green-700 ring-inset bg-green-900 text-white hover:bg-green-800' : ''">
    <slot></slot>
  </tr>
</template>

<script lang="ts" setup>
const props = defineProps({
  isUpdated: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }
})
</script>
