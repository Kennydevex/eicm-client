<template>
  <div>
    <Modal
      width="540"
      v-model="create_tag_dialog"
      title="Criar Marcador"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <tag-form :formData="formData" :creating="true"></tag-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateTag",

  data() {
    return {
      formData: {
        id: "",
        name: "",
        description: "",
      }
    };
  },

  computed: {
    create_tag_dialog: {
      get() {
        return this.$store.state.tags.create_tag_dialog;
      },
      set(val) {
        this.$store.commit("tags/create_tag_dialog", val);
      }
    }
  },

  components: {
    TagForm: () => import("@/components/backend/forms/TagForm")
  }
};
</script>

<style lang="scss" scoped></style>
