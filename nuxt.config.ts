// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Suabotuc',
      htmlAttrs: {
        lang: 'vi',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
    fonts: true,
  },
  routeRules: {
    '/': { prerender: true },
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
      },
    },
  },
  fonts: {
    defaults: {
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: [
        'vietnamese',
        'latin',
      ],
    },
  },
})
