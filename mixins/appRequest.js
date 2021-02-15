import { alerts } from "@/mixins/appAlerts";

export const requests = {
  data() {
    return {
      sending: false,
      on_load_data: {}
    };
  },

  methods: {
    async addData(formRef, url, successTitle, updataData, handle_modal) {
      this.$refs[formRef].validate(valid => {
        if (valid) {
          this.sending = true;
          try {
            this.$axios
              .post(url, this.$props.formData)
              .then(res => {
                this.sending = false;
                this.resetFormFields(formRef);
                this.actionNotify(successTitle, res.data.msg, "success");
                process.client ? window.getApp.$emit(updataData) : "";
                this.handleModal(handle_modal);
              })
              .catch(err => {
                this.sending = false;
                this.actionMsg("Ago correu mal", "error");
              });
          } catch (error) {
            this.sending = false;
          }
        } else {
          this.actionMsg("Falha na operação, verefique os dados", "error");
          return;
        }
      });
    },

    onUpdateData(id, entity, updateData, updateModal) {
      try {
        this.$set(this.on_load_data, id, true);
        this.$axios.$get(`${entity}/${id}`).then(res => {
          process.client ? window.getApp.$emit(updateData, res.data) : "";
          this.$set(this.on_load_data, id, false);
          this.handleModal(updateModal);
        });
      } catch (error) {}
    },

    async updateData(formRef, url, successTitle, updataData, handle_modal) {
      this.$refs[formRef].validate(valid => {
        if (valid) {
          this.sending = true;
          try {
            this.$axios
              .put(`${url}/${this.$props.formData.id}`, this.$props.formData)
              .then(res => {
                this.sending = false;
                this.resetFormFields(formRef);
                this.actionNotify(successTitle, res.data.msg, "success");
                process.client ? window.getApp.$emit(updataData) : "";
                this.handleModal(handle_modal);
              })
              .catch(err => {
                this.sending = false;
                this.actionMsg("Ago correu mal", "error");
              });
          } catch (error) {
            this.sending = false;
          }
        } else {
          this.actionMsg("Falha na operação, verefique os dados", "error");
          return;
        }
      });
    }
  }
};

export const handleActivations = {
  mixins: [alerts],
  data() {
    return {
      loadAtivaction: {}
    };
  },
  methods: {
    async toggleStatus(
      url,
      id,
      status,
      entity,
      refresh_data,
      featured = false
    ) {
      await this.$set(this.loadAtivaction, id, false);
      await this.activationAlert(status, entity, featured).then(result => {
        if (result.value) {
          this.$set(this.loadAtivaction, id, true);
          this.$axios.$put(`${url}/${id}`).then(res => {
            this.actionNotify("Operação Sucedida", res.msg, "success");
            this.$set(this.loadAtivaction, id, false);
            process.client ? window.getApp.$emit(refresh_data) : "";
          });
        }
      });
    }
  }
};

export const deleteDatas = {
  mixins: [alerts],
  data() {
    return {
      ids: [],
      deleting: {}
      // selected: [] Uma variavel declarada no componente
    };
  },
  methods: {
    handleDeleteMultiple() {
     
      let mthis = this;
      this.ids = [];
      // Já declarada no componente
      this.selected.forEach(function(selected) {
        mthis.ids.push(selected.id);
      });
      return this.ids;
    },

    onDelete(url, id, refresh_data, multiple_delete = false) {
       if (multiple_delete && this.selected.length == 0) {
         this.actionMsg("Nenhum registo selecionado para eliminar", "warning");
         return;
       }
      if (multiple_delete) {
        this.handleDeleteMultiple();
      } else {
        this.ids = id;
      }
      this.deleteAlert(
        "Eliminar Registo(s) ",
        this.selected.length > 1 && multiple_delete
          ? "Preste a Eliminar " + this.selected.length + " Registos"
          : "Eliminar este Registo"
      ).then(result => {
        if (result.value) {
          this.selected = [];
          this.delete(url, this.ids, refresh_data);
          this.ids = [];
        }
      });
    },

    async delete(url, id, refresh_data) {
      this.$set(this.deleting, id, true);
      let { msg } = await this.$axios.$delete(`/${url}/${id}`);
      this.$set(this.deleting, id, false);
      this.actionNotify("Operação Sucedida", msg, "success");
      process.client ? window.getApp.$emit(refresh_data) : "";
    }
  }
};

export const dataManage = {
  mixins: [alerts],
  data() {
    return {
      loading_external: {}
    };
  },
  methods: {
    async onManageExternalEntities(load_data, handle_modal) {
      this.loading_external = true;
      await this.$store.dispatch(load_data);
      this.loading_external = false;
      this.handleModal(handle_modal);
    }
  }
};
