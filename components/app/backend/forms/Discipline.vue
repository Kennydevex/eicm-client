<template>
  <el-form
    ref="disciplineForm"
    :model="formData"
    :rules="disciplineFormValidation"
    label-width="120px"
  >
    <el-form-item prop="name" label="Nome" :error="showFormErrors('name')">
      <el-input
        placeholder="Nome da Disciplina"
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
        <el-radio-button label="1">Disciplinas Gerais</el-radio-button>
        <el-radio-button label="2">Disciplinas Técnicas</el-radio-button>
        <el-radio-button label="3">Unidade Formativa</el-radio-button>
        <el-radio-button label="4">Módolo Fórmativo</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { discipline_validation } from "@/mixins/fieldsValidation";
export default {
  name: "DisciplineForm",

  mixins: [requests, discipline_validation],
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
      roles: "disciplines/roles"
    })
  },

  methods: {
    async addDiscipline() {
      await this.addData(
        "disciplineForm",
        "disciplines",
        "Disciplina Registada",
        "APP_UPDATE_DISCIPLINES_DATA",
        "disciplines/toggleCreateDisciplineDialog"
      );
    },

    updateDiscipline() {
      this.updateData(
        "disciplineForm",
        "disciplines",
        "Disciplina Atualizada",
        "APP_UPDATE_DISCIPLINES_DATA",
        "disciplines/toggleCreateDisciplineDialog"
      );
    },

    cancelDisciplineForm() {
      this.resetFormFields("disciplineForm");
      this.handleModal("disciplines/toggleCreateDisciplineDialog");
    }
  }
};
</script>
