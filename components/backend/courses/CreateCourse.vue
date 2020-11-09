<template>
  <div>
     <Modal
      width="740"
      v-model="create_course_dialog"
      title="Criar utilizador"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <course-form :formData="formData" :creating="true"></course-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CreateCourse",

  data() {
    return {
       formData: {
        id:'',
        name: "",
        abbr: "",
        summary: "",
        presentation: "",
        release: "",
        requirement: "",
        duration_type: "3",
        duration: "2",
        status: false,
        featured: false,
        type: "",
        color: "#3E4095",
        cover: null,
        departament_id: "",
        family_id: "",
        outcomes: [],
        teachers: [
          {
            coordination: {
              teacher_id: "",
              start_date: "",
              end_date: ""
            }
          }
        ],

        disciplines: []
      }
    }
  },

   computed: {
    create_course_dialog: {
      get() {
        return this.$store.state.courses.create_course_dialog;
      },
      set(val) {
        this.$store.commit("courses/create_course_dialog", val);
      }
    }
  },

  methods: {
    AddUserData() {
      process.client ? window.getApp.$emit("APP_CREATE_COURSE") : "";
    }
  },

  components: {
    CourseForm: () => import("@/components/backend/forms/CourseForm")
  }
};
</script>

<style lang="scss" scoped></style>
