// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const handleForm = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        resetFormFields(name) {
          try {
            this.$refs[name].resetFields();
          } catch (error) {
            console.error(error);
          }
        }
      }
    });
  }
};

Vue.use(handleForm);
