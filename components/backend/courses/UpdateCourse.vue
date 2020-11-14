<template>
  <div>
    <Modal
      width="640"
      v-model="update_course_dialog"
      title="Editar Curso"
      footer-hide
      scrollable
      :mask-closable="false"
      class-name="vertical-center-modal"
    >
      <course-form :formData="formData" :creating="false"></course-form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UpdateCourse",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        abbr: "",
        summary: "",
        presentation: "",
        release: "",
        requirement: "",
        duration_type: "",
        duration: "",
        status: false,
        featured: false,
        type: "",
        color: "",
        cover: "",
        departament_id: "",
        family_id: "",
        outcomes: [],
        course_outcomes: [],
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
    };
  },
  created() {
    if (process.client) {
      window.getApp.$on("APP_ON_UPDATE_COURSE", course => {
        if (course) this.setCourseUpdateForm(course);
      });
    }
  },

  computed: {
    update_course_dialog: {
      get() {
        return this.$store.state.courses.update_course_dialog;
      },
      set(val) {
        this.$store.commit("courses/update_course_dialog", val);
      }
    }
  },

  methods: {
    async setCourseUpdateForm(course) {
      this.formData = course;
    }
  },

  components: {
    CourseForm: () => import("@/components/backend/forms/CourseForm")
  }
};
</script>
