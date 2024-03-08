<template>
    <div class="flex items-center justify-center h-full">
        <BaseCard>
            <template #title>SandBox</template>
            <template #body>
                <form @submit.prevent="formLogin" class="flex flex-col gap-2 p-4">
                    <div>
                        <label class="block mb-1">Pseudo</label>
                        <BaseInput placeholder="Pseudo" v-model="loginForm.username" />
                    </div>
                    <div>
                        <label class="block mb-1">Mot de passe</label>
                        <BaseInput type="password" placeholder="Mot de passe" v-model="loginForm.password" autocomplete="current-password" />
                    </div>
                    <label for="rememberMe" class="flex items-center justify-between cursor-pointer">
                        <div class="leading-8">Se souvenir de moi</div>
                        <BaseCheckBox id="rememberMe" name="remember" v-model="loginForm.rememberMe" />
                    </label>

                    <BaseButton class="flex justify-center">Connexion</BaseButton>
                </form>
            </template>
        </BaseCard>
    </div>
</template>

<script lang="ts" setup>
const { showMessage } = useNotification()
const { login } = useAuth()

const loginForm = ref({ username: '', password: '', rememberMe: false })
const loading = ref(false)

useHead({
    title: 'Connexion',
})

onMounted(() => {
    const username = localStorage.getItem('username')

    if (username) {
        loginForm.value.username = username
    }
})

const formLogin = async () => {
    if (loading.value) {
        return
    }

    if (loginForm.value.username.length < 3 || loginForm.value.password.length < 3) {
        showMessage({ message: 'Veuillez remplir tous les champs' })
        return
    }

    loading.value = true

    try {
        const loginResult = await login(loginForm.value.username, loginForm.value.password, loginForm.value.rememberMe)

        if (!loginResult) return

        localStorage.setItem('username', loginForm.value.username)

        navigateTo('/home')
    } catch (e: unknown) {
        console.error(e)
    }

    loading.value = false
}
</script>
