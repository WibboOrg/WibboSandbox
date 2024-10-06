<template>
  <button class="btn" :class="disabled ? 'btn-disabled' : ''" :disabled="disabled">
    <slot></slot>
    <BaseSpinner :loading="loading" v-if="loading" />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})
</script>
