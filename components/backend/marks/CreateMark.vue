<template>
  <div>
    <Modal
      width="640"
      v-model="create_mark_dialog"
      title="Criar Marco"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <mark-form :formData="formData" :creating="true"></mark-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateMark",

  data() {
    return {
      formData: {
        id: "",
        designation: "",
        content: "",
        begin: "",
        end: ""
      }
    };
  },

  computed: {
    create_mark_dialog: {
      get() {
        return this.$store.state.marks.create_mark_dialog;
      },
      set(val) {
        this.$store.commit("marks/create_mark_dialog", val);
      }
    }
  },

  components: {
    MarkForm: () => import("@/components/backend/forms/MarkForm")
  }
};
</script>

<style lang="scss" scoped></style>
