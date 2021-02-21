<template>
  <el-form
    ref="markForm"
    :model="formData"
    :rules="markFormValidation"
    label-width="120px"
    :label-position="device == 'mobile' ? 'top' : 'left'"
  >
    <el-form-item
      prop="designation"
      label="Designação"
      :error="showFormErrors('designation')"
    >
      <el-input
        placeholder="Deseguinação do marco histórico"
        v-model="formData.designation"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="content"
      label="Descrição do marco"
      :error="showFormErrors('content')"
    >
      <el-input
        :autosize="{ minRows: 3, maxRows: 6 }"
        type="textarea"
        v-model="formData.content"
      ></el-input>
    </el-form-item>

      
    <el-form-item :error="showFormErrors('begin')" label="Início" prop="begin">
      <el-date-picker
        :value="formData.begin"
        class="w-full"
        v-model="formData.begin"
        type="date"
        placeholder="Data inicio deste marco histórico"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item :error="showFormErrors('end')" label="Término" prop="end">
      <el-date-picker
        :value="formData.end"
        class="w-full"
        v-model="formData.end"
        type="date"
        placeholder="Data de conclução deste marco histórico"
      >
      </el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
import { requests } from "@/mixins/appRequest";
import { mark_validation } from "@/mixins/fieldsValidation";
export default {
  name: "MarkForm",

  mixins: [requests, mark_validation],
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
    async addMark() {
      await this.addData(
        "markForm",
        "marks",
        "Marco Registado",
        "APP_UPDATE_MARKS_DATA",
        "marks/toggleCreateMarkDialog"
      );
    },

    updateMark() {
      this.updateData(
        "markForm",
        "marks",
        "Marco Atualizado",
        "APP_UPDATE_MARKS_DATA",
        "marks/toggleCreateMarkDialog"
      );
    },

    cancelMarkForm() {
      this.resetFormFields("markForm");
      this.handleModal("marks/toggleCreateMarkDialog");
    }
  }
};
</script>
