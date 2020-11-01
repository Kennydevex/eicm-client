<template>
  <div>
    <Modal
      width="640"
      v-model="update_school_dialog"
      title="Editar utilizador"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <school-form :formData="formData" :creating="false"></school-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateSchool",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        abbr: "",
        about: "",
        history: "",
        slogan: "",
        logo: "",
        cover: "",
        opning: "",
        primary_color: "",
        secundary_color: "",
        contacts: [],
        marks: [],
        guidelines: [],
        murals: [],
        location: {
          id: "",
          country: "",
          state: "",
          county: "",
          parish: "",
          city: "",
          zone: "",
          street: "",
          postcode: "",
          geo: {
            id: "",
            lat: "",
            lng: ""
          }
        }
      }
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_SCHOOL", school => {
        if (school) this.setSchoolUpdateForm(school);
      });
    }
  },

  computed: {
    update_school_dialog: {
      get() {
        return this.$store.state.schools.update_school_dialog;
      },
      set(val) {
        this.$store.commit("schools/update_school_dialog", val);
      }
    }
  },

  methods: {
    async setSchoolUpdateForm(school) {
      this.formData = school;
    }
  },

  components: {
    SchoolForm: () => import("@/components/backend/forms/SchoolForm")
  }
};
</script>
