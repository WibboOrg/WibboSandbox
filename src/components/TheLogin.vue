<template>
    <div class="flex items-center justify-center min-h-screen">
        <BaseCard>
            <template #title>SandBox</template>
            <template #body>
                <form @submit.prevent="postLogin" class="flex flex-col gap-2">
                    <div>
                        <label class="block" for="email">Pseudo</label>
                        <BaseInput type="text" placeholder="Pseudo" v-model="loginForm.username" />
                    </div>
                    <div>
                        <label class="block">Mot de passe</label>
                        <BaseInput type="password" placeholder="Mot de passe" v-model="loginForm.password" />
                    </div>
                    <BaseButton class="my-2">Connexion</BaseButton>
                </form>
            </template>
        </BaseCard>
    </div>
</template>

<script lang="ts" setup>
import { router } from '../router'

const loginForm = ref({ username: '', password: '' })
const loading = ref(false)

const postLogin = async () => {
    if (loading.value) {
        return
    }

    if (loginForm.value.username.length < 3 || loginForm.value.password.length < 3) {
        showMessage('Veuillez remplir tous les champs')
        return
    }

    try {
        loading.value = true

        const dataLogin = await useFetchAPI<{ token: string }>('login', 'POST', { body: JSON.stringify(loginForm.value) })

        auth.value.token = dataLogin.token

        localStorage.setItem('token', auth.value.token)

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
