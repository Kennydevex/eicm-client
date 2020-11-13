<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateOutcome()">
        <span>Novo Perfil de Saída</span>
      </Button>
      <create-outcome></create-outcome>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="outcomes_header"
        :data="outcomes"
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

        <template slot-scope="{ row }" slot="description">
          <span>{{ row.description | truncate(50) }}</span>
        </template>

        <template slot-scope="{ row }" slot="type">
          <span>{{ row.type == 1 ? "Académica" : "Profissional" }}</span>
        </template>
      </Table>
      <div>
        <update-outcome></update-outcome>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListOutcomes",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_outcome: {},
      selected: [],

      outcomes_header: [
        {
          title: "Nome",
          key: "name",
          minWidth: 120
        },
        {
          title: "Descrição",
          slot: "description",
          minWidth: 150
        },
        {
          title: "Tipo",
          slot: "type",
          width: 150
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
      window.getApp.$on("APP_UPDATE_OUTCOMES_DATA", () => {
        this.getOutcomes();
      });
    }
  },

  computed: {
    ...mapGetters({ outcomes: "outcomes/outcomes" })
  },

  methods: {
    onCreateOutcome() {
      this.handleModal("outcomes/toggleCreateOutcomeDialog");
    },

    async onUpdateOutcome(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "outcomes",
        "APP_ON_UPDATE_OUTCOME",
        "outcomes/toggleUpdateOutcomeDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getOutcomes() {
      await this.$store.dispatch("outcomes/getOutcomes");
    },

    handleContextMenu(row) {
      this.context_outcome = row;
    },

    handleContextMenuEdit() {
      this.onUpdateOutcome(this.context_outcome.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "outcomes",
        this.context_outcome.id,
        "APP_UPDATE_OUTCOMES_DATA"
      );
    }
  },

  components: {
    CreateOutcome: () => import("@/components/backend/outcomes/CreateOutcome"),
    UpdateOutcome: () => import("@/components/backend/outcomes/UpdateOutcome")
  }
};
</script>

<style lang="scss" scoped></style>
