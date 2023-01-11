<template>
	<div
		class="w-screen h-screen overflow-hidden antialiased text-white bg-gray-900"
	>
		<transition
			enter-active-class="duration-300"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="duration-300"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				class="absolute top-0 left-0 right-0 z-50 p-2 text-center bg-red-800 rounded"
				v-if="errors.length"
			>
				<div v-for="error in errors">{{ error }}</div>
				<div
					class="absolute -translate-y-1/2 cursor-pointer top-1/2 right-4"
					@click="errors = []"
				>
				<ButtonClose class="w-6 h-6" />
				</div>
			</div>
		</transition>
		<transition
			enter-active-class="duration-300"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="duration-300"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				class="absolute top-0 left-0 right-0 z-50 p-2 text-center bg-green-800 rounded"
				v-if="sucesses.length"
			>
				<div v-for="sucesse in sucesses">{{ sucesse }}</div>
				<div
					class="absolute -translate-y-1/2 cursor-pointer top-1/2 right-4"
					@click="sucesses = []"
				>
				<ButtonClose class="w-6 h-6" />
				</div>
			</div>
		</transition>
		<div v-if="auth.logged === false">
			<div class="flex items-center justify-center min-h-screen">
				<div
					class="px-8 py-6 mt-4 text-left bg-gray-800 rounded shadow-lg"
				>
					<h3 class="text-2xl font-bold text-center">SandBox</h3>
					<form @submit.prevent="postLogin">
						<div class="mt-4">
							<div>
								<label class="block" for="email">Pseudo</label>
								<input
									type="text"
									placeholder="Pseudo"
									v-model="loginForm.username"
									class="w-full px-4 py-2 mt-2 bg-gray-600 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								/>
							</div>
							<div class="mt-4">
								<label class="block">Mot de passe</label>
								<input
									type="password"
									placeholder="Mot de passe"
									v-model="loginForm.password"
									class="w-full px-4 py-2 mt-2 bg-gray-600 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								/>
							</div>
							<div class="flex items-baseline justify-between">
								<button
									class="w-full px-6 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-900"
								>
									Connexion
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div v-else>
			<iframe
				class="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full"
				:src="'https://sandbox.wibbo.org/nitro/?local=true&sso=' + auth.ssoticket"
				v-if="auth.ssoticket !== ''"
			></iframe>

			<div
				class="absolute z-10 w-auto p-2 transition-colors bg-gray-800 border-2 border-gray-700 rounded cursor-pointer top-1 left-1 hover:bg-gray-700"
				@click="route.path = 'index'"
			>
				<div class="space-y-1">
					<div class="w-4 h-0.5 bg-white"></div>
					<div class="w-4 h-0.5 bg-white"></div>
					<div class="w-4 h-0.5 bg-white"></div>
				</div>
			</div>

			<transition
				enter-active-class="duration-300"
				enter-from-class="-translate-x-full"
				enter-to-class="translate-x-0"
				leave-active-class="duration-300"
				leave-from-class="translate-x-0"
				leave-to-class="-translate-x-full"
			>
				<nav
					class="absolute top-0 bottom-0 left-0 z-10 flex flex-col h-full gap-1 p-4 bg-gray-800 shadow shadow-gray-600"
					v-show="route.path !== ''"
					:key="route.path !== '' ? 'yes' : 'no'"
				>
					<div class="flex justify-between py-2">
						<span class="font-bold">SandBox</span>

						<div class="cursor-pointer" @click="route.path = ''">
							<ButtonClose class="w-6 h-6" />
						</div>
					</div>

					<ul class="flex flex-col gap-1 overflow-y-overlay">
						<li
							class="w-full p-2 text-center transition-colors border-2 border-gray-700 cursor-pointer hover:bg-gray-600"
							@click="route.path = 'index'"
						>
							Acceuil
						</li>
						<li
							class="w-full p-2 text-center transition-colors border-2 border-gray-700 cursor-pointer hover:bg-gray-600"
							@click="route.path = 'upload-furni'"
						>
							Ajouter des mobiliers
						</li>
						<li
							class="w-full p-2 text-center transition-colors border-2 border-gray-700 cursor-pointer hover:bg-gray-600"
							@click="logout"
						>
							Déconnexion
						</li>
					</ul>
				</nav>
			</transition>

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

							<div v-if="route.path == 'upload-furni'">
								<div
									class="flex flex-col gap-2 p-4 bg-gray-900 rounded"
								>
									<h1 class="font-bold text-center">
										Importer des mobiliers
									</h1>
									<div
										class="flex items-center justify-center w-full"
									>
										<label
											class="relative flex flex-col w-full overflow-hidden border-4 border-blue-200 border-solid cursor-pointer hover:animate-pulse"
										>
											<div
												class="flex flex-col items-center justify-center p-1"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													v-if="
														uploadForm.files == null
													"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
													/>
												</svg>
												<p
													class="px-2 pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
												>
													Importer des fichier
												</p>
											</div>

											<input
												type="file"
												class="opacity-0"
												accept=".nitro"
												multiple
												ref="upload"
												@change="onUploadChange()"
												hidden
											/>
										</label>
									</div>
									<ul
										class="flex flex-col gap-1 px-2 overflow-y-overlay max-h-32"
										v-if="uploadForm.files.length"
									>
										<li
											v-for="(
												file, index
											) in uploadForm.files"
											class="flex justify-between p-2 rounded even:bg-gray-700 odd:bg-gray-800"
										>
											{{ file.name }}
											<div
												class="cursor-pointer"
												@click="removeUpload(file.name)"
											>
											<ButtonClose class="w-6 h-6" />
											</div>
										</li>
									</ul>
									<button
										class="w-full p-2 text-center transition-colors border-2 border-gray-700 cursor-pointer hover:bg-gray-600"
										@click.prevent="postUpload"
									>
										Importer
									</button>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</transition>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import ButtonClose from "./components/ButtonClose.vue";

