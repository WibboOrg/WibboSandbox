<template>
    <transition enter-active-class="duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="duration-300" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div class="absolute top-0 left-0 right-0 z-50 p-2 text-center rounded" :class="isError ? 'bg-red-800' : 'bg-green-800'" v-if="notifications.length">
            <div v-for="(message, index) in notifications" :key="'message' + index">{{ message }}</div>
            <div class="absolute -translate-y-1/2 cursor-pointer top-1/2 right-4" @click="onClose">
                <IconClose class="w-6 h-6" />
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
const { notifications, isError } = useNotification()

const onClose = () => {
    notifications.value = []
}
</script>
