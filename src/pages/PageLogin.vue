<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="px-8 py-6 mt-4 text-left bg-gray-800 rounded shadow-lg">
            <h3 class="text-2xl font-bold text-center">SandBox</h3>
            <form @submit.prevent="postLogin">
                <div class="mt-4">
                    <div>
                        <label class="block" for="email">Pseudo</label>
                        <BaseInput type="text" placeholder="Pseudo" v-model="loginForm.username" />
                    </div>
                    <div class="mt-4">
                        <label class="block">Mot de passe</label>
                        <BaseInput type="password" placeholder="Mot de passe" v-model="loginForm.password" />
                    </div>
                    <div class="flex items-baseline justify-between">
                        <button class="w-full px-6 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-900">Connexion</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { notifications, isError } = useNotification()

const loginForm = ref({ username: '', password: '' })
const loading = ref(false)

const postLogin = async () => {
    if (loading.value) {
        return
    }

    notifications.value = []

    if (loginForm.value.username.length < 3 || loginForm.value.password.length < 3) {
        isError.value = true
        notifications.value.push('Veuillez remplir tous les champs')
        return
    }

    try {
        loading.value = true

        const dataLogin = await useFetchAPI<{ token: string }>('login', 'POST', JSON.stringify(loginForm.value))

        auth.value.token = dataLogin.token

        localStorage.setItem('token', auth.value.token)

        await loadSSOTicket()

        auth.value.logged = true
    } catch (e) {
        loginForm.value = {
            username: '',
            password: '',
        }
        logout()
    }

    loading.value = false
}
</script>