const errors = ref<string[]>([]);
const sucesses = ref<string[]>([]);
const loginForm = ref({ username: "", password: "" });
const auth = ref({ logged: false, token: "", ssoticket: "" });
const route = ref({ path: "" });
const uploadForm = ref<{ files: { name: string; file: File }[] }>({
	files: [],
});
const loading = ref(false);
const isLocal = ref(false);
const upload = ref<HTMLInputElement>();

onMounted(async () => {
	const token = localStorage.getItem("token");

	if (token) {
		auth.value.token = token;

		try {
			await loadSSOTicket();

			auth.value.logged = true;
		} catch (e) {}
	}

  isLocal.value = getConfig<boolean>("local.enabled");
});

const postUpload = async () => {
	if (loading.value) {
		return;
	}

	errors.value = [];
	sucesses.value = [];

	if (uploadForm.value.files.length == 0) {
		errors.value.push("Aucun fichier à importer");
		return;
	}

	const formData = new FormData();
	for (let file of uploadForm.value.files.slice(0, 20)) {
		formData.append("file[]", file.file);
	}

	try {
		loading.value = true;

		const data = await fetchAPI("uploadfurni", "POST", formData);
		sucesses.value.push("Fichiers importés");
	} catch (e) {}

	loading.value = false;
};

const onUploadChange = () => {
	const files = upload.value?.files;

	if (!files) return;

	for (const file of Array.from(files)) {
		if (
			uploadForm.value.files.filter((f) => f.name === file.name)
				.length !== 0
		) {
			uploadForm.value.files = uploadForm.value.files.filter(
				(f) => f.name !== file.name
			);
		}

		uploadForm.value.files.push({ name: file.name, file: file });
	}

	if (uploadForm.value.files.length > 20) {
		uploadForm.value.files = uploadForm.value.files.slice(0, 20);
	}
};

const removeUpload = (name: string) => {
	uploadForm.value.files = uploadForm.value.files.filter(
		(f) => f.name !== name
	);
};

const postLogin = async () => {
	if (loading.value) {
		return;
	}

	errors.value = [];

	if (
		loginForm.value.username.length < 3 ||
		loginForm.value.password.length < 3
	) {
		errors.value.push("Veuillez remplir tous les champs");
		return;
	}

	try {
		loading.value = true;

		const dataLogin = await fetchAPI(
			"login",
			"POST",
			JSON.stringify(loginForm.value)
		);

		auth.value.token = dataLogin.token;

		localStorage.setItem("token", auth.value.token);

		await loadSSOTicket();

		auth.value.logged = true;
	} catch (e) {
		loginForm.value = {
			username: "",
			password: "",
		};
		logout();
	}

	loading.value = false;
};

const loadSSOTicket = async () => {
	const data = await fetchAPI("client");

	auth.value.ssoticket = data.ticket;
};

const logout = () => {
	auth.value = {
		logged: false,
		token: "",
		ssoticket: "",
	};

	localStorage.clear();
};

const fetchAPI = async (
	url: string,
	method: string = "GET",
	body: BodyInit | string | null = null
) => {
	const response = await fetch(getConfig<string>("api.path") + url, {
		method: method,
		headers: {
			Authorization: "Bearer " + auth.value.token,
		},
		body: body,
	});

	const data = await response.json();

	if (response.status === 401) {
		logout();
		errors.value.push("Vous avez été déconnecté");
		throw new Error();
	}

	if (response.status === 400 || response.status === 404) {
		errors.value.push(data.message);
		throw new Error();
	}

	if (response.status !== 200) {
		errors.value.push("Une erreur est survenue");
		throw new Error(data.message);
	}

	return data;
};

//@ts-ignore
const getConfig = <T>(key: string): T => SandboxConfig[key];
</script>
