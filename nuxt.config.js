export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: "%s - EICM-GDC",
    title: process.env.SITE_TITLE || "EICM-GDC",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "eicm",
        name: "EICM",
        content: process.env.SITE_DESCRIPTION || "Escola Técnica do Mindelo"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/logo/tiny_logo.png" }]
  },

  env: {
    PUBLIC_URL: process.env.PUBLIC_URL || "https://eicm-gdc.ml/api",
    SITE_URL: process.env.SITE_URL || "https://eicm-gdc.ml"
  },

  robots: {
    UserAgent: "*",
    Disallow: "/admin/*"
  },

  sitemap: {
    hostname: process.env.SITE_URL || "https://eicm-gdc.ml",
    gzip: true,
    exclude: ["/admin/**"],
    routes: ["/courses"]
  },

  /*
   ** Global CSS
   */
  css: [
    "view-design/dist/styles/iview.css",
    "~/assets/css/main.css",
    {
      src: "@/assets/less/index.less",
      lang: "less"
    }
  ],

  loading: { color: "#3E4095" },

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */

  pageTransition: {
    name: "fade",
    mode: "out-in"
  },

  router: {
    middleware: ["clearValidationFormErrors"]
  },

  plugins: [
    "@/plugins/view-design",
    "@/plugins/base",
    "@/plugins/filters",
    "@/plugins/v-mask",
    "@/plugins/vue-gates",
    "@/mixins/aux",
    "@/mixins/links",
    "@/mixins/handleForm",
    "@/mixins/notifications",
    "@/mixins/gates",
    "@/mixins/authentication",
    "@/mixins/validationErrors",
    "@/plugins/axios",
    { src: "@/plugins/g-map", ssr: false },
    { src: "@/plugins/image-lightbox", ssr: false },
    { src: "@/plugins/aos", ssr: false }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/moment"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/robots",
    "@nuxtjs/auth",
    "@nuxtjs/sitemap",
    "vue-social-sharing/nuxt",
    [
      "vue-sweetalert2/nuxt",
      { confirmButtonColor: "#3E4095", cancelButtonColor: "#ff7674" }
    ],
    [
      "nuxt-social-meta",
      {
        url: process.env.SITE_URL || "https://eicm-gdc.ml",
        title: process.env.SITE_TITLE || "EICM-GDC",
        site_name: process.env.SITE_NAME || "EICM-GDC",
        description:
          process.env.SITE_DESCRIPTION || "Escola Tecnica do Mindelo",
        img: process.env.SITE_LOGO || "logo/logo.png",
        locale: "pt_PT",
        twitter: "@eicm_gdc",
        twitter_card: "summary_large_image",
        themeColor: "#3E4095"
      }
    ]
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || "http://eicm_api.test:8000/api"
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "meta.token"
          },
          logout: { url: "auth/logout", method: "post" },
          user: { url: "auth/user", method: "get", propertyName: "data" }
        },
        autoFetchUser: true
      }
    }
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ["vue-tinymce-editor"],
    // Este bloco foi adicionado por causa de erro de less ao ler arquivo de personalização de Iview
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },

  tailwindcss: {
    cssPath: "@/assets/css/tailwind.css",
    configPath: "tailwind.config.js",
    exposeConfig: true,
    config: {}
  },

  moment: {
    timezone: true,
    locales: ["pt"],
    defaultTimezone: "Atlantic/Cape_Verde"
  }
};
