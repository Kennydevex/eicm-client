<template>
  <Row>
    <Col span="24">
      <Button type="primary" @click.stop="onCreateCategory()">
        <span>Nova Categoria</span>
      </Button>
      <create-category></create-category>
    </Col>

    <Col span="24" class="mt-5">
      <Table
        border
        :columns="categories_header"
        :data="categories"
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
        <update-category></update-category>
      </div>
    </Col>
  </Row>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteDatas, requests } from "@/mixins/appRequest";

export default {
  name: "ListCategories",
  mixins: [deleteDatas, requests],

  data() {
    return {
      on_load_data_to_update: false,
      context_category: {},
      selected: [],

      categories_header: [
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
      window.getApp.$on("APP_UPDATE_CATEGORIES_DATA", () => {
        this.getCategories();
      });
    }
  },

  computed: {
    ...mapGetters({ categories: "categories/categories" })
  },

  methods: {
    onCreateCategory() {
      this.handleModal("categories/toggleCreateCategoryDialog");
    },

    async onUpdateCategory(id) {
      // this.$set(this.on_load_data_to_update, id, true);
      this.on_load_data_to_update = true;
      await this.onUpdateData(
        id,
        "categories",
        "APP_ON_UPDATE_CATEGORY",
        "categories/toggleUpdateCategoryDialog"
      );
      this.on_load_data_to_update = false;

      // this.$set(this.on_load_data_to_update, id, false);
    },

    async getCategories() {
      await this.$store.dispatch("categories/getCategories");
    },

    handleContextMenu(row) {
      this.context_category = row;
    },

    handleContextMenuEdit() {
      this.onUpdateCategory(this.context_category.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "categories",
        this.context_category.id,
        "APP_UPDATE_CATEGORIES_DATA"
      );
    }
  },

  components: {
    CreateCategory: () =>
      import("@/components/backend/categories/CreateCategory"),
    UpdateCategory: () =>
      import("@/components/backend/categories/UpdateCategory")
  }
};
</script>

<style lang="scss" scoped></style>
