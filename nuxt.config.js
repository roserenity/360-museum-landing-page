export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  loading: {
    throttle: 0,
    color: 'blue',
    height: '5px'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Pinoy Hoops Fandom Museum',
    title: 'Pinoy Hoops Fandom Museum',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A virtual museum celebrating Filipino basketball fandom' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'preconnect', as:'style', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', as:'style', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter&display=swap' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css-sheets/text-colors.css',
    '@/assets/css-sheets/font-sizes.css',
    '@/assets/css-sheets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  components: [
    // Equivalent to { path: '~/components' }
    '~/components',
    { path: '~/components/', extensions: ['vue'] }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Pinoy Hoops Fandom Museum',
      short_name: 'Pinoy Hoops',
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    // Build Vuetify styles from source in dev too (as in production); the prebuilt
    // vuetify.css has a misplaced @charset that newer postcss warns about
    treeShake: true,
    defaultAssets: {
      // with treeShake the font family has to be named explicitly
      font: { family: 'Roboto' },
      icons: 'mdi'
    },
    icons: {
      iconfont: 'mdi',
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
