<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateDiscipline()"
          >Registar Nova Disciplina</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveDiscipline()"
          @update-data="onUpdateDiscipline()"
          @cancel-data="cancelDisciplineForm()"
          :dialogVisible="create_discipline_dialog"
          :dialogTitle="discipline_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingDiscipline"
        >
          <appBackendFormsDiscipline
            :creating="creatingDiscipline"
            :formData="formData"
            ref="disciplineForm"
          ></appBackendFormsDiscipline>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'disciplines'"
          :updateEntity="'APP_UPDATE_DISCIPLINES_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="disciplines"
          @handleEdit="onEditDiscipline($event)"
          @handleDelete="onDeleteDiscipline($event)"
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
  name: "DisciplinesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("disciplines/getDisciplines", 1);
  },

  data() {
    return {
      creatingDiscipline: "",
      selected: [],
      tableFields: [
        { label: "Nome", name: "name" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleDiscipline: {},
      formData: {
        id: "",
        name: "",
        description: "",
        type: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      disciplines: "disciplines/disciplines"
      //   pagination: "disciplines/pagination"
    }),
    create_discipline_dialog: {
      get() {
        return this.$store.state.disciplines.create_discipline_dialog;
      },
      set(val) {
        this.$store.commit("disciplines/create_discipline_dialog", val);
      }
    },
    discipline_dialog_title() {
      return this.creatingDiscipline ? "Registar Disciplina" : "Editar Disciplina";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_DISCIPLINES_DATA", () => {
        this.getDisciplines(1);
      });
    }
  },

  methods: {
    async cancelDisciplineForm() {
      this.$refs.disciplineForm.cancelDisciplineForm();
    },
    async onSaveDiscipline() {
      this.$refs.disciplineForm.addDiscipline();
    },
    async onUpdateDiscipline() {
      this.$refs.disciplineForm.updateDiscipline();
    },
    async onCreateDiscipline() {
      this.resetFormData();
      this.creatingDiscipline = true;
      await this.handleModal("disciplines/toggleCreateDisciplineDialog");
    },

    async onEditDiscipline(ev) {
      this.creatingDiscipline = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`disciplines/${ev[1].id}`).then(res => {
          this.singleDiscipline = res.data;
          this.formData = this.singleDiscipline;
          this.handleModal("disciplines/toggleCreateDisciplineDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteDiscipline(ev) {
      this.onDelete("disciplines", ev[1].id, "APP_UPDATE_DISCIPLINES_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        description: "",
        type: ""
      };
    },

    async getDisciplines(page) {
      await this.$store.dispatch("disciplines/getDisciplines", page);
    }
  }
};
</script>
