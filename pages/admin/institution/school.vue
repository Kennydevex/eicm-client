<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateSchool()"
          >Registo da Instituição</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveSchool()"
          @update-data="onUpdateSchool()"
          @cancel-data="cancelSchoolForm()"
          :dialogVisible="create_school_dialog"
          :dialogTitle="school_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingSchool"
        >
          <appBackendFormsSchool
            :creating="creatingSchool"
            :formData="formData"
            ref="schoolForm"
          ></appBackendFormsSchool>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24"> 
        <appBackendCommonDataTable
          :tableFields="tableFields"
          :searchParams="[
            { name: 'Nome', key: 'name' },
            { name: 'Abbr', key: 'abbr' }
          ]"
          :sendingData="sending"
          :dataSourse="schools"
          @handleEdit="onEditSchool($event)"
          @handleDelete="onDeleteSchool($event)"
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
  name: "SchoolsIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("schools/getSchools", 1);
    await store.dispatch("guidelines/getGuidelines");
    await store.dispatch("marks/getMarks");
    await store.dispatch("murals/getMurals");
  },

  data() {
    return {
      creatingSchool: false,
      selected: [],
      tableFields: [
        { label: "Abreviatura", name: "abbr" },
        { label: "Nome", name: "name" }
      ],
      sending: {},
      singleSchool: {},
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
    ...mapGetters({
      schools: "schools/schools"
    }),
    create_school_dialog: {
      get() {
        return this.$store.state.schools.create_school_dialog;
      },
      set(val) {
        this.$store.commit("schools/create_school_dialog", val);
      }
    },
    school_dialog_title() {
      return this.creatingSchool ? "Registar Utilizador" : "Editar Utilizador";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_SCHOOLS_DATA", () => {
        this.getSchools(1);
      });
    }
  },

  methods: {
    async cancelSchoolForm() {
      this.$refs.schoolForm.cancelSchoolForm();
    },
    async onSaveSchool() {
      this.$refs.schoolForm.addSchool();
    },
    async onUpdateSchool() {
      this.$refs.schoolForm.updateSchool();
    },
    async onCreateSchool() {
      this.resetFormData();
      this.creatingSchool = true;
      await this.handleModal("schools/toggleCreateSchoolDialog");
    },

    async onEditSchool(ev) {
      this.creatingSchool = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`schools/${ev[1].id}`).then(res => {
          this.singleSchool = res.data;
          this.formData = this.singleSchool;
          this.handleModal("schools/toggleCreateSchoolDialog");
          this.$set(this.sending, ev[1].id, false);
        });
        this.$refs.schoolForm.initFilesUploaded();
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteSchool(ev) {
      this.onDelete("schools", ev[1].id, "APP_UPDATE_SCHOOLS_DATA");
    },

    resetFormData() {
      this.formData = {
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
      };
    },

    async getSchools(page) {
      await this.$store.dispatch("schools/getSchools", page);
    }
  }
};
</script>
