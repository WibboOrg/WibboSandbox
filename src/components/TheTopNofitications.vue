<template>
    <div class="absolute top-10 right-5 z-50 flex flex-col gap-2 w-52">
        <TransitionGroup enterActiveClass="duration-300" enterFromClass="opacity-0" enterToClass="opacity-100" leaveActiveClass="duration-300" leaveFromClass="opacity-100" leaveToClass="opacity-0">
            <div class="p-2 text-center rounded relative flex justify-between cursor-pointer"
             :class="notif.success ? 'bg-green-800' : 'bg-red-800'"
             v-for="(notif) in notifications" :key="'message' + notif.id"
             @click="onClose(notif.id)">
                <div>{{ notif.message }}</div>
                <button @click="onClose(notif.id)">
                    <IconClose class="w-6 h-6" />
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<script lang="ts" setup>
const { notifications } = useNotification()

const onClose = (id: number) => notifications.value = notifications.value.filter(x => x.id !== id);
</script>
