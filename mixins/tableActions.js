// Um mixin global para a apresentara os erros do backend para toda a aplicação

import Vue from "vue";

const t_actions = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        // toggleSelection(rows, table_ref) {
        //   if (rows) {
        //     rows.forEach(row => {
        //       this.$refs[table_ref].toggleRowSelection(row);
        //     });
        //   } else {
        //     this.$refs[table_ref].clearSelection();
        //   }
        // },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        }
      }
    });
  }
};

Vue.use(t_actions);
