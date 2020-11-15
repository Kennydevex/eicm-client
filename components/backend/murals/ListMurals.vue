<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateMural()">
        <span>Novo Marcador</span>
      </Button>
      <create-mural></create-mural>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="murals_header"
        :data="murals"
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
      </Table>
      <div>
        <update-mural></update-mural>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListMurals",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_mural: {},
      selected: [],

      murals_header: [
        {
          title: "Deseguinação",
          key: "designation",
          minWidth: 150
        },
        {
          title: "Descrição",
          slot: "description",
          minWidth: 150
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
      window.getApp.$on("APP_UPDATE_MURALS_DATA", () => {
        this.getMurals();
      });
    }
  },

  computed: {
    ...mapGetters({ murals: "murals/murals" })
  },

  methods: {
    onCreateMural() {
      this.handleModal("murals/toggleCreateMuralDialog");
    },

    async onUpdateMural(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "murals",
        "APP_ON_UPDATE_MURAL",
        "murals/toggleUpdateMuralDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getMurals() {
      await this.$store.dispatch("murals/getMurals");
    },

    handleContextMenu(row) {
      this.context_mural = row;
    },

    handleContextMenuEdit() {
      this.onUpdateMural(this.context_mural.id);
    },
    handleContextMenuDelete() {
      this.onDelete("murals", this.context_mural.id, "APP_UPDATE_MURALS_DATA");
    }
  },

  components: {
    CreateMural: () => import("@/components/backend/murals/CreateMural"),
    UpdateMural: () => import("@/components/backend/murals/UpdateMural")
  }
};
</script>

<style lang="scss" scoped></style>
