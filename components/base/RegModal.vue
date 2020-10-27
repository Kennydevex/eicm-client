<template>
  <div>
    <Modal
      width="640"
      v-model="modal"
      :title="title"
      :footer-hide="footerHide"
      :scrollable="scrollable"
      :mask-closable="maskClosable"
      :class-name="className"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    footerHide: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: "vertical-center-modal"
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 640
    },

    title: String
  }
};
</script>

<style lang="scss" scoped></style>
