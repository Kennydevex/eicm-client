export const alerts = {
  methods: {
    feedback(alert_type, title, text = "") {
      this.$swal({
        toast: true,
        position: "top-end",
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        width: "300px",
        showCloseButton: true,
        icon: alert_type
      });
    },

    deleteAlert(
      msg,
      text = "Ação iurreversível, queres continuar?",
      confirmText = "Eliminar",
      cancelText = "Cancelar"
    ) {
      return this.$swal({
        title: msg,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, " + confirmText,
        cancelButtonText: "Não, " + cancelText
      });
    },

    activationAlert(status, entity, featured = false) {
      return this.$swal({
        title: !featured
          ? status
            ? `Desativar ${entity}?`
            : `Ativar ${entity}?`
          : status
          ? `Tirar Destaque do ${entity}?`
          : `Destacar ${entity}?`,
        text: "Tens certeza que queres efetuar esta ação?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: status ? "Confirmar" : "Confirmar",
        cancelButtonText: "Cancelar!"
      });
    }
  }
};
