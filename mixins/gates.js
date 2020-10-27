// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const gates = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        async vueGates() {
          const { data: permissions } = await this.$axios.get(
            "laravel-permissions"
          );
          const { data: roles } = await this.$axios.get("laravel-roles");
          this.$gates.setPermissions(permissions);
          this.$gates.setRoles(roles);
        }
      }
    });
  }
};

Vue.use(gates);
