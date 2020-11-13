<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateFamily()">
        <span>Nova Familia</span>
      </Button>
      <create-family></create-family>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="families_header"
        :data="families"
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


        <template slot-scope="{ row }" slot="section">
          <span>{{ row.section }}</span>
        </template>
      </Table>
      <div>
        <update-family></update-family>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListFamilies",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_family: {},
      selected: [],

      families_header: [
        {
          title: "Nome",
          key: "name",
          minWidth: 150,
          sortable: true
          
        },
        {
          title: "Descrição",
          slot: "description",
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
      window.getApp.$on("APP_UPDATE_FAMILIES_DATA", () => {
        this.getFamilies();
      });
    }
  },

  computed: {
    ...mapGetters({ families: "families/families" })
  },

  methods: {
    onCreateFamily() {
      this.handleModal("families/toggleCreateFamilyDialog");
    },

    async onUpdateFamily(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "families",
        "APP_ON_UPDATE_FAMILY",
        "families/toggleUpdateFamilyDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getFamilies() {
      await this.$store.dispatch("families/getFamilies");
    },

    handleContextMenu(row) {
      this.context_family = row;
    },

    handleContextMenuEdit() {
      this.onUpdateFamily(this.context_family.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "families",
        this.context_family.id,
        "APP_UPDATE_FAMILIES_DATA"
      );
    }
  },

  components: {
    CreateFamily: () => import("@/components/backend/families/CreateFamily"),
    UpdateFamily: () => import("@/components/backend/families/UpdateFamily")
  }
};
</script>

<style lang="scss" scoped></style>
