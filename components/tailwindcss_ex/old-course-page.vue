<template>
  <div>
    <Row>
      <Col span="24"> </Col>

      <Col span="24" class="my-5">
        <Row>
          <Col span="24">
            <Tabs type="card">
              <TabPane label="Cursos">标签一的内容</TabPane>
              <TabPane label="Disciplinas">标签二的内容</TabPane>
              <TabPane label="Departamentos">标签三的内容</TabPane>
              <TabPane label="Familias Profissionais">标签三的内容</TabPane>
              <TabPane label="Perfis de Saída">标签三的内容</TabPane>
            </Tabs>
          </Col>
        </Row>
        <Button
          :loading="creating_course"
          type="primary"
          @click.stop="onCreateCourse()"
        >
          <span v-if="!creating_course">Novo Curso</span>
          <span v-else>Solicitando...</span></Button
        >
        <!--<Button
          :loading="loading_disciplines"
          type="dashed"
          @click.stop="onManageDisciplines()"
        >
          <span v-if="!loading_disciplines">Gerir Disciplinas</span>
          <span v-else>Carregando...</span></Button
        >

        <Button
          :loading="loading_families"
          type="dashed"
          @click.stop="onManageFamilies()"
        >
          <span v-if="!loading_families">Gerir Familias</span>
          <span v-else>Carregando...</span></Button
        >

        <Button
          :loading="loading_departaments"
          type="dashed"
          @click.stop="onManageDepartaments()"
        >
          <span v-if="!loading_departaments">Gerir Departamentos</span>
          <span v-else>Carregando...</span></Button
        >

        <Button
          :loading="loading_outcomes"
          type="dashed"
          @click.stop="onManageOutcomes()"
        >
          <span v-if="!loading_outcomes">Gerir Perfil</span>
          <span v-else>Carregando...</span></Button
        >
        <Button v-if="selected.length > 1" type="dashed"
          >Elminar Selecionados</Button
        >-->
        <create-course></create-course>
        <update-course></update-course>
        <disciplines-index></disciplines-index>
        <families-index></families-index>
        <departaments-index></departaments-index>
        <outcomes-index></outcomes-index>
      </Col>

      <Col span="24">
        <Table
          border
          :columns="courses_header"
          :data="courses"
          context-menu
          show-context-menu
          @on-contextmenu="handleContextMenu"
        >
          <template slot="contextMenu">
            <DropdownItem @click.native="handleContextMenuEdit"
              >Editar</DropdownItem
            >
            <DropdownItem
              @click.native="handleContextMenuDelete"
              style="color: #ed4014"
              >Eliminar</DropdownItem
            >
            <DropdownItem @click.native="handleContextMenuStatus">{{
              context_course.status ? "Desativar" : "Ativar"
            }}</DropdownItem>
            <DropdownItem @click.native="handleContextMenuFeatured">{{
              context_course.featured ? "Tirar Destaque" : "Destacar"
            }}</DropdownItem>
          </template>
          <template slot-scope="{ row }" slot="abbr">
            <strong>{{ row.abbr }}</strong>
          </template>
          <template slot-scope="{ row }" slot="release">
            <span>{{ $moment(row.release).format("l") }}</span>
          </template>
          <template slot-scope="{ row }" slot="status">
            <Tag type="dot" :color="row.status ? 'primary' : 'warning'">{{
              row.status ? "Ativo" : "Desativo"
            }}</Tag>
          </template>
          <template slot-scope="{ row }" slot="featured">
            <Tag type="dot" :color="row.featured ? 'primary' : 'warning'">{{
              row.featured ? "Destaque" : "Normal"
            }}</Tag>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              :loading="on_load_data_to_update[row.id]"
              @click="onUpdateCourse(row.id)"
            >
              <Icon v-if="!on_load_data_to_update[row.id]" type="md-create" />
            </Button>
            <Button
              type="error"
              size="small"
              :loading="deleting[row.id]"
              @click="onDelete('courses', row.id, 'APP_UPDATE_COURSES_DATA')"
            >
              <Icon v-if="!deleting[row.id]" type="md-trash"
            /></Button>
          </template>
        </Table>
      </Col>
    </Row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";

