<template>
    <transition enterActiveClass="duration-300" enterFromClass="opacity-0" enterToClass="opacity-100" leaveActiveClass="duration-300" leaveFromClass="opacity-100" leaveToClass="opacity-0">
        <div class="absolute top-0 left-0 right-0 z-50 p-2 text-center rounded" :class="isSuccess ? 'bg-green-800' : 'bg-red-800'" v-if="notifications.length">
            <div v-for="(message, index) in notifications" :key="'message' + index">{{ message }}</div>
            <div class="absolute -translate-y-1/2 cursor-pointer top-1/2 right-4" @click="onClose">
                <IconClose class="w-6 h-6" />
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
const { notifications, isSuccess } = useNotification()

const onClose = () => {
    notifications.value = []
}
</script>
