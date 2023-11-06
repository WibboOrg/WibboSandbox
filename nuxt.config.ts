// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7

export default defineNuxtConfig({
  srcDir: 'src/',
  devServer: {
    port: 3001
  },

  runtimeConfig: {
    cookieName: process.env.COOKIE_NAME || '__session',
    cookieSecret: process.env.COOKIE_SECRET || 'secret',
    cookieExpires: parseInt(process.env.COOKIE_EXPIRES || ONE_DAY.toString(), 10), // 1 day
    cookieRememberMeExpires: parseInt(process.env.COOKIE_REMEMBER_ME_EXPIRES || ONE_WEEK.toString(), 10), // 7 days

    urlAssets: process.env.NUXT_PRIVATE_URL_ASSETS || '',
    urlCdn: process.env.NUXT_PRIVATE_URL_CDN || '',
    uploadUrl: process.env.NUXT_PRIVATE_UPLOAD_URL || '',

    public: {
        apiBase: process.env.NUXT_PUBLIC_API_BASE || '/',
        enableLocal: process.env.NUXT_PUBLIC_ENABLE_LOCAL || "false",
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // security: {
  //   rateLimiter: {
  //     tokensPerInterval: 150,
  //     interval: 'hour',
  //     fireImmediately: true,
  //   },
  // },
  
  typescript: {
    shim: false,
    strict: true,
  },
  
  modules: ['@nuxtjs/tailwindcss', 'nuxt-csurf'],
})
