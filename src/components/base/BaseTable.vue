<template>
    <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-auto">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <slot name="head"></slot>
            </tr>
        </thead>
        <tbody>
            <slot name="body"></slot>
        </tbody>
    </table>
</template>
