<template>
    <table class="w-full overflow-auto text-sm text-left text-gray-400 table-auto">
        <thead class="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
                <slot name="head"></slot>
            </tr>
        </thead>
        <tbody>
            <slot name="body"></slot>
        </tbody>
    </table>
</template>
