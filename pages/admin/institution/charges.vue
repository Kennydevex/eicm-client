<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateCharge()"
          >Registar Novo Cargo</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSaveCharge()"
          @update-data="onUpdateCharge()"
          @cancel-data="cancelChargeForm()"
          :dialogVisible="create_charge_dialog"
          :dialogTitle="charge_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingCharge"
        >
          <appBackendFormsCharge
            :creating="creatingCharge"
            :formData="formData"
            ref="chargeForm"
          ></appBackendFormsCharge>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'charges'"
          :updateEntity="'APP_UPDATE_CHARGES_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="charges"
          @handleEdit="onEditCharge($event)"
          @handleDelete="onDeleteCharge($event)"
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
  name: "ChargesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("charges/getCharges", 1);
  },

  data() {
    return {
      creatingCharge: "",
      selected: [],
      tableFields: [
        { label: "Nome", name: "name" },
        { label: "Descrição", name: "description" }
      ],
      sending: {},
      singleCharge: {},
      formData: {
        id: "",
        name: "",
        description: "",
        section: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      charges: "charges/charges"
      //   pagination: "charges/pagination"
    }),
    create_charge_dialog: {
      get() {
        return this.$store.state.charges.create_charge_dialog;
      },
      set(val) {
        this.$store.commit("charges/create_charge_dialog", val);
      }
    },
    charge_dialog_title() {
      return this.creatingCharge ? "Registar Cargo" : "Editar Cargo";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_CHARGES_DATA", () => {
        this.getCharges(1);
      });
    }
  },

  methods: {
    async cancelChargeForm() {
      this.$refs.chargeForm.cancelChargeForm();
    },
    async onSaveCharge() {
      this.$refs.chargeForm.addCharge();
    },
    async onUpdateCharge() {
      this.$refs.chargeForm.updateCharge();
    },
    async onCreateCharge() {
      this.resetFormData();
      this.creatingCharge = true;
      await this.handleModal("charges/toggleCreateChargeDialog");
    },

    async onEditCharge(ev) {
      this.creatingCharge = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`charges/${ev[1].id}`).then(res => {
          this.singleCharge = res.data;
          this.formData = this.singleCharge;
          this.handleModal("charges/toggleCreateChargeDialog");
          this.$set(this.sending, ev[1].id, false);
        });
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteCharge(ev) {
      this.onDelete("charges", ev[1].id, "APP_UPDATE_CHARGES_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        description: "",
        section: ""
      };
    },

    async getCharges(page) {
      await this.$store.dispatch("charges/getCharges", page);
    }
  }
};
</script>
