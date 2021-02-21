<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateMural()"
          >Registar Novo Mural</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveMural()"
          @update-data="onUpdateMural()"
          @cancel-data="cancelMuralForm()"
          :dialogVisible="create_mural_dialog"
          :dialogTitle="mural_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingMural"
        >
          <appBackendFormsMural
            :creating="creatingMural"
            :formData="formData"
            ref="muralForm"
          ></appBackendFormsMural>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :deleteEntity="'murals'"
          :updateEntity="'APP_UPDATE_MURALS_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Designação', key: 'designation' }]"
          :sendingData="sending"
          :dataSourse="murals"
          @handleEdit="onEditMural($event)"
          @handleDelete="onDeleteMural($event)"
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
  name: "MuralsIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("murals/getMurals", 1);
  },

  data() {
    return {
      creatingMural: "",
      selected: [],
      tableFields: [
        { label: "Designação", name: "designation" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleMural: {},
      formData: {
        id: "",
        designation: "",
        description: "",
        icon: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      murals: "murals/murals"
      //   pagination: "murals/pagination"
    }),
    create_mural_dialog: {
      get() {
        return this.$store.state.murals.create_mural_dialog;
      },
      set(val) {
        this.$store.commit("murals/create_mural_dialog", val);
      }
    },
    mural_dialog_title() {
      return this.creatingMural ? "Registar Mural" : "Editar Mural";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_MURALS_DATA", () => {
        this.getMurals(1);
      });
    }
  },

  methods: {
    async cancelMuralForm() {
      this.$refs.muralForm.cancelMuralForm();
    },
    async onSaveMural() {
      this.$refs.muralForm.addMural();
    },
    async onUpdateMural() {
      this.$refs.muralForm.updateMural();
    },
    async onCreateMural() {
      this.resetFormData();
      this.creatingMural = true;
      await this.handleModal("murals/toggleCreateMuralDialog");
    },

    async onEditMural(ev) {
      this.creatingMural = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`murals/${ev[1].id}`).then(res => {
          this.singleMural = res.data;
          this.formData = this.singleMural;
          this.handleModal("murals/toggleCreateMuralDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteMural(ev) {
      this.onDelete("murals", ev[1].id, "APP_UPDATE_MURALS_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        designation: "",
        description: "",
        icon: ""
      };
    },

    async getMurals(page) {
      await this.$store.dispatch("murals/getMurals", page);
    }
  }
};
</script>
