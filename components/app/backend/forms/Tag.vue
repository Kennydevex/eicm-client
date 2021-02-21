<template>
  <el-form
    ref="tagForm"
    :model="formData"
    :rules="tagFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="name"
      label="Nome"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Nome do Marcador"
        v-model="formData.name"
      ></el-input>
    </el-form-item>

    <el-form-item label="Descrião">
      <el-input
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        v-model="formData.description"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { requests } from "@/mixins/appRequest";
import { tag_validation } from "@/mixins/fieldsValidation";
export default {
  name: "TagForm",
  mixins: [requests, tag_validation],
  props: {
    creating: {
      type: Boolean,
      default: true,
      required: false
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    }
  },

  computed: {
    device() {
      return this.$store.state.app.device;
    }
  },
  methods: {
    async addTag() {
      await this.addData(
        "tagForm",
        "tags",
        "Marcador Registado",
        "APP_UPDATE_TAGS_DATA",
        "tags/toggleCreateTagDialog"
      );
    },

    updateTag() {
      this.updateData(
        "tagForm",
        "tags",
        "Marcador Atualizado",
        "APP_UPDATE_TAGS_DATA",
        "tags/toggleCreateTagDialog"
      );
    },

    cancelTagForm() {
      this.resetFormFields("tagForm");
      this.handleModal("tags/toggleCreateTagDialog");
    }
  }
};
</script>
