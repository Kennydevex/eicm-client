<template>
  <div>
    <el-row>
      <el-col>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="antialiased text-gray-700 "
              >Editar Curso "<span class="italic text-gray-500">{{
                formData.name
              }}</span
              >"</span
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
            <el-button type="primary" @click.stop="onUpdateCourse()"
              >Guardar Arterações</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EditCourse",
  layout: "admin",

  async asyncData({ $axios, params }) {
    const { data } = await $axios.$get(`/courses/${params.slug}`);
    return { formData: data };
  },

  async fetch({ store }) {
    await store.dispatch("departaments/getDepartaments");
    await store.dispatch("families/getFamilies");
    await store.dispatch("outcomes/getOutcomes");
    await store.dispatch("teachers/getActivedTeachers");
    await store.dispatch("disciplines/getDisciplines");
  },
  data() {
    return {
      creatingCourse: false,
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
  mounted() {
    this.$refs.courseForm.initFilesUploaded();
  },

  methods: {
    async onUpdateCourse() {
      this.$refs.courseForm.updateCourse();
    },

    async cancelCourseForm() {
      this.$refs.courseForm.cancelCourseForm();
      this.redirectToPageByName("courses");
    }
  }
};
</script>

<style lang="scss" scoped></style>
