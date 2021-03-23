<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreatePartner()"
          >Registar Novo Parceiro</el-button
        >
        <appBackendCommonRegisterDialog
          @save-data="onSavePartner()"
          @update-data="onUpdatePartner()"
          @cancel-data="cancelPartnerForm()"
          :dialogVisible="create_partner_dialog"
          :dialogTitle="partner_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingPartner"
        >
          <appBackendFormsPartner
            :creating="creatingPartner"
            :formData="formData"
            ref="partnerForm"
          ></appBackendFormsPartner>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :deleteEntity="'partners'"
          :updateEntity="'APP_UPDATE_PARTNERS_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Nome', key: 'name' }]"
          :sendingData="sending"
          :dataSourse="partners"
          @handleEdit="onEditPartner($event)"
          @handleDelete="onDeletePartner($event)"
        >
          <template v-slot:column_after>
            <el-table-column
              header-align="center"
              align="center"
              label="Ativação"
              width="80"
            >
              <template slot-scope="{ row }">
                <el-popover trigger="hover" placement="top">
                  <p>
                    <b>Ativação:</b>
                    <span
                      :class="!row.status ? 'text-red-400' : 'text-green-600'"
                    >
                      {{ row.status ? "Parceiro ativo" : "Parceiro inativo" }}
                    </span>

                    <el-button
                      @click="
                        toggleStatus(
                          'partners/partner-activation',
                          row.id,
                          row.status,
                          'Parceiro',
                          'APP_UPDATE_PARTNERS_DATA'
                        )
                      "
                      type="text"
                      >{{ row.status ? "Inativar" : "Ativar" }}</el-button
                    >
                  </p>

                  <div slot="reference" class="name-wrapper">
                    <el-tag
                      :type="row.status ? 'success' : 'info'"
                      size="medium"
                      >{{ row.status ? "Ativo" : "Inativo" }}</el-tag
                    >
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </template>
        </appBackendCommonDataTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";

export default {
  name: "PartnersIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("partners/getPartners", 1);
  },

  data() {
    return {
      creatingPartner: "",
      selected: [],
      tableFields: [{ label: "Nome", name: "name" }],
      sending: {},
      singlePartner: {},
      formData: {
        id: "",
        name: "",
        type: "",
        logo: null,
        status: false,
        description: ""
      }
    };
  },

  computed: {
    ...mapGetters({
      partners: "partners/partners"
      //   pagination: "partners/pagination"
    }),
    create_partner_dialog: {
      get() {
        return this.$store.state.partners.create_partner_dialog;
      },
      set(val) {
        this.$store.commit("partners/create_partner_dialog", val);
      }
    },
    partner_dialog_title() {
      return this.creatingPartner ? "Registar Parceiro" : "Editar Parceiro";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_PARTNERS_DATA", () => {
        this.getPartners(1);
      });
    }
  },

  methods: {
    async cancelPartnerForm() {
      this.$refs.partnerForm.cancelPartnerForm();
    },
    async onSavePartner() {
      this.$refs.partnerForm.addPartner();
    },
    async onUpdatePartner() {
      this.$refs.partnerForm.updatePartner();
    },
    async onCreatePartner() {
      this.resetFormData();
      this.creatingPartner = true;
      await this.handleModal("partners/toggleCreatePartnerDialog");
    },

    async onEditPartner(ev) {
      this.creatingPartner = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`partners/${ev[1].id}`).then(res => {
          this.singlePartner = res.data;
          this.formData = this.singlePartner;
          this.handleModal("partners/toggleCreatePartnerDialog");
          this.$set(this.sending, ev[1].id, false);
        });
        this.$refs.partnerForm.initFilesUploaded();
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeletePartner(ev) {
      this.onDelete("partners", ev[1].id, "APP_UPDATE_PARTNERS_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        name: "",
        type: "",
        logo: null,
        status: false,
        description: ""
      };
    },

    async getPartners(page) {
      await this.$store.dispatch("partners/getPartners", page);
    }
  }
};
</script>
