// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";
import { mapGetters } from "vuex";

const ValidationErrors = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          backend_form_errors: "validationErrors/backend_form_errors",
          auth_401_errors: "validationErrors/auth_401_errors"
        })
      },
      methods: {
        showFormErrors(field) {
          if (this.backend_form_errors && this.backend_form_errors[field]) {
            return this.backend_form_errors[field][0];
          }
        }
      }
    });
  }
};

Vue.use(ValidationErrors);
