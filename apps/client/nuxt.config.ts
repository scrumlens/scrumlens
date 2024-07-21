// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    'nuxt-svgo',
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
  ssr: false,
})
