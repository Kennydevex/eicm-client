<template>
  <div>
    <Modal
      width="640"
      v-model="update_mark_dialog"
      title="Editar Marco"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <mark-form :formData="formData" :creating="false"></mark-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateMark",
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
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_MARK", mark => {
        if (mark) this.setMarkUpdateForm(mark);
      });
    }
  },

  computed: {
    update_mark_dialog: {
      get() {
        return this.$store.state.marks.update_mark_dialog;
      },
      set(val) {
        this.$store.commit("marks/update_mark_dialog", val);
      }
    }
  },

  methods: {
    async setMarkUpdateForm(mark) {
      this.formData = mark;
    }
  },

  components: {
    MarkForm: () => import("@/components/backend/forms/MarkForm")
  }
};
</script>
