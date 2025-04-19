// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/test-utils',
  ],
  css: ['~/assets/css/main.css'],
  fonts: {
    defaults: {
      weights: [400],
      styles: ['normal','italic'],
    subsets: [
        'vietnamese',
        'latin'
      ]
    },
    // families: [
    //   { 
    //     name: 'Nunito Sans', 
    //     src: { 
    //       url: '~/assets/fonts/NunitoSans.ttf', 
    //       format: 'ttf'
    //     }, 
    //     style: 'normal', 
    //     weight: 'normal',
    //     global: true
    //   },
    // ],
    assets: {
      prefix: '/assets/fonts/',
      strategy: 'public'
    }
  },
  ui: {
    colorMode: false,
    fonts: true
  },
  app: {
    head: {
      title: 'Suabotuc',
      htmlAttrs: {
        lang: 'vi'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    }
  },
  routeRules: {
    '/': { prerender: true }
  }
})