<template>
  <div class="px-3">
    <Form
      ref="guidelineForm"
      :model="formData"
      :rules="guidelineFormValidation"
      label-position="right"
      :label-width="80"
    >
      <Row>
        <Col span="24">
          <FormItem prop="name" label="Nome" :error="showFormErrors('name')">
            <Input
              v-model="formData.name"
              placeholder="Nome da diretriz"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem
            prop="description"
            label="Descrição da diretriz"
            :error="showFormErrors('description')"
          >
            <Input
              type="textarea"
              :rows="3"
              v-model="formData.description"
              placeholder="Insira uma pequena descrição desta diretriz"
            ></Input>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem prop="icon" label="Icone">
            <Select placeholder="Selecionar um ícone" v-model="formData.icon">
              <Icon :type="formData.icon" slot="prefix"></Icon>
              <template v-for="(icon, i) in icons">
                <Option :key="i" :value="icon.key">{{ icon.name }}</Option>
              </template>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('guidelineForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >
              <Button @click="cancelGuideline()">Cancelar</Button>
              <Button
                :loading="sending"
                type="primary"
                style="margin-left: 8px"
                @click.stop="
                  creating
                    ? addData(
                        'guidelineForm',
                        'guidelines',
                        'Diretriz regsitado',
                        'APP_UPDATE_GUIDELINES_DATA',
                        'guidelines/toggleCreateGuidelineDialog'
                      )
                    : updateData(
                        'guidelineForm',
                        'guidelines',
                        'Diretriz Atualizado',
                        'APP_UPDATE_GUIDELINES_DATA',
                        'guidelines/toggleUpdateGuidelineDialog'
                      )
                "
                ><span v-if="!sending">{{
                  creating ? "Registar" : "Atualizar"
                }}</span>
                <span v-else>Enviando...</span></Button
              >
            </div>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { guideline_validation } from "@/mixins/fieldsValidation";

export default {
  name: "GuidelineForm",
  mixins: [requests, guideline_validation],
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
      icons: [
        { key: "ios-compass", name: "Missão" },
        { key: "ios-eye", name: "Visão" },
        { key: "md-checkmark-circle-outline", name: "Valores" }
      ]
    };
  },

  methods: {
    cancelGuideline() {
      if (this.creating) {
        this.handleModal("guidelines/toggleCreateGuidelineDialog");
        this.resetFormFields("guidelineForm");
        return;
      }
      this.handleModal("guidelines/toggleUpdateGuidelineDialog");
    }
  }
};
</script>

<style lang="css"></style>
