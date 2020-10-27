// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const handleForms = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
       
        publicURL() {
          return process.env.PUBLIC_URL;
        },

        siteURL() {
          return process.env.SITE_URL;
        },
      }
    });
  }
};

Vue.use(handleForms);
