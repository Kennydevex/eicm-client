// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const redirectPage = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        redirectToPage(page) {
          this.$router.push({ path: "/" + page });
        },
        // frontNavegation(link) {
        //   this.$router.push({ path: this.localePath(link) });
        // }

        frontNavegation(link) {
          this.$router.push({ path: link });
        },

        redirectToPageWithParam(name, slug) {
          this.$router.push({
            name: name,
            params: { slug: slug }
          });
        },

        redirectToPageByName(name) {
          this.$router.push({
            name: name
          });
        },

        async onCancelModal(modal) {
          this.$store.commit(modal);
        },

        async handleModal(modal) {
          this.$store.commit(modal);
        },

      }
    });
  }
};

// const components_aux = {
//   install(Vue, options) {
//     Vue.mixin({
//       methods: {
//         filterMethod(data, query) {
//           return data.label.indexOf(query) > -1;
//         },

//         renderTransfers(item) {
//           return item.label;
//         }
//       }
//     });
//   }
// };

Vue.use(redirectPage);
// Vue.use(components_aux);
