<template>
  <div>
    <Modal
      width="640"
      v-model="update_testimonial_dialog"
      title="Editar Testemunho"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <testimonial-form
        :formData="formData"
        :creating="false"
      ></testimonial-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateTestimonial",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        institution: "",
        job_title: "",
        message: "",
        avatar: null,
        type: ""
      }
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_TESTIMONIAL", testimonial => {
        if (testimonial) this.setTestimonialUpdateForm(testimonial);
      });
    }
  },

  computed: {
    update_testimonial_dialog: {
      get() {
        return this.$store.state.testimonials.update_testimonial_dialog;
      },
      set(val) {
        this.$store.commit("testimonials/update_testimonial_dialog", val);
      }
    }
  },

  methods: {
    async setTestimonialUpdateForm(testimonial) {
      this.formData = testimonial;
    }
  },

  components: {
    TestimonialForm: () => import("@/components/backend/forms/TestimonialForm")
  }
};
</script>
