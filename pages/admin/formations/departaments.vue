<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateDepartament()"
          >Registar Novo Departamento</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveDepartament()"
          @update-data="onUpdateDepartament()"
          @cancel-data="cancelDepartamentForm()"
          :dialogVisible="create_departament_dialog"
          :dialogTitle="departament_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingDepartament"
        >
          <appBackendFormsDepartament
            :creating="creatingDepartament"
            :formData="formData"
            ref="departamentForm"
          ></appBackendFormsDepartament>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'departaments'"
          :updateEntity="'APP_UPDATE_DEPARTAMENTS_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="departaments"
          @handleEdit="onEditDepartament($event)"
          @handleDelete="onDeleteDepartament($event)"
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
  name: "DepartamentsIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("departaments/getDepartaments", 1);
  },

  data() {
    return {
      creatingDepartament: "",
      selected: [],
      tableFields: [
        { label: "Nome", name: "name" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleDepartament: {},
      formData: {
        id: "",
        name: "",
        description: "",
      }
    };
  },

  computed: {
    ...mapGetters({
      departaments: "departaments/departaments"
      //   pagination: "departaments/pagination"
    }),
    create_departament_dialog: {
      get() {
        return this.$store.state.departaments.create_departament_dialog;
      },
      set(val) {
        this.$store.commit("departaments/create_departament_dialog", val);
      }
    },
    departament_dialog_title() {
      return this.creatingDepartament ? "Registar Departamento" : "Editar Departamento";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_DEPARTAMENTS_DATA", () => {
        this.getDepartaments(1);
      });
    }
  },

  methods: {
    async cancelDepartamentForm() {
      this.$refs.departamentForm.cancelDepartamentForm();
    },
    async onSaveDepartament() {
      this.$refs.departamentForm.addDepartament();
    },
    async onUpdateDepartament() {
      this.$refs.departamentForm.updateDepartament();
    },
    async onCreateDepartament() {
      this.resetFormData();
      this.creatingDepartament = true;
      await this.handleModal("departaments/toggleCreateDepartamentDialog");
    },

    async onEditDepartament(ev) {
      this.creatingDepartament = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`departaments/${ev[1].id}`).then(res => {
          this.singleDepartament = res.data;
          this.formData = this.singleDepartament;
          this.handleModal("departaments/toggleCreateDepartamentDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteDepartament(ev) {
      this.onDelete("departaments", ev[1].id, "APP_UPDATE_DEPARTAMENTS_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        description: "",
      };
    },

    async getDepartaments(page) {
      await this.$store.dispatch("departaments/getDepartaments", page);
    }
  }
};
</script>
