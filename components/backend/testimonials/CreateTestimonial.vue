<template>
  <div>
    <Modal
      width="640"
      v-model="create_testimonial_dialog"
      title="Criar Testemunho"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
      :styles="{ top: '20px' }"
    >
      <testimonial-form
        :formData="formData"
        :creating="true"
      ></testimonial-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateTestimonial",

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

  computed: {
    create_testimonial_dialog: {
      get() {
        return this.$store.state.testimonials.create_testimonial_dialog;
      },
      set(val) {
        this.$store.commit("testimonials/create_testimonial_dialog", val);
      }
    }
  },

  components: {
    TestimonialForm: () => import("@/components/backend/forms/TestimonialForm")
  }
};
</script>

<style lang="scss" scoped></style>
