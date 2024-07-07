// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7

export default defineNuxtConfig({
  srcDir: 'src/',

  devServer: {
    port: 3001
  },

  runtimeConfig: {
    databaseUrl: process.env.NUXT_DATABASE_URL || '',

    tokenSecret: process.env.NUXT_TOKEN_SECRET || '',
    tokenExpires: parseInt(process.env.NUXT_TOKEN_EXPIRES || ONE_DAY.toString(), 10), // 1 day
    tokenRememberMeExpires: parseInt(process.env.NUXT_TOKEN_REMEMBER_ME_EXPIRES || ONE_WEEK.toString(), 10), // 7 days

    uploadUrl: process.env.NUXT_UPLOAD_URL || '',

    public: {
        urlAssets: process.env.NUXT_PUBLIC_URL_ASSETS || '',
        urlCdn: process.env.NUXT_PUBLIC_URL_CDN || '',
        nitroClientUrl: process.env.NUXT_PUBLIC_NITRO_CLIENT_URL || "",
    },
  },

  app: {
      pageTransition: { name: 'page', mode: 'out-in' },
      keepalive: true,
  },

  typescript: {
    shim: false,
    strict: true,
  },

  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-07-06',
})