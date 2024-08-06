// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-svgo',
    'shadcn-nuxt',
  ],
  tailwindcss: {
    config: {
      safelist: ['dark'],
    },
  },
  colorMode: {
    classSuffix: '',
  },
  shadcn: {
    componentDir: './components/ui/shadcn',
  },
  runtimeConfig: {
    proxyUrl: 'http://localhost:3030',
    public: {
      websocketUrl: 'http://localhost:3030',
    },
  },
  ssr: false,
})
