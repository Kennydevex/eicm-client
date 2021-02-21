<template>
  <el-form
    ref="chargeForm"
    :model="formData"
    :rules="chargeFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="name"
      label="Designação"
      :error="showFormErrors('name')"
    >
      <el-input
        placeholder="Designação do Cargo"
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

    <el-form-item label="Secção" prop="section">
      <el-radio-group v-model="formData.section">
        <el-radio-button label="1">Direção</el-radio-button>
        <el-radio-button label="2">Secretaria</el-radio-button>
        <el-radio-button label="3">Bibliotéca</el-radio-button>
        <el-radio-button label="4">Geral</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { charge_validation } from "@/mixins/fieldsValidation";
export default {
  name: "ChargeForm",

  mixins: [requests, charge_validation],
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
    async addCharge() {
      await this.addData(
        "chargeForm",
        "charges",
        "Cargo Registado",
        "APP_UPDATE_CHARGES_DATA",
        "charges/toggleCreateChargeDialog"
      );
    },

    updateCharge() {
      this.updateData(
        "chargeForm",
        "charges",
        "Cargo Atualizado",
        "APP_UPDATE_CHARGES_DATA",
        "charges/toggleCreateChargeDialog"
      );
    },

    cancelChargeForm() {
      this.resetFormFields("chargeForm");
      this.handleModal("charges/toggleCreateChargeDialog");
    }
  }
};
</script>
