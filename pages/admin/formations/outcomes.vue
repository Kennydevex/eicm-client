<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateOutcome()"
          >Registar Nova Saída</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveOutcome()"
          @update-data="onUpdateOutcome()"
          @cancel-data="cancelOutcomeForm()"
          :dialogVisible="create_outcome_dialog"
          :dialogTitle="outcome_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingOutcome"
        >
          <appBackendFormsOutcome
            :creating="creatingOutcome"
            :formData="formData"
            ref="outcomeForm"
          ></appBackendFormsOutcome>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'outcomes'"
          :updateEntity="'APP_UPDATE_OUTCOMES_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="outcomes"
          @handleEdit="onEditOutcome($event)"
          @handleDelete="onDeleteOutcome($event)"
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
  name: "OutcomesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("outcomes/getOutcomes", 1);
  },

  data() {
    return {
      creatingOutcome: "",
      selected: [],
      tableFields: [
        { label: "Nome", name: "name" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleOutcome: {},
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
      outcomes: "outcomes/outcomes"
      //   pagination: "outcomes/pagination"
    }),
    create_outcome_dialog: {
      get() {
        return this.$store.state.outcomes.create_outcome_dialog;
      },
      set(val) {
        this.$store.commit("outcomes/create_outcome_dialog", val);
      }
    },
    outcome_dialog_title() {
      return this.creatingOutcome ? "Registar Saída" : "Editar Saída";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_OUTCOMES_DATA", () => {
        this.getOutcomes(1);
      });
    }
  },

  methods: {
    async cancelOutcomeForm() {
      this.$refs.outcomeForm.cancelOutcomeForm();
    },
    async onSaveOutcome() {
      this.$refs.outcomeForm.addOutcome();
    },
    async onUpdateOutcome() {
      this.$refs.outcomeForm.updateOutcome();
    },
    async onCreateOutcome() {
      this.resetFormData();
      this.creatingOutcome = true;
      await this.handleModal("outcomes/toggleCreateOutcomeDialog");
    },

    async onEditOutcome(ev) {
      this.creatingOutcome = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`outcomes/${ev[1].id}`).then(res => {
          this.singleOutcome = res.data;
          this.formData = this.singleOutcome;
          this.handleModal("outcomes/toggleCreateOutcomeDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteOutcome(ev) {
      this.onDelete("outcomes", ev[1].id, "APP_UPDATE_OUTCOMES_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        description: "",
        type: ""
      };
    },

    async getOutcomes(page) {
      await this.$store.dispatch("outcomes/getOutcomes", page);
    }
  }
};
</script>
