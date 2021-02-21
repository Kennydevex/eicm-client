<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button
          :loading_data="loading_data"
          size="medium"
          type="primary"
          @click.stop="onCreateCourse()"
          ><span v-if="!loading_data">Registo do Curso/Área</span>
          <span v-else>Solicitando dados...</span></el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveCourse()"
          @update-data="onUpdateCourse()"
          @cancel-data="cancelCourseForm()"
          :dialogVisible="create_course_dialog"
          :dialogTitle="course_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingCourse"
        >
          <appBackendFormsCourse
            :creating="creatingCourse"
            :formData="formData"
            ref="courseForm"
          ></appBackendFormsCourse>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :deleteEntity="'courses'"
          :updateEntity="'APP_UPDATE_COURSES_DATA'"
          :tableFields="tableFields"
          :searchParams="[
            { name: 'Nome', key: 'name' },
            { name: 'Abbr', key: 'abbr' }
          ]"
          :sendingData="sending"
          :dataSourse="courses"
          @handleEdit="onEditCourse($event)"
          @handleDelete="onDeleteCourse($event)"
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
  name: "CoursesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("courses/getCourses");
  },

  data() {
    return {
      creatingCourse: false,
      selected: [],
      tableFields: [
        { label: "Abreviatura", name: "abbr" },
        { label: "Nome", name: "name" }
      ],
      sending: {},
      singleCourse: {},
      loading_data: false,
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

  computed: {
    ...mapGetters({
      courses: "courses/courses"
    }),
    create_course_dialog: {
      get() {
        return this.$store.state.courses.create_course_dialog;
      },
      set(val) {
        this.$store.commit("courses/create_course_dialog", val);
      }
    },
    course_dialog_title() {
      return this.creatingCourse ? "Registar Curso/Área" : "Editar Curso/Área";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_COURSES_DATA", () => {
        this.getCourses(1);
      });
    }
  },

  methods: {
    async cancelCourseForm() {
      this.$refs.courseForm.cancelCourseForm();
    },
    async onSaveCourse() {
      this.$refs.courseForm.addCourse();
    },
    async onUpdateCourse() {
      this.$refs.courseForm.updateCourse();
    },
    async onCreateCourse() {
      this.loading_data = true;
      this.resetFormData();
      this.creatingCourse = true;
      await this.loadExtraData();
      this.loading_data = false;

      await this.handleModal("courses/toggleCreateCourseDialog");
    },

    async onEditCourse(ev) {
      this.creatingCourse = false;
      try {
        this.$set(this.sending, ev[1].slug, true);
        await this.$axios.$get(`courses/${ev[1].slug}`).then(res => {
          this.singleCourse = res.data;
          this.formData = this.singleCourse;
          this.handleModal("courses/toggleCreateCourseDialog");
        });
        this.loadExtraData();
        this.$set(this.sending, ev[1].slug, false);
        this.$refs.courseForm.initFilesUploaded();
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteCourse(ev) {
      this.onDelete("courses", ev[1].id, "APP_UPDATE_COURSES_DATA");
    },

    resetFormData() {
      this.formData = {
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
      };
    },

    async getCourses(page) {
      await this.$store.dispatch("courses/getCourses", page);
    },

    async loadExtraData() {
      await this.$store.dispatch("departaments/getDepartaments");
      await this.$store.dispatch("families/getFamilies");
      await this.$store.dispatch("outcomes/getOutcomes");
      await this.$store.dispatch("teachers/getActivedTeachers");
      await this.$store.dispatch("disciplines/getDisciplines");
    }
  }
};
</script>
