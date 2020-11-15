<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateGuideline()">
        <span>Nova Diretriz</span>
      </Button>
      <create-guideline></create-guideline>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="guidelines_header"
        :data="guidelines"
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
        <update-guideline></update-guideline>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListGuidelines",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_guideline: {},
      selected: [],

      guidelines_header: [
        {
          title: "Nome",
          key: "name",
          minWidth: 150
        },
        {
          title: "Descrição",
          slot: "description",
          minWidth: 150
        },
      ]
    };
  },

  created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_GUIDELINES_DATA", () => {
        this.getGuidelines();
      });
    }
  },

  computed: {
    ...mapGetters({ guidelines: "guidelines/guidelines" })
  },

  methods: {
    onCreateGuideline() {
      this.handleModal("guidelines/toggleCreateGuidelineDialog");
    },

    async onUpdateGuideline(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "guidelines",
        "APP_ON_UPDATE_GUIDELINE",
        "guidelines/toggleUpdateGuidelineDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getGuidelines() {
      await this.$store.dispatch("guidelines/getGuidelines");
    },

    handleContextMenu(row) {
      this.context_guideline = row;
    },

    handleContextMenuEdit() {
      this.onUpdateGuideline(this.context_guideline.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "guidelines",
        this.context_guideline.id,
        "APP_UPDATE_GUIDELINES_DATA"
      );
    }
  },

  components: {
    CreateGuideline: () => import("@/components/backend/guidelines/CreateGuideline"),
    UpdateGuideline: () => import("@/components/backend/guidelines/UpdateGuideline")
  }
};
</script>

<style lang="scss" scoped></style>
