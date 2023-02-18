/// <reference types="vite/client" />

declare module '*.vue'

interface Window {
    ethereum: import('ethers').providers.ExternalProvider
}
