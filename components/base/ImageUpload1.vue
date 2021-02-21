<template>
  <div>
    {{ fileList }}
    <el-upload
      ref="uploadImageComponent"
      :on-remove="handleRemoveFile"
      :on-preview="handlePictureCardPreview"
      :on-success="handleFileSuccess"
      :limit="1"
      accept="image/*"
      :before-upload="beforeUpload"
      :on-error="handleError"
      :on-exceed="handleExceededLimit"
      :action="fileActions"
      :headers="{
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest'
      }"
    >
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    modalData: {
      type: String,
      default: undefined
    },

    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fileFormats: {
      type: Array,
      default: () => {
        return ["jpg", "jpeg", "png"];
      }
    },

    fileFieldRef: {
      type: String,
      default: ""
    },
    uploadMsg: {
      type: String,
      default: "Click ou carregue e largue o seu arquivo aqui"
    },
    uploadType: {
      type: String,
      default: "drag"
    },
    fileActions: {
      type: String,
      default: ""
    },
    maxFileSize: {
      type: Number,
      default: 2048
    },
    fileFormData: {
      type: String,
      default: "file"
    },
    fileSize: {
      type: Number,
      default: 1
    },

    disabledUpload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },

  computed: {
    // fileList() {
    //   return  this.$refs.uploadImageComponent.uploadFiles;
    // }
  },
  methods: {
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    // },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/PNG";
      const hasLimit = file.size / 1024 / 1024 < this.$props.fileSize;
      if (!isJPG || isPNG) {
        this.actionNotify(
          "Formato do arquivo",
          `Carrege um arquivo JPEG ou PNG`,
          "warning"
        );
      }

      if (!hasLimit) {
        this.actionNotify(
          "Tamanho do arquivo",
          `O tamanho do arquivo não pode ser maior de ${this.$props.fileSize} MB`,
          "warning"
        );
      }
      return (isJPG || isPNG) && hasLimit;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleFileSuccess(res) {
      this.$emit("onFileSuccess", res);
    },

    handleRemoveFile(file) {
      this.$emit("onRemoveFile", file);
    },

    // HandleErrors
    handleFormatError(file) {
      this.actionNotify(
        "Formato do arquivo",
        "Formato do arquivo inválido, tente carregar apenas imgens",
        "warning"
      );
    },
    handleExceededLimit(file) {
      this.actionNotify(
        "Numero de arquivos",
        "Aceita-se apenas um arquivo, altere o que já foi carregado para carregar um outro",
        "warning"
      );
    },

    handleError(res, file) {
      this.$refs.uploadImageComponent.clearFiles();
      this.actionNotify(
        "Falha na operação",
        "Alguma coisa não está certo, verefique novamente",
        "error"
      );
    }
  }
};
</script>
