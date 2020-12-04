<template>
  <div>
    <Modal
      width="840"
      v-model="create_slider_dialog"
      title="Criar Slider"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <slider-form :formData="formData" :creating="true"></slider-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateSlider",
  data() {
    return {
      formData: {
        id: "",
        title: "",
        description: "",
        link: "",
        btn_text: "",
        btn_style: "1",
        background: "default.svg",
        color: '',
        type: '3',
        status: false,
      }
    };
  },

  computed: {
    create_slider_dialog: {
      get() {
        return this.$store.state.sliders.create_slider_dialog;
      },
      set(val) {
        this.$store.commit("sliders/create_slider_dialog", val);
      }
    }
  },

  components: {
    SliderForm: () => import("@/components/backend/forms/SliderForm")
  }
};
</script>

<style lang="scss" scoped></style>
