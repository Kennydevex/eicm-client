<template>
  <el-form
    ref="partnerForm"
    :model="formData"
    :rules="partnerFormValidation"
    label-width="120px"
    :label-position="device=='mobile'?'top':'left'"
  >
    <el-form-item prop="name" label="Parceiro" :error="showFormErrors('name')">
      <el-input
        placeholder="Introduza o nome do parceiro"
        v-model="formData.name"
      ></el-input>
    </el-form-item>

    <el-form-item
      :error="showFormErrors('description')"
      prop="description"
      label="Apresentação"
    >
      <el-input
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        v-model="formData.description"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="link"
      label="Página Web"
      :error="showFormErrors('link')"
    >
      <el-input
        placeholder="Insira a ligação do site do Parceiro"
        v-model="formData.link"
      >
        <template slot="prepend">Https://</template>
      </el-input>
    </el-form-item>

    <el-form-item label="Tipo" prop="type">
      <el-radio-group v-model="formData.type">
        <el-radio-button label="1">Prata</el-radio-button>
        <el-radio-button label="2">Bronze</el-radio-button>
        <el-radio-button label="3">Ouro</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item prop="status" label="Ativação">
      <el-switch
        active-text="Ativo"
        inactive-text="Inativo"
        v-model="formData.status"
      >
      </el-switch>
    </el-form-item>

    <el-form-item prop="logo" label="Logotipo">
      <baseImageUpload
        ref="partnerLogo"
        :uploadMsg="'Clique ou largue o logotipo aqui'"
        :fileActions="`${$axios.defaults.baseURL}/upload-partner-logo`"
        :fileList="uploadLogoList"
        @onFileSuccess="handleLogoSuccess($event)"
        @onRemoveFile="handleRemoveLogo($event)"
      ></baseImageUpload>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { uploadFeedback } from "@/mixins/handleFileUploads";

import { partner_validation } from "@/mixins/fieldsValidation";
export default {
  name: "PartnerForm",

  mixins: [requests, partner_validation, uploadFeedback],
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

  data() {
    return {
      uploadLogoList: [],
      disabledUpload: false
    };
  },

  computed: {
    device() {
      return this.$store.state.app.device;
    }
  },

  methods: {
    async addPartner() {
      await this.addData(
        "partnerForm",
        "partners",
        "Parceiro Registada",
        "APP_UPDATE_PARTNERS_DATA",
        "partners/toggleCreatePartnerDialog"
      );
      this.$refs.partnerLogo.$refs.uploadImageComponent.clearFiles();
    },

    updatePartner() {
      this.updateData(
        "partnerForm",
        "partners",
        "Parceiro Atualizada",
        "APP_UPDATE_PARTNERS_DATA",
        "partners/toggleCreatePartnerDialog"
      );
      this.$refs.partnerLogo.$refs.uploadImageComponent.clearFiles();
    },

    cancelPartnerForm() {
      this.resetFormFields("partnerForm");
      if (this.formData.logo && this.formData.logo != "default.svg") {
        this.handleRemoveLogo();
      }
      // this.$refs.partnerLogo.$refs.uploadImageComponent.clearFiles()
      this.handleModal("partners/toggleCreatePartnerDialog");
    },

    handleLogoSuccess(res) {
      this.formData.logo = res;
      if (
        this.formData.logo &&
        this.$refs.partnerLogo.$refs.uploadImageComponent.uploadFiles.length > 0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadLogoList = this.$refs.partnerLogo.$refs.uploadImageComponent.clearFiles();
      }
    },

    async handleRemoveLogo() {
      let logo = this.formData.logo;
      if (logo.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-partner-logo", {
        logo: logo
      });
      if (res.status != 200) {
        this.formData.logo = logo;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadLogoList = this.$refs.partnerLogo.$refs.uploadImageComponent.clearFiles();
      this.formData.logo = "";
      this.disabledUpload = false;
    },

    initFilesUploaded() {
      this.uploadLogoList = [];
      if (
        !this.creating &&
        this.formData.logo &&
        !this.formData.logo.includes("default")
      ) {
        this.uploadLogoList.push({
          name: this.formData.logo,
          response: this.formData.logo,
          percentage: 100,
          status: "success",
          url: `${this.publicURL}/uploads/schools/partners/${this.formData.logo}`
        });
      }
    }
  }
};
</script>
