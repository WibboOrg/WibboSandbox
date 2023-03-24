<template>
    <div class="flex items-center justify-center h-full">
        <BaseCard>
            <template #title>SandBox</template>
            <template #body>
                <form @submit.prevent="web3Login" class="flex flex-col gap-2">
                    <div>
                        <label class="block mb-1">Pseudo</label>
                        <BaseInput placeholder="Pseudo" v-model="loginName" />
                    </div>
                    <BaseButton class="my-2 flex gap-2 justify-center"><span>Connexion</span><IconMetaMask class="h-6 w-6" /></BaseButton>
                </form>
            </template>
        </BaseCard>
    </div>
</template>

<script lang="ts" setup>
import { ethers } from 'ethers'

const { showMessage } = useNotification()
const { logout, login } = useAuth()

const loginName = ref('')
const loading = ref(false)

onMounted(() => {
    const username = localStorage.getItem('username')

    if (username) {
        loginName.value = username
    }
})

const web3Login = async () => {
    if (loading.value) {
        return
    }

    if (loginName.value.length < 3) {
        showMessage({ message: 'Veuillez remplir tous les champs' })
        return
    }

    loading.value = true

    try {
        if (!window.ethereum) {
            showMessage({ message: "MetaMask non détecté. Veuillez d'abord installer MetaMask" })
            return
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const messageToken = await (await useFetchAPI<{ token: string }>('web3')).token

        const messageSign = parseJwt<{ message: string }>(messageToken).message

        await provider.send('eth_requestAccounts', [])
        const address = await provider.getSigner().getAddress()
        const signature = await provider.getSigner().signMessage(messageSign)
        const username = loginName.value

        await login({ address, signature, messageToken, username })

        localStorage.setItem('username', username)

        navigateTo('/home')
    } catch (e: unknown) {
        loginName.value = ''
        logout()
    }

    loading.value = false
}
</script>
