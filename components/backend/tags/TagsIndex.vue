<template>
  <div>
    <Modal
      width="740"
      v-model="list_tag_dialog"
      title="Gerir Marcadores"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <list-tags></list-tags>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "tagsIndex",

  components: {
    ListTags: () => import("@/components/backend/tags/ListTags")
  },

  computed: {
    list_tag_dialog: {
      get() {
        return this.$store.state.tags.list_tag_dialog;
      },
      set(val) {
        this.$store.commit("tags/list_tag_dialog", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
