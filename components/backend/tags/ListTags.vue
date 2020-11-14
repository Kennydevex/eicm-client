<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateTag()">
        <span>Novo Marcador</span>
      </Button>
      <create-tag></create-tag>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="tags_header"
        :data="tags"
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
        <update-tag></update-tag>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListTags",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_tag: {},
      selected: [],

      tags_header: [
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
      window.getApp.$on("APP_UPDATE_TAGS_DATA", () => {
        this.getTags();
      });
    }
  },

  computed: {
    ...mapGetters({ tags: "tags/tags" })
  },

  methods: {
    onCreateTag() {
      this.handleModal("tags/toggleCreateTagDialog");
    },

    async onUpdateTag(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "tags",
        "APP_ON_UPDATE_TAG",
        "tags/toggleUpdateTagDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getTags() {
      await this.$store.dispatch("tags/getTags");
    },

    handleContextMenu(row) {
      this.context_tag = row;
    },

    handleContextMenuEdit() {
      this.onUpdateTag(this.context_tag.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "tags",
        this.context_tag.id,
        "APP_UPDATE_TAGS_DATA"
      );
    }
  },

  components: {
    CreateTag: () => import("@/components/backend/tags/CreateTag"),
    UpdateTag: () => import("@/components/backend/tags/UpdateTag")
  }
};
</script>

<style lang="scss" scoped></style>
