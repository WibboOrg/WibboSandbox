<template>
  <div class="absolute top-10 right-5 z-50 flex flex-col gap-2 w-52">
    <TransitionGroup enterActiveClass="duration-300" enterFromClass="opacity-0" enterToClass="opacity-100" leaveActiveClass="duration-300" leaveFromClass="opacity-100" leaveToClass="opacity-0">
      <div role="alert" class="alert shadow-lg" :class="notif.success ? 'alert-success' : 'alert-error'" v-for="notif in notifications" :key="'message' + notif.id" @click="onClose(notif.id)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-black h-6 w-6 shrink-0">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <div class="text-xs">{{ notif.message }}</div>
        </div>
        <button @click="onClose(notif.id)">
          <IconClose class="w-6 h-6" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
const { notifications } = useNotification()

const onClose = (id: number) => (notifications.value = notifications.value.filter((x) => x.id !== id))
</script>
