<template>
  <div>
    <Upload
      :disabled="fileList && fileList.length == 1"
      :show-upload-list="false"
      :on-success="handleFileSuccess"
      :max-size="maxFileSize"
      :on-format-error="handleFormatError"
      :format="fileFormats"
      :on-exceeded-size="handleMaxSize"
      :on-error="handleError"
      :type="uploadType"
      :action="fileActions"
      :headers="{
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest'
      }"
    >
      <div class="p-2">
        <Icon
          type="ios-cloud-upload"
          size="52"
          :class="
            fileList && fileList.length == 1 ? 'text-gray-600' : 'text-primary'
          "
        ></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>
    <div class="demo-upload-list" v-for="(item, i) in fileList" :key="i">
      <template v-if="item.status === 'finished'">
        <img class="w-full h-full" v-if="fileFormData" :src="tempFileUrl" />
        <div class="demo-upload-list-cover">
          <Icon
            size="32"
            class="text-gray-100 cursor-pointer"
            @click.native="handleRemoveFile(item)"
            type="ios-trash"
          />
        </div>
      </template>
      <template v-else>
        <div>
          <Progress
            v-if="item.showProgress"
            :percent="item.percentage"
            text-inside
          />
        </div>
      </template>
    </div>
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
    uploadType: {
      type: String,
      default: "drag"
    },
    fileActions: {
      type: String,
      default: ""
    },
    tempFileUrl: {
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
    }
  },

  methods: {
    handleFileSuccess(res) {
      this.$emit("onFileSuccess", res);
    },

    handleRemoveFile(item) {
      this.$emit("onRemoveFile", item);
    },

    // HandleErrors
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
</script>

<style lang="css" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
