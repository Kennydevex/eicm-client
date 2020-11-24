<template>
  <div>
    <Row>
      <Col span="24"> </Col>

      <Col span="24" class="my-5">
        <Row>
          <Col span="24">
            <Button
              :loading="creating_partner"
              type="primary"
              @click.stop="onCreatePartner()"
            >
              <span v-if="!creating_partner">Novo Parceiro</span>
              <span v-else>Solicitando...</span></Button
            >
          </Col>

          <Col span="24" class="mt-5">
            <Table
              border
              :columns="partners_header"
              :data="partners"
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
                  context_partner.status ? "Desativar" : "Ativar"
                }}</DropdownItem>
              </template>

              <template slot-scope="{ row }" slot="type">
                <span>{{
                  row.type == 1 ? "Prata" : row.type == 2 ? "Ouro" : "Diamante"
                }}</span>
              </template>

              <template slot-scope="{ row }" slot="status">
                <Tag type="dot" :color="row.status ? 'primary' : 'warning'">{{
                  row.status ? "Ativo" : "Desativo"
                }}</Tag>
              </template>

              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  :loading="on_load_data[row.id]"
                  @click="onUpdatePartner(row.id)"
                >
                  <Icon v-if="!on_load_data[row.id]" type="md-create" />
                </Button>
                <Button
                  type="error"
                  size="small"
                  :loading="deleting[row.id]"
                  @click="
                    onDelete('partners', row.id, 'APP_UPDATE_PARTNERS_DATA')
                  "
                >
                  <Icon v-if="!deleting[row.id]" type="md-trash"
                /></Button>
              </template>
            </Table>
            <create-partner></create-partner>
            <update-partner></update-partner>
          </Col>
        </Row>
      </Col>

      <Col span="24"> </Col>
    </Row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";

export default {
  name: "PartnerPage",
  layout: "admin",
  mixins: [handleActivations, deleteDatas, requests],

  async fetch({ store }) {
    await store.dispatch("partners/getPartners");
  },

  data() {
    return {
      context_partner: {},

      creating_partner: false,
      selected: [],
      context_partner: {},
      single_partner: [],
      partners_header: [
        {
          title: "Name",
          key: "name",
          minWidth: 150,
          sortable: true
        },

        {
          title: "Link",
          key: "link",
          minWidth: 150,
          sortable: true
        },

        {
          title: "Tipo",
          slot: "type",
          width: 100,
          align: "center"
        },

        {
          title: "Estado",
          slot: "status",
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
      partners: "partners/partners"
    })
  },
  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_PARTNERS_DATA", () => {
        this.getPartners();
      });
    }
  },
  methods: {
    async onCreatePartner() {
      this.creating_partner = true;
      this.handleModal("partners/toggleCreatePartnerDialog");
      this.creating_partner = false;
    },

    async onUpdatePartner(id) {
      await this.onUpdateData(
        id,
        "partners",
        "APP_ON_UPDATE_PARTNER",
        "partners/toggleUpdatePartnerDialog"
      );
    },

    async getPartners() {
      await this.$store.dispatch("partners/getPartners");
    },

    handleContextMenu(row) {
      this.context_partner = row;
    },
    handleContextMenuStatus() {
      this.toggleStatus(
        "partners/partner-activation",
        this.context_partner.id,
        this.context_partner.status,
        "Parceiro",
        "APP_UPDATE_PARTNERS_DATA"
      );
    },

    handleContextMenuEdit() {
      this.onUpdatePartner(this.context_partner.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "partners",
        this.context_partner.id,
        "APP_UPDATE_PARTNERS_DATA"
      );
    }
  },
  components: {
    CreatePartner: () => import("@/components/backend/partners/CreatePartner"),
    UpdatePartner: () => import("@/components/backend/partners/UpdatePartner")
  }
};
</script>

<style lang="scss" scoped></style>
