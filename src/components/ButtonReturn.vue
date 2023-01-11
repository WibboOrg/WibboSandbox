<template>
    <div class="absolute z-10 w-auto p-2 transition-colors bg-gray-800 border-2 border-gray-700 rounded cursor-pointer top-1 left-1 hover:bg-gray-700" @click="route.path = 'index'">
        <div class="space-y-1">
            <div class="w-4 h-0.5 bg-white"></div>
            <div class="w-4 h-0.5 bg-white"></div>
            <div class="w-4 h-0.5 bg-white"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { route } from '../composables/route'
</script>
