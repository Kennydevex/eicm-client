// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const alerts = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        actionMsg(msg, type = "success") {
          this.$message({
            message: msg,
            type: type
          });
        },

        actionNotify(
          title = "Sucesso",
          msg = "Operação efetuada com sucesso",
          type = "success"
        ) {
          this.$notify({
            title: title,
            message: msg,
            type: type
          });
        }
      }
    });
  }
};

Vue.use(alerts);
