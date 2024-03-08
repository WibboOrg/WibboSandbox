// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7

export default defineNuxtConfig({
  srcDir: 'src/',
  devServer: {
    port: 3001
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || '',
    tokenSecret: process.env.TOKEN_SECRET || '',
    tokenExpires: parseInt(process.env.TOKEN_EXPIRES || ONE_DAY.toString(), 10), // 1 day
    tokenRememberMeExpires: parseInt(process.env.TOKEN_REMEMBER_ME_EXPIRES || ONE_WEEK.toString(), 10), // 7 days

    urlAssets: process.env.NUXT_PRIVATE_URL_ASSETS || '',
    urlCdn: process.env.NUXT_PRIVATE_URL_CDN || '',
    uploadUrl: process.env.NUXT_PRIVATE_UPLOAD_URL || '',

    public: {
        enableLocal: process.env.NUXT_PUBLIC_ENABLE_LOCAL || "false",
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
})
