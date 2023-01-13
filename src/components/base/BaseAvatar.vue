<template>
    <div
        :style="{ backgroundImage: `url(${url})` }"
        :class="{ 'avatar-square': square, 'avatar-head': headonly && size != 's', 'avatar-head-s': headonly && size === 's' }"
        v-if="square || headonly"
    ></div>
    <img :src="url" class="max-w-none" v-else />
</template>

<script lang="ts" setup>
const props = defineProps({
    figure: { type: String, default: '', required: true },
    action: { type: String, default: '' },
    direction: { type: Number, default: 0 },
    headDirection: { type: Number, default: 0 },
    gesture: { type: String, default: '' },
    size: { type: String, default: '' },
    imgFormat: { type: String, default: '' },
    frame: { type: Number, default: 0 },
    headonly: { type: Boolean },
    trim: { type: Boolean },
    square: { type: Boolean },
})

const url = computed(() => {
    const params = []
    if (props.action) params.push(`action=${props.action}`)
    if (props.direction) params.push(`direction=${props.direction}`)
    if (props.headDirection) params.push(`head_direction=${props.headDirection}`)
    if (props.gesture) params.push(`gesture=${props.gesture}`)
    if (props.size) params.push(`size=${props.size}`)
    if (props.imgFormat) params.push(`img_format=${props.imgFormat}`)
    if (props.frame) params.push(`frame=${props.frame}`)
    if (props.headonly) params.push(`headonly=${props.headonly ? 1 : 0}`)
    if (props.trim) params.push(`trim=${props.trim}`)

    return `//imaging.wibbo.org/?figure=${props.figure}${params.length ? '&' + params.join('&') : ''}`
})
</script>

<style>
.avatar-head {
    width: 54px;
    height: 62px;
    background-position: center -10px;
}

.avatar-head-s {
    width: 32px;
    height: 20px;
    background-position: center -10px;
}

.avatar-square {
    width: 40px;
    height: 40px;
    background-position: center -21px;
}
</style>
