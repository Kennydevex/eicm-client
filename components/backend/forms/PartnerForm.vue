<template>
  <div class="p-3">
    <Form
      ref="partnerForm"
      :model="formData"
      :rules="partnerFormValidation"
      label-position="top"
    >
      <Row :gutter="16">
        <Col span="24">
          <FormItem
            :error="showFormErrors('name')"
            label="Nome do Parceiro"
            prop="name"
          >
            <Input
              v-model="formData.name"
              placeholder="Insira o nome do parceiro"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem prop="description" :error="showFormErrors('description')" label="Apresentação">
            <Input
              type="textarea"
              :rows="3"
              v-model="formData.description"
              placeholder="Apresentação do parceiro"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem prop="link" :error="showFormErrors('link')" label="Ligação">
            <Input
              v-model="formData.link"
              placeholder="Insira o nome do parceiro"
            >
              <span slot="prepend">Site</span>
            </Input>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem
            prop="type"
            label="Tipo de Parceiro"
            :error="showFormErrors('type')"
          >
            <Select v-model="formData.type">
              <Option value="1">Prata</Option>
              <Option value="2">Ouro</Option>
              <Option value="3">Diamante</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <Row>
            <Col span="12">
              <FormItem prop="status" label="Ativação do parceiro">
                <i-switch v-model="formData.status" size="large">
                  <span slot="open">Sim</span>
                  <span slot="close">Não</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
        </Col>

        <Col span="24">
          <FormItem  prop="logo"  label="Logotipo do Parceiro/Empresa">
            <base-file-upload
              ref="partnerLogo"
              :uploadMsg="'Clique ou largue a imagem aqui'"
              :fileList="uploadLogoList"
              :fileActions="`${$axios.defaults.baseURL}/upload-partner-logo`"
              :tempFileUrl="
                `${publicURL}/uploads/schools/partners/${formData.logo}`
              "
              :fileFormData="formData.logo"
              @onFileSuccess="handleLogoSuccess($event)"
              @onRemoveFile="handleRemoveLogo($event)"
            ></base-file-upload>
          </FormItem>
        </Col>
      </Row>

      <FormItem>
        <div class="flex justify-end">
          <Button
            @click="resetFormFields('partnerForm')"
            style="margin-right: 8px"
            >Limpar</Button
          >

          <Button
            @click="
              creating
                ? handleModal('partners/toggleCreatePartnerDialog')
                : handleModal('partners/toggleUpdatePartnerDialog')
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
                    'partnerForm',
                    'partners',
                    'Parceiro Registado',
                    'APP_UPDATE_PARTNERS_DATA',
                    'partners/toggleCreatePartnerDialog'
                  )
                : updateData(
                    'partnerForm',
                    'partners',
                    'Parceiro Atualizado',
                    'APP_UPDATE_PARTNERS_DATA',
                    'partners/toggleUpdatePartnerDialog'
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
import { partner_validation } from "@/mixins/fieldsValidation";
import { alerts } from "@/mixins/appAlerts";
export default {
  name: "PartnerForm",

  mixins: [requests, uploadFeedback, partner_validation, alerts],

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
      uploadLogoList: []
    };
  },

  mounted() {
    this.initFilesUploaded();
  },

  methods: {
    handleLogoSuccess(res) {
      this.formData.logo = res;
      this.uploadLogoList = this.$refs.partnerLogo.$refs.uploadFileComponent.fileList;
    },

    async handleRemoveLogo() {
      let logo = this.formData.logo;
      const res = await this.$axios.post("remove-partner-logo", {
        logo: logo
      });
      if (res.status != 200) {
        this.formData.logo = logo;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadLogoList = this.$refs.partnerLogo.$refs.uploadFileComponent.clearFiles();
      this.formData.logo = "";
    },

    initFilesUploaded() {
      if (this.creating) {
        this.uploadLogoList = this.$refs.partnerLogo.$refs.uploadFileComponent.fileList;
        return;
      }

      this.uploadLogoList.push({
        response: this.formData.logo,
        status: "finished"
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
