<template>
    <div class="flex items-center justify-center min-h-screen">
        <BaseCard>
            <template #title>SandBox</template>
            <template #body>
                <form @submit.prevent="postLogin">
                    <div>
                        <label class="block" for="email">Pseudo</label>
                        <BaseInput type="text" placeholder="Pseudo" v-model="loginForm.username" />
                    </div>
                    <div class="mt-4">
                        <label class="block">Mot de passe</label>
                        <BaseInput type="password" placeholder="Mot de passe" v-model="loginForm.password" />
                    </div>
                    <div class="flex items-baseline justify-between">
                        <BaseButton class="mt-4 mb-2">Connexion</BaseButton>
                    </div>
                </form>
            </template>
        </BaseCard>
    </div>
</template>

<script lang="ts" setup>
import { router } from '../router'

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

        router.push('/hotel')
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
