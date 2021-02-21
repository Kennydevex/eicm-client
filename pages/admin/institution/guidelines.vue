<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button
          size="medium"
          type="primary"
          @click.stop="onCreateGuideline()"
          >Registar Nova Diretriz</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveGuideline()"
          @update-data="onUpdateGuideline()"
          @cancel-data="cancelGuidelineForm()"
          :dialogVisible="create_guideline_dialog"
          :dialogTitle="guideline_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingGuideline"
        >
          <appBackendFormsGuideline
            :creating="creatingGuideline"
            :formData="formData"
            ref="guidelineForm"
          ></appBackendFormsGuideline>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :deleteEntity="'guidelines'"
          :updateEntity="'APP_UPDATE_GUIDELINES_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Designação', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="guidelines"
          @handleEdit="onEditGuideline($event)"
          @handleDelete="onDeleteGuideline($event)"
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
  name: "GuidelinesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("guidelines/getGuidelines", 1);
  },

  data() {
    return {
      creatingGuideline: "",
      selected: [],
      tableFields: [
        { label: "Designação", name: "name" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleGuideline: {},
      formData: {
        id: "",
        name: "",
        description: "",
        icon: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      guidelines: "guidelines/guidelines"
    }),
    create_guideline_dialog: {
      get() {
        return this.$store.state.guidelines.create_guideline_dialog;
      },
      set(val) {
        this.$store.commit("guidelines/create_guideline_dialog", val);
      }
    },
    guideline_dialog_title() {
      return this.creatingGuideline ? "Registar Diretriz" : "Editar Diretriz";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_GUIDELINES_DATA", () => {
        this.getGuidelines(1);
      });
    }
  },

  methods: {
    async cancelGuidelineForm() {
      this.$refs.guidelineForm.cancelGuidelineForm();
    },
    async onSaveGuideline() {
      this.$refs.guidelineForm.addGuideline();
    },
    async onUpdateGuideline() {
      this.$refs.guidelineForm.updateGuideline();
    },
    async onCreateGuideline() {
      this.resetFormData();
      this.creatingGuideline = true;
      await this.handleModal("guidelines/toggleCreateGuidelineDialog");
    },

    async onEditGuideline(ev) {
      this.creatingGuideline = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`guidelines/${ev[1].id}`).then(res => {
          this.singleGuideline = res.data;
          this.formData = this.singleGuideline;
          this.handleModal("guidelines/toggleCreateGuidelineDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteGuideline(ev) {
      this.onDelete("guidelines", ev[1].id, "APP_UPDATE_GUIDELINES_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        description: "",
        icon: ""
      };
    },

    async getGuidelines(page) {
      await this.$store.dispatch("guidelines/getGuidelines", page);
    }
  }
};
</script>
