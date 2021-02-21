<template>
  <el-form
    ref="muralForm"
    :model="formData"
    :rules="muralFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="designation"
      label="Designação"
      :error="showFormErrors('designation')"
    >
      <el-input
        placeholder="Designação do Mural"
        v-model="formData.designation"
      ></el-input>
    </el-form-item>

    <el-form-item label="Descrião">
      <el-input
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
import { mural_validation } from "@/mixins/fieldsValidation";
export default {
  name: "MuralForm",

  mixins: [requests, mural_validation],
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
      return [{ key: "ios-home", name: "Casa" }];
    },
    device() {
      return this.$store.state.app.device;
    }
  },

  methods: {
    async addMural() {
      await this.addData(
        "muralForm",
        "murals",
        "Mural Registado",
        "APP_UPDATE_MURALS_DATA",
        "murals/toggleCreateMuralDialog"
      );
    },

    updateMural() {
      this.updateData(
        "muralForm",
        "murals",
        "Mural Atualizado",
        "APP_UPDATE_MURALS_DATA",
        "murals/toggleCreateMuralDialog"
      );
    },

    cancelMuralForm() {
      this.resetFormFields("muralForm");
      this.handleModal("murals/toggleCreateMuralDialog");
    }
  }
};
</script>
