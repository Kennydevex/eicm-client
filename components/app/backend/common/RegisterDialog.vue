<template>
  <el-dialog
    custom-class="w-full rounded-lg shadow-xl md:w-1/2"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :show-close="false"
  >
    <template slot="title">
      <div class="pb-3 text-sm font-medium border-b text-primary">
        {{ dialogTitle }}
      </div>
    </template>
    <slot></slot>

    <template slot="footer">
      <div class="pt-3 border-t">
        <el-button
          size="medium"
          @click="cancelData()"
          >Cancelar</el-button
        >
        <el-button
          size="medium"
          type="primary"
          @click="creatingRecord ? saveData() : updateData()"
          >{{ creatingRecord ? "Registar" : "Atualizar" }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "RegisterDialog",

  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
      required: true
    },

    dialogTitle: {
      type: String,
      default: "Register",
      required: false
    },
    dialogWidth: {
      type: Number,
      default: 400,
      required: false
    },
    creatingRecord: {
      type: Boolean,
      default: false,
      required: true
    },
    saveLoading: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  methods: {
    cancelData() {
      this.$emit("cancel-data");
    },
    saveData() {
      this.$emit("save-data");
    },
    updateData() {
      this.$emit("update-data");
    }
  }
};
</script>
