export const uploadFeedback = {
  methods: {
    handleFormatError(file) {
      this.errorNotify(
        "Formato do arquivo",
        "Este formato de arquvo não é válido"
      );
    },
    handleMaxSize(file) {
      this.errorNotify(
        "Tamanho do arquivo",
        "O sistema suporta arquivo com máximo 2MB de dados"
      );
    },

    handleError(res, file) {
      this.errorNotify(
        "Formato do arquivo",
        `${
          file && file.errors.file.length
            ? file.errors.file[0]
            : "Algo correu mal, o arquivo não foi carregado"
        }`
      );
    }
  }
};
