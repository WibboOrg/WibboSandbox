<template>
  <input type="checkbox" class="toggle" :checked="value" :id="id" />
</template>

<script lang="ts" setup>
const props = defineProps({
  value: { type: Boolean, default: false },
  id: { type: String, required: true }
})
</script>

<style>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}
</style>
