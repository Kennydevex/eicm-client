<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="antialiased text-gray-700 "
              >Registar um novo curso</span
            >
          </div>

          <div>
            <appBackendFormsCourse
              :creating="creatingCourse"
              :formData="formData"
              ref="courseForm"
            ></appBackendFormsCourse>
          </div>

          <el-divider></el-divider>

          <div class="flex items-end justify-end">
            <el-button @click.stop="cancelCourseForm()">Cancelar</el-button>
            <el-button type="primary" @click.stop="onSaveCourse()"
              >Guardar Artigo</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CreateCourse",
  layout: "admin",

  async fetch({ store }) {

    await store.dispatch("departaments/getDepartaments");
    await store.dispatch("families/getFamilies");
    await store.dispatch("outcomes/getOutcomes");
    await store.dispatch("teachers/getActivedTeachers");
    await store.dispatch("disciplines/getDisciplines");
  },

  data() {
    return {
      creatingCourse: true,

      formData: {
        id: "",
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

  methods: {
    async onSaveCourse() {
      await this.$refs.courseForm.addCourse();
    },

    async cancelCourseForm() {
      this.$refs.courseForm.cancelCourseForm();
      this.redirectToPageByName("courses");
    }
  }
};
</script>

<style lang="scss" scoped></style>
