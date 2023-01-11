<template>
	<div
		class="w-screen h-screen overflow-hidden antialiased text-white bg-gray-900"
	>
		<TopNofitications />
		<Login v-if="auth.logged === false" />
		<div v-else>
			<iframe
				class="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full"
				:src="
					'https://sandbox.wibbo.org/nitro/?local=true&sso=' +
					auth.ssoticket
				"
				v-if="auth.ssoticket !== ''"
			></iframe>

			<ButtonReturn />
			<NavBar />

			<transition
				enter-active-class="duration-300"
				enter-from-class="opacity-0"
				enter-to-class="opacity-100"
				leave-active-class="duration-300"
				leave-from-class="opacity-100"
				leave-to-class="opacity-0"
			>
				<div
					class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-75"
					v-show="route.path !== ''"
					:key="route.path !== '' ? 'yes' : 'no'"
				>
					<transition
						enter-active-class="absolute duration-300"
						enter-from-class="opacity-0"
						enter-to-class="opacity-100"
						leave-active-class="absolute duration-300"
						leave-from-class="opacity-100"
						leave-to-class="opacity-0"
					>
						<div :key="route.path">
							<div v-if="route.path == 'index'">
								<h1 class="text-4xl">
									Bienvenue sur la SandBox!
								</h1>
							</div>

							<UploadFurni v-if="route.path == 'upload-furni'" />
						</div>
					</transition>
				</div>
			</transition>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import TopNofitications from "./components/TopNofitications.vue";
import NavBar from "./components/NavBar.vue";
import ButtonReturn from "./components/ButtonReturn.vue";
import UploadFurni from "./pages/UploadFurni.vue";
import Login from "./pages/Login.vue";
import { auth, checkAuth } from "./composables/auth";
import { getConfig } from "./composables/config";
import { route } from "./composables/route";

const isLocal = ref(false);

onMounted(async () => {
	checkAuth();

	isLocal.value = getConfig<boolean>("local.enabled");
});
</script>
