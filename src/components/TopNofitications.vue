<template>
	<transition
		enter-active-class="duration-300"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="duration-300"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div
			class="absolute top-0 left-0 right-0 z-50 p-2 text-center rounded"
			:class="isError ? 'bg-red-800' : 'bg-green-800'"
			v-if="messages.length"
		>
			<div v-for="message in messages">{{ message }}</div>
			<div
				class="absolute -translate-y-1/2 cursor-pointer top-1/2 right-4"
				@click="onClose"
			>
				<svg
					class="w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { errors, sucesses } from "../composables/notifications";

const isError = computed(() => errors.value.length);
const messages = computed(() => [...sucesses.value, ...errors.value]);

const onClose = () => {
	sucesses.value = [];
	errors.value = [];
};
</script>
