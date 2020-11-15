<template>
  <div class="p-3">
    <Form
      ref="testimonialForm"
      :model="formData"
      :rules="testimonialFormValidation"
      label-position="top"
    >
      <Row :gutter="16">
        <Col span="24">
          <FormItem :error="showFormErrors('name')" label="Nome" prop="name">
            <Input
              v-model="formData.name"
              placeholder="Insira o nome do testemunhador"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem prop="institution" :error="showFormErrors('institution')" label="Instituição">
            <Input
              v-model="formData.institution"
              placeholder="Insira o nome da instituição"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem prop="job_title" :error="showFormErrors('job_title')" label="Cargo/Posição">
            <Input
              v-model="formData.job_title"
              placeholder="Insira o cargo deste testemunhador"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem
            prop="message"
            :error="showFormErrors('message')"
            label="Mensagem/Testemunho"
          >
            <Input
              type="textarea"
              :rows="3"
              v-model="formData.message"
              placeholder="Apresente o testemunho aqui"
            ></Input>
          </FormItem>
        </Col>

       

        <Col span="12">
          <FormItem
            prop="type"
            label="Tipo de Testimunho"
            :error="showFormErrors('type')"
          >
            <Select  v-model="formData.type">
              <Option value="1">Colaborador da Escola</Option>
              <Option value="2">Antigo Colaborador da Escola</Option>
              <Option value="3">Estudante</Option>
              <Option value="4">Antigo Estudante</Option>
              <Option value="5">Fez Formação na Escola</Option>
              <Option value="6">Outro</Option>
            </Select>
          </FormItem>
        </Col>
        </Col>

        <Col span="24">
          <FormItem prop="avatar" label="Avatar/Imgaem de perfil">
            <base-file-upload
              ref="testimonialAvatar"
              :uploadMsg="'Clique ou largue a imagem aqui'"
              :fileList="uploadAvatarList"
              :fileActions="
                `${$axios.defaults.baseURL}/upload-testimonial-avatar`
              "
              :tempFileUrl="
                `${publicURL}/uploads/schools/testimonials/${formData.avatar}`
              "
              :fileFormData="formData.avatar"
              @onFileSuccess="handleAvatarSuccess($event)"
              @onRemoveFile="handleRemoveAvatar($event)"
            ></base-file-upload>
          </FormItem>
        </Col>
      </Row>

      <FormItem>
        <div class="flex justify-end">
          <Button
            @click="resetFormFields('testimonialForm')"
            style="margin-right: 8px"
            >Limpar</Button
          >

          <Button
            @click="
              creating
                ? handleModal('testimonials/toggleCreateTestimonialDialog')
                : handleModal('testimonials/toggleUpdateTestimonialDialog')
            "
            >Cancelar</Button
          >

          <Button
            :loading="sending"
            type="primary"
            style="margin-left: 8px"
            @click.stop="
              creating
                ? addData(
                    'testimonialForm',
                    'testimonials',
                    'Parceiro Registado',
                    'APP_UPDATE_TESTIMONIALS_DATA',
                    'testimonials/toggleCreateTestimonialDialog'
                  )
                : updateData(
                    'testimonialForm',
                    'testimonials',
                    'Parceiro Atualizado',
                    'APP_UPDATE_TESTIMONIALS_DATA',
                    'testimonials/toggleUpdateTestimonialDialog'
                  )
            "
            ><span v-if="!sending">{{
              creating ? "Registar" : "Atualizar"
            }}</span>
            <span v-else>Enviando...</span></Button
          >
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { uploadFeedback } from "@/mixins/handleFileUploads";
import { testimonial_validation } from "@/mixins/fieldsValidation";
import { alerts } from "@/mixins/appAlerts";
export default {
  name: "TestimonialForm",

  mixins: [requests, uploadFeedback, testimonial_validation, alerts],

  props: {
    creating: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      uploadAvatarList: []
    };
  },

  mounted() {
    this.initFilesUploaded();
  },

  methods: {
    handleAvatarSuccess(res) {
      this.formData.avatar = res;
      this.uploadAvatarList = this.$refs.testimonialAvatar.$refs.uploadFileComponent.fileList;
    },

    async handleRemoveAvatar() {
      let avatar = this.formData.avatar;
      const res = await this.$axios.post("remove-testimonial-avatar", {
        avatar: avatar
      });
      if (res.status != 200) {
        this.formData.avatar = avatar;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadAvatarList = this.$refs.testimonialAvatar.$refs.uploadFileComponent.clearFiles();
      this.formData.avatar = "";
    },

    initFilesUploaded() {
      if (this.creating) {
        this.uploadAvatarList = this.$refs.testimonialAvatar.$refs.uploadFileComponent.fileList;
        return;
      }

      this.uploadAvatarList.push({
        response: this.formData.avatar,
        status: "finished"
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
