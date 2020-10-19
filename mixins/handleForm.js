// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const handleForm = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        resetFormFields(name) {
          this.$refs[name].resetFields();
        }
      }
    });
  }
};

Vue.use(handleForm);
