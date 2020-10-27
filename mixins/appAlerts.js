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

    activationAlert(status, entity) {
      return this.$swal({
        title: status ? "Desativar " + entity + "?" : "Ativar " + entity + "?",
        text: "Tens certeza que queres efetuar esta ação?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: status ? "Sim, Desativar" : "Sim, Ativar",
        cancelButtonText: "Cancelar!"
      });
    }
  }
};
