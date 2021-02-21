<template>
  <el-form
    ref="outcomeForm"
    :model="formData"
    :rules="outcomeFormValidation"
    label-width="120px"
  >
    <el-form-item
      prop="name"
      label="Designação"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Designação da Saída"
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

    <el-form-item label="Tipo" prop="type">
      <el-radio-group v-model="formData.type">
        <el-radio-button label="1">Académica</el-radio-button>
        <el-radio-button label="2">Profissional</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { outcome_validation } from "@/mixins/fieldsValidation";
export default {
  name: "OutcomeForm",

  mixins: [requests, outcome_validation],
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
    ...mapGetters({
      roles: "outcomes/roles"
    })
  },

  methods: {
    async addOutcome() {
      await this.addData(
        "outcomeForm",
        "outcomes",
        "Saída Registada",
        "APP_UPDATE_OUTCOMES_DATA",
        "outcomes/toggleCreateOutcomeDialog"
      );
    },

    updateOutcome() {
      this.updateData(
        "outcomeForm",
        "outcomes",
        "Saída Atualizada",
        "APP_UPDATE_OUTCOMES_DATA",
        "outcomes/toggleCreateOutcomeDialog"
      );
    },

    cancelOutcomeForm() {
      this.resetFormFields("outcomeForm");
      this.handleModal("outcomes/toggleCreateOutcomeDialog");
    }
  }
};
</script>
