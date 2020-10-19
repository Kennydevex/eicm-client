import Vue from "vue";
import { mapGetters } from "vuex";

const User = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        logout() {
          this.$auth.logout().then(() => {
            this.$router.push({
              path: "/"
            });
            this.successMsg("Sessão terminada com sucesso");
          });
        }
      },
      computed: {
        ...mapGetters({
          user: "user",
          authenticated: "authenticated"
        })
      }
    });
  }
};

Vue.use(User);
