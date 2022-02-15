<template>
  <div>
    <el-upload
      ref="uploadImageComponent"
      list-type="picture-card"
      :file-list="fileList"
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
      <i slot="default" class="el-icon-plus"></i>

      <div slot="file" slot-scope="{ file }">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt="Imagem carregado"
        />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in"></i>
          </span>

          <span
            v-if="!disabled"
            @click="handleRemoveFile(file)"
            class="el-upload-list__item-delete"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
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
    beforeUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpg";
      const isWebp = file.type === "image/webp";
      const hasLimit = file.size / 1024 / 1024 < this.$props.fileSize;
      if (!isJPG || !isPNG || !isWebp || !isJPEG) {
        this.actionNotify(
          "Formato do arquivo",
          `O formato da imagem não é suportado`,
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
      return (isJPG || isPNG || isWebp || isJPEG) && hasLimit;
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
