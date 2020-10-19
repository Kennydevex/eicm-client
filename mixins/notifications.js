// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const alerts = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        successMsg(msg) {
          this.$Message.success(msg);
        },

        errorMsg(msg) {
          this.$Message.error(msg);
        }
      }
    });
  }
};

Vue.use(alerts);
