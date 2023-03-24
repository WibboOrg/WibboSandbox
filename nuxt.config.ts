// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  ssr: false,

  runtimeConfig: {
    public: {
        apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
        enableLocal: process.env.NUXT_PUBLIC_ENABLE_LOCAL || "false",
        cookieSecret: process.env.NUXT_PRIVATE_COOKIE_SECRET || "",
        cookieName: process.env.NUXT_PRIVATE_COOKIE_NAME || ""
    },
  },

  typescript: {
    shim: false,
    strict: true,
  },

  css: ['@/assets/css/style.css'],
  
  modules: ['@nuxtjs/tailwindcss'],
})
