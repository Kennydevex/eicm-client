<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button
          :loading_data="loading_data"
          size="medium"
          type="primary"
          @click.stop="redirectToPageByName('create-course')"
          ><span v-if="!loading_data">Criar Novo Curso</span>
          <span v-else>Solicitando dados...</span></el-button
        >
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
      selected: [],
      tableFields: [
        { label: "Abreviatura", name: "abbr" },
        { label: "Nome", name: "name" }
      ],
      sending: {},
      singleCourse: {},
      loading_data: false
    };
  },

  computed: {
    ...mapGetters({
      courses: "courses/courses"
    })
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_COURSES_DATA", () => {
        this.getCourses(1);
      });
    }
  },

  methods: {
    async onCreateCourse() {
      this.redirectToPageByName("create-course");
    },

    async onEditCourse(ev) {
      await this.redirectToPageWithParam("edit-course", ev[1].slug);
    },

    onDeleteCourse(ev) {
      this.onDelete("courses", ev[1].id, "APP_UPDATE_COURSES_DATA");
    },

    async getCourses(page) {
      await this.$store.dispatch("courses/getCourses", page);
    }
  }
};
</script>
