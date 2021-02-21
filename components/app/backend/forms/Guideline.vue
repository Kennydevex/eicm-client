<template>
  <el-form
    ref="guidelineForm"
    :model="formData"
    :rules="guidelineFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="name"
      label="Designação"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Designação da Diretriz"
        v-model="formData.name"
      ></el-input>
    </el-form-item>

    <el-form-item label="Descrião">
      <el-input
        placeholder="Insira uma pequena descrição desta diretriz"
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        v-model="formData.description"
      ></el-input>
    </el-form-item>

    <el-form-item prop="icon" label="Icone">
      <el-select
        class="w-full"
        placeholder="Selecionar um ícone"
        v-model="formData.icon"
      >
        <template v-for="(icon, i) in icons">
          <el-option :key="i" :value="icon.key" :label="icon.name"></el-option>
        </template>
      </el-select>
    </el-form-item>
  </el-form>
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
    icons() {
      return [
        { key: "ios-compass", name: "Missão" },
        { key: "ios-eye", name: "Visão" },
        { key: "md-checkmark-circle-outline", name: "Valores" }
      ];
    },
    device() {
      return this.$store.state.app.device;
    }
  },

  methods: {
    async addGuideline() {
      await this.addData(
        "guidelineForm",
        "guidelines",
        "Diretriz Registada",
        "APP_UPDATE_GUIDELINES_DATA",
        "guidelines/toggleCreateGuidelineDialog"
      );
    },

    updateGuideline() {
      this.updateData(
        "guidelineForm",
        "guidelines",
        "Diretriz Atualizada",
        "APP_UPDATE_GUIDELINES_DATA",
        "guidelines/toggleCreateGuidelineDialog"
      );
    },

    cancelGuidelineForm() {
      this.resetFormFields("guidelineForm");
      this.handleModal("guidelines/toggleCreateGuidelineDialog");
    }
  }
};
</script>