export default {
  name: "CoursePage",
  layout: "admin",
  mixins: [handleActivations, deleteDatas, requests],

  async fetch({ store }) {
    await store.dispatch("courses/getCourses");
  },

  data() {
    return {
      context_course: {},
      loading_disciplines: false,
      loading_departaments: false,
      loading_families: false,
      loading_outcomes: false,

      on_load_data_to_update: {},
      creating_course: false,
      selected: [],
      context_course: {},
      single_course: [],
      courses_header: [
        {
          title: "Abr",
          slot: "abbr",
          width: 70,
          align: "center"
        },
        {
          title: "Name",
          key: "name",
          minWidth: 150
        },
        {
          title: "Lançamento",
          slot: "release",
          minWidth: 100,
          maxWidth: 150
        },
        {
          title: "Estado",
          slot: "status",
          width: 150,
          align: "center"
        },
        {
          title: "Destaque",
          slot: "featured",
          width: 150,
          align: "center"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  },

  computed: {
    ...mapGetters({
      courses: "courses/courses"
    })
  },
  async created() {
    // await this.$store.dispatch("permissions/getPermissions");
    // await this.$store.dispatch("permissions/getRoles");
    if (process.client) {
      window.getApp.$on("APP_UPDATE_COURSES_DATA", () => {
        this.getCourses();
      });
    }
  },
  methods: {
    async onCreateCourse() {
      this.creating_course = true;
      await this.loadExtraData();
      this.handleModal("courses/toggleCreateCourseDialog");
      this.creating_course = false;
    },

    async onUpdateCourse(id) {
      this.$set(this.on_load_data_to_update, id, true);
      await this.loadExtraData();
      await this.onUpdateData(
        id,
        "courses",
        "APP_ON_UPDATE_COURSE",
        "courses/toggleUpdateCourseDialog"
      );
      this.$set(this.on_load_data_to_update, id, false);
    },
    async onManageDisciplines() {
      this.loading_disciplines = true;
      await this.$store.dispatch("disciplines/getDisciplines");
      this.loading_disciplines = false;
      this.$store.commit("disciplines/toggleListDisciplineDialog");
    },
    async onManageFamilies() {
      this.loading_families = true;
      await this.$store.dispatch("families/getFamilies");
      this.loading_families = false;
      this.$store.commit("families/toggleListFamilyDialog");
    },
    async onManageDepartaments() {
      this.loading_departaments = true;
      await this.$store.dispatch("departaments/getDepartaments");
      this.loading_departaments = false;
      this.$store.commit("departaments/toggleListDepartamentDialog");
    },
    async onManageOutcomes() {
      this.loading_outcomes = true;
      await this.$store.dispatch("outcomes/getOutcomes");
      this.loading_outcomes = false;
      this.$store.commit("outcomes/toggleListOutcomeDialog");
    },
    async loadExtraData() {
      await this.$store.dispatch("departaments/getDepartaments");
      await this.$store.dispatch("families/getFamilies");
      await this.$store.dispatch("outcomes/getOutcomes");
      await this.$store.dispatch("teachers/getActivedTeachers");
      await this.$store.dispatch("disciplines/getDisciplines");
    },
    async getCourses() {
      await this.$store.dispatch("courses/getCourses");
    },

    handleContextMenu(row) {
      this.context_course = row;
    },
    handleContextMenuStatus() {
      this.toggleStatus(
        "courses/course-activation",
        this.context_course.id,
        this.context_course.status,
        "Curso",
        "APP_UPDATE_COURSES_DATA"
      );
    },
    handleContextMenuFeatured() {
      this.toggleStatus(
        "courses/course-featured",
        this.context_course.id,
        this.context_course.featured,
        "Curso",
        "APP_UPDATE_COURSES_DATA",
        true
      );
    },
    handleContextMenuEdit() {
      this.onUpdateCourse(this.context_course.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "courses",
        this.context_course.id,
        "APP_UPDATE_COURSES_DATA"
      );
    }
  },
  components: {
    CreateCourse: () => import("@/components/backend/courses/CreateCourse"),
    UpdateCourse: () => import("@/components/backend/courses/UpdateCourse"),
    DisciplinesIndex: () =>
      import("@/components/backend/disciplines/DisciplinesIndex"),
    FamiliesIndex: () => import("@/components/backend/families/FamiliesIndex"),
    DepartamentsIndex: () =>
      import("@/components/backend/departaments/DepartamentsIndex"),
    OutcomesIndex: () => import("@/components/backend/outcomes/OutcomesIndex")
  }
};
</script>

<style lang="scss" scoped></style>
