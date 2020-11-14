<template>
  <div>
    <Modal
      width="540"
      v-model="update_tag_dialog"
      title="Editar Marcador"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <tag-form :formData="formData" :creating="false"></tag-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateTag",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
      }
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_TAG", tag => {
        if (tag) this.setTagUpdateForm(tag);
      });
    }
  },

  computed: {
    update_tag_dialog: {
      get() {
        return this.$store.state.tags.update_tag_dialog;
      },
      set(val) {
        this.$store.commit("tags/update_tag_dialog", val);
      }
    }
  },

  methods: {
    async setTagUpdateForm(tag) {
      this.formData = tag;
    }
  },

  components: {
    TagForm: () => import("@/components/backend/forms/TagForm")
  }
};
</script>
