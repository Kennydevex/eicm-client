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
        },

        successNotify(title, desc) {
          this.$Notice.success({
            title: title ? title : "Sucesso",
            desc: desc ? desc : "Operação efetuada com sucesso"
          });
        }
      }
    });
  }
};

Vue.use(alerts);
