<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateCharge()">
        <span>Novo Cargo</span>
      </Button>
      <create-charge></create-charge>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="charges_header"
        :data="charges"
        context-menu
        show-context-menu
        @on-contextmenu="handleContextMenu"
        :class="on_load_data_to_update ? 'cursor-wait' : ''"
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
        </template>

        <template slot-scope="{ row }" slot="section">
          <span>{{ row.section }}</span>
        </template>
      </Table>
      <div>
        <update-charge></update-charge>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListCharges",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_charge: {},
      selected: [],

      charges_header: [
        {
          title: "Nome",
          key: "name",
          minWidth: 150
        },
        {
          title: "Descrição",
          key: "description",
          minWidth: 150
        },
        {
          title: "Secção",
          slot: "section",
          width: 100
        }
        // {
        //   title: "Action",
        //   slot: "action",
        //   width: 150,
        //   align: "center"
        // }
      ]
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_CHARGES_DATA", () => {
        this.getCharges();
      });
    }
  },

  computed: {
    ...mapGetters({ charges: "charges/charges" })
  },

  methods: {
    onCreateCharge() {
      this.handleModal("charges/toggleCreateChargeDialog");
    },

    async onUpdateCharge(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "charges",
        "APP_ON_UPDATE_CHARGE",
        "charges/toggleUpdateChargeDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getCharges() {
      await this.$store.dispatch("charges/getCharges");
    },

    handleContextMenu(row) {
      this.context_charge = row;
    },

    handleContextMenuEdit() {
      this.onUpdateCharge(this.context_charge.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "charges",
        this.context_charge.id,
        "APP_UPDATE_CHARGES_DATA"
      );
    }
  },

  components: {
    CreateCharge: () => import("@/components/backend/charges/CreateCharge"),
    UpdateCharge: () => import("@/components/backend/charges/UpdateCharge")
  }
};
</script>

<style lang="scss" scoped></style>
