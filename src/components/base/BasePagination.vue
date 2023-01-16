<template>
    <div class="fixed z-10 flex w-auto p-2 bg-dark rounded bottom-2 right-4 bg-opacity-10 dark:bg-opacity-60 backdrop-blur">
        <span class="flex flex-row p-1">
            <a class="px-2 border-r border-black cursor-pointer dark:border-white" @click.prevent="goFirst">«</a>
            <a class="px-2 border-r border-black cursor-pointer dark:border-white" @click.prevent="goTo(pageId - 1)">‹</a>
            <div class="px-2 border-r border-black cursor-pointer dark:border-white" v-show="pageId > 4">…</div>

            <a
                class="px-2 border-r border-black cursor-pointer dark:border-white"
                @click="goTo(pageId - index)"
                v-show="pageId - index > 0 && pageId - index != pageId"
                v-for="index in [...Array(5).keys()].slice().reverse()"
                :key="index"
                >{{ pageId - index }}</a
            >
            <a class="px-2 border-r border-black cursor-pointer dark:border-white font-bold" @click.prevent="goTo(pageId)">{{ pageId }}</a>
            <a class="px-2 border-r border-black cursor-pointer dark:border-white" @click="goTo(pageId + index)" v-show="pageId + index <= pageCount" v-for="index in 5" :key="index">{{
                pageId + index
            }}</a>

            <div class="px-2 border-r border-black cursor-pointer dark:border-white" v-show="pageId <= pageCount - 4">…</div>
            <a class="px-2 border-r border-black cursor-pointer dark:border-white" @click.prevent="goTo(pageId + 1)">›</a>
            <a class="px-2 border-r border-black cursor-pointer dark:border-white" @click.prevent="goLast">»</a>
        </span>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    pageCount: { type: Number, require: true, default: 1 },
    pageId: { type: Number, require: true, default: 1 },
})

const emit = defineEmits(['pageCurrent'])

const goTo = (id: number) => {
    if (props.pageId == id) return

    if (id > props.pageCount) return
    else if (id <= 0) return

    emit('pageCurrent', id)

    document.getElementById('main')?.scrollTo({ top: 0, behavior: 'smooth' })
}

const goFirst = () => {
    if (props.pageId <= 1) return

    goTo(1)
}

const goLast = () => {
    if (props.pageId === props.pageCount) return

    goTo(props.pageCount)
}
</script>
