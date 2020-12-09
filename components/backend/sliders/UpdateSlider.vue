<template>
  <div>
    <Modal
      width="840"
      v-model="update_slider_dialog"
      title="Editar Slider"
      footer-hide
      scrollable
      :mask-closable="false"
      :styles="{ top: '20px' }"
    >
      <slider-form :formData="formData" :creating="false"></slider-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateSlider",
  data() {
    return {
      formData: {
        id: "",
        title: "",
        description: "",
        slider_dst: "",
        link: "",
        btn_text: "",
        btn_style: "1",
        background: "default.svg",
        color: "#3E4095",
        type: "3",
        status: false
      }
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_SLIDER", slider => {
        if (slider) this.setSliderUpdateForm(slider);
      });
    }
  },

  computed: {
    update_slider_dialog: {
      get() {
        return this.$store.state.sliders.update_slider_dialog;
      },
      set(val) {
        this.$store.commit("sliders/update_slider_dialog", val);
      }
    }
  },

  methods: {
    async setSliderUpdateForm(slider) {
      this.formData = slider;
    }
  },

  components: {
    SliderForm: () => import("@/components/backend/forms/SliderForm")
  }
};
</script>
