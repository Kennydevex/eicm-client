<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button
          size="medium"
          type="primary"
          @click.stop="onCreateTestimonial()"
          >Registar Novo Testemunho</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveTestimonial()"
          @update-data="onUpdateTestimonial()"
          @cancel-data="cancelTestimonialForm()"
          :dialogVisible="create_testimonial_dialog"
          :dialogTitle="testimonial_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingTestimonial"
        >
          <appBackendFormsTestimonial
            :creating="creatingTestimonial"
            :formData="formData"
            ref="testimonialForm"
          ></appBackendFormsTestimonial>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'testimonials'"
          :updateEntity="'APP_UPDATE_TESTIMONIALS_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="testimonials"
          @handleEdit="onEditTestimonial($event)"
          @handleDelete="onDeleteTestimonial($event)"
        >
        </appBackendCommonDataTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";

export default {
  name: "TestimonialsIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("testimonials/getTestimonials", 1);
  },

  data() {
    return {
      creatingTestimonial: "",
      selected: [],
      tableFields: [{ label: "Nome", name: "name" }],
      sending: {},
      singleTestimonial: {},
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
    ...mapGetters({
      testimonials: "testimonials/testimonials"
      //   pagination: "testimonials/pagination"
    }),
    create_testimonial_dialog: {
      get() {
        return this.$store.state.testimonials.create_testimonial_dialog;
      },
      set(val) {
        this.$store.commit("testimonials/create_testimonial_dialog", val);
      }
    },
    testimonial_dialog_title() {
      return this.creatingTestimonial
        ? "Registar Testemunho"
        : "Editar Testemunho";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_TESTIMONIALS_DATA", () => {
        this.getTestimonials(1);
      });
    }
  },

  methods: {
    async cancelTestimonialForm() {
      this.$refs.testimonialForm.cancelTestimonialForm();
    },
    async onSaveTestimonial() {
      this.$refs.testimonialForm.addTestimonial();
    },
    async onUpdateTestimonial() {
      this.$refs.testimonialForm.updateTestimonial();
    },
    async onCreateTestimonial() {
      this.resetFormData();
      this.creatingTestimonial = true;
      await this.handleModal("testimonials/toggleCreateTestimonialDialog");
    },

    async onEditTestimonial(ev) {
      this.creatingTestimonial = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`testimonials/${ev[1].id}`).then(res => {
          this.singleTestimonial = res.data;
          this.formData = this.singleTestimonial;
          this.handleModal("testimonials/toggleCreateTestimonialDialog");
          this.$set(this.sending, ev[1].id, false);
        });
        this.$refs.testimonialForm.initFilesUploaded();
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteTestimonial(ev) {
      this.onDelete("testimonials", ev[1].id, "APP_UPDATE_TESTIMONIALS_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        institution: "",
        job_title: "",
        message: "",
        avatar: null,
        type: ""
      };
    },

    async getTestimonials(page) {
      await this.$store.dispatch("testimonials/getTestimonials", page);
    }
  }
};
</script>
