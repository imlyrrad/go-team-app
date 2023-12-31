// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.PUBLIC_PROD_API_URL,
    },
  },
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg-icons',
      '@fortawesome/pro-regular-svg-icons',
    ]
  }
})
