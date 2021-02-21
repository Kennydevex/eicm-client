<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateFamily()"
          >Registar Nova Família</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveFamily()"
          @update-data="onUpdateFamily()"
          @cancel-data="cancelFamilyForm()"
          :dialogVisible="create_family_dialog"
          :dialogTitle="family_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingFamily"
        >
          <appBackendFormsFamily
            :creating="creatingFamily"
            :formData="formData"
            ref="familyForm"
          ></appBackendFormsFamily>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :tableFields="tableFields"
          :deleteEntity="'families'"
          :updateEntity="'APP_UPDATE_FAMILIES_DATA'"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="families"
          @handleEdit="onEditFamily($event)"
          @handleDelete="onDeleteFamily($event)"
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
  name: "FamiliesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("families/getFamilies", 1);
  },

  data() {
    return {
      creatingFamily: "",
      selected: [],
      tableFields: [
        { label: "Nome", name: "name" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleFamily: {},
      formData: {
        id: "",
        name: "",
        description: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      families: "families/families"
      //   pagination: "families/pagination"
    }),
    create_family_dialog: {
      get() {
        return this.$store.state.families.create_family_dialog;
      },
      set(val) {
        this.$store.commit("families/create_family_dialog", val);
      }
    },
    family_dialog_title() {
      return this.creatingFamily ? "Registar Família" : "Editar Família";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_FAMILIES_DATA", () => {
        this.getFamilies(1);
      });
    }
  },

  methods: {
    async cancelFamilyForm() {
      this.$refs.familyForm.cancelFamilyForm();
    },
    async onSaveFamily() {
      this.$refs.familyForm.addFamily();
    },
    async onUpdateFamily() {
      this.$refs.familyForm.updateFamily();
    },
    async onCreateFamily() {
      this.resetFormData();
      this.creatingFamily = true;
      await this.handleModal("families/toggleCreateFamilyDialog");
    },
    async onEditFamily(ev) {
      this.creatingFamily = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`families/${ev[1].id}`).then(res => {
          this.singleFamily = res.data;
          this.formData = this.singleFamily;
          this.handleModal("families/toggleCreateFamilyDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteFamily(ev) {
      this.onDelete("families", ev[1].id, "APP_UPDATE_FAMILIES_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        description: ""
      };
    },

    async getFamilies(page) {
      await this.$store.dispatch("families/getFamilies", page);
    }
  }
};
</script>
