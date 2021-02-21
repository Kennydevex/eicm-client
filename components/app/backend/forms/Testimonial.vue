<template>
  <el-form
    ref="testimonialForm"
    :model="formData"
    :rules="testimonialFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="name"
      label="Nome"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Introduza o nome do testemunho"
        v-model="formData.name"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="institution"
      label="Instituição"
      :error="showFormErrors('institution')"
    >
      <el-input
        placeholder="Introduza o nome da instituição"
        v-model="formData.institution"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="job_title"
      label="Cargo/Posição"
      :error="showFormErrors('job_title')"
    >
      <el-input
        placeholder="Insira o cargo deste testemunhador"
        v-model="formData.job_title"
      ></el-input>
    </el-form-item>

    <el-form-item
      :error="showFormErrors('message')"
      prop="message"
      label="Mensagem"
    >
      <el-input
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        placeholder="Apresente o testemunho aqui"
        v-model="formData.message"
      ></el-input>
    </el-form-item>

    <el-form-item label="Tipo" prop="type">
      <el-radio-group v-model="formData.type">
        <el-radio-button class="my-1" label="1">Colaborador da Escola</el-radio-button>
        <el-radio-button class="my-1" label="2"
          >Antigo Colaborador da Escola</el-radio-button
        >
        <el-radio-button class="my-1" label="3">Estudante</el-radio-button>
        <el-radio-button class="my-1" label="4">Antigo Estudante</el-radio-button>
        <el-radio-button class="my-1" label="5">Fez Formação na Escola</el-radio-button>
        <el-radio-button class="my-1" label="6">Admirador da Escola</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <!--<el-form-item prop="status" label="Ativação">
      <el-switch
        active-text="Ativo"
        inactive-text="Inativo"
        v-model="formData.status"
      >
      </el-switch>
    </el-form-item>-->

    <el-form-item prop="avatar" label="Avatar">
      <baseImageUpload
        ref="testimonialAvatar"
        :uploadMsg="'Clique ou largue o avatartipo aqui'"
        :fileActions="`${$axios.defaults.baseURL}/upload-testimonial-avatar`"
        :fileList="uploadAvatarList"
        @onFileSuccess="handleAvatarSuccess($event)"
        @onRemoveFile="handleRemoveAvatar($event)"
      ></baseImageUpload>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { uploadFeedback } from "@/mixins/handleFileUploads";

import { testimonial_validation } from "@/mixins/fieldsValidation";
export default {
  name: "TestimonialForm",

  mixins: [requests, testimonial_validation, uploadFeedback],
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
      uploadAvatarList: [],
      disabledUpload: false
    };
  },

  computed: {
    device() {
      return this.$store.state.app.device;
    }
  },

  methods: {
    async addTestimonial() {
      await this.addData(
        "testimonialForm",
        "testimonials",
        "Permissão Registada",
        "APP_UPDATE_TESTIMONIALS_DATA",
        "testimonials/toggleCreateTestimonialDialog"
      );
      this.$refs.testimonialAvatar.$refs.uploadImageComponent.clearFiles();
    },

    updateTestimonial() {
      this.updateData(
        "testimonialForm",
        "testimonials",
        "Permissão Atualizada",
        "APP_UPDATE_TESTIMONIALS_DATA",
        "testimonials/toggleCreateTestimonialDialog"
      );
      this.$refs.testimonialAvatar.$refs.uploadImageComponent.clearFiles();
    },

    cancelTestimonialForm() {
      this.resetFormFields("testimonialForm");
      if (this.formData.avatar && this.formData.avatar != "default.svg") {
        this.handleRemoveAvatar();
      }
      // this.$refs.partnerLogo.$refs.uploadImageComponent.clearFiles();
      this.handleModal("testimonials/toggleCreateTestimonialDialog");
    },

    handleAvatarSuccess(res) {
      this.formData.avatar = res;
      if (
        this.formData.avatar &&
        this.$refs.testimonialAvatar.$refs.uploadImageComponent.uploadFiles
          .length > 0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadAvatarList = this.$refs.testimonialAvatar.$refs.uploadImageComponent.clearFiles();
      }
    },

    async handleRemoveAvatar() {
      let avatar = this.formData.avatar;
      if (avatar.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-testimonial-avatar", {
        avatar: avatar
      });
      if (res.status != 200) {
        this.formData.avatar = avatar;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadAvatarList = this.$refs.testimonialAvatar.$refs.uploadImageComponent.clearFiles();
      this.formData.avatar = "";
      this.disabledUpload = false;
    },

    initFilesUploaded() {
      this.uploadAvatarList = [];
      if (
        !this.creating &&
        this.formData.avatar &&
        !this.formData.avatar.includes("default")
      ) {
        this.uploadAvatarList.push({
          name: this.formData.avatar,
          response: this.formData.avatar,
          percentage: 100,
          status: "success",
          url: `${this.publicURL}/uploads/schools/testimonials/${this.formData.avatar}`
        });
      }
    }
  }
};
</script>
