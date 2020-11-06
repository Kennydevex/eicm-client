<template>
  <div>
    <Modal
      width="640"
      v-model="create_school_dialog"
      title="Registo da escola"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <school-form :formData="formData" :creating="true"></school-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateSchool",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        abbr: "",
        about: "",
        history: "",
        slogan: "",
        logo: "default.svg",
        cover: "default.svg",
        opning: "",
        primary_color: "",
        secundary_color: "",
        contacts: [],
        marks: [],
        guidelines: [],
        murals: [],
        location: {
          id: "",
          country: "Cabo Verde",
          state: "São Vicente",
          county: "São Vicente",
          parish: "Nossa Srª da Luz",
          city: "Mindelo",
          zone: "Laginha",
          street: "Rua Faed",
          postcode: "7100",
          geo: {
            id: "",
            lat: "",
            lng: ""
          }
        }
      }
    };
  },

  computed: {
    create_school_dialog: {
      get() {
        return this.$store.state.schools.create_school_dialog;
      },
      set(val) {
        this.$store.commit("schools/create_school_dialog", val);
      }
    }
  },

  methods: {
    AddSchoolData() {
      process.client ? window.getApp.$emit("APP_CREATE_SCHOOL") : "";
    }
  },

  components: {
    SchoolForm: () => import("@/components/backend/forms/SchoolForm")
  }
};
</script>
