<template>
  <div>
    <Row>
      <Col span="24"> </Col>

      <Col span="24" class="my-5">
        <Tabs :animated="false">
          <TabPane label="Publicações">
            <Row>
              <Col span="24">
                <Button
                  :loading="creating_article"
                  type="primary"
                  @click.stop="onCreateArticle()"
                >
                  <span v-if="!creating_article">Novo Artigo</span>
                  <span v-else>Solicitando...</span></Button
                >
              </Col>

              <Col span="24" class="mt-5">
                <Table
                  border
                  :columns="articles_header"
                  :data="articles"
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
                      context_article.status ? "Desativar" : "Ativar"
                    }}</DropdownItem>
                    <DropdownItem @click.native="handleContextMenuFeatured">{{
                      context_article.featured ? "Tirar Destaque" : "Destacar"
                    }}</DropdownItem>
                  </template>

                   <template slot-scope="{ row }" slot="title">
                    <strong>{{ row.title }}</strong>
                  </template>

                   <template slot-scope="{ row }" slot="user">
                    <span>{{ row.user }}</span>
                  </template>

                  <template slot-scope="{ row }" slot="created_at">
                    <span>{{ $moment(row.created_at).format("l") }}</span>
                  </template>
                  <template slot-scope="{ row }" slot="status">
                    <Tag
                      type="dot"
                      :color="row.status ? 'primary' : 'warning'"
                      >{{ row.status ? "Ativo" : "Desativo" }}</Tag
                    >
                  </template>
                  <template slot-scope="{ row }" slot="featured">
                    <Tag
                      type="dot"
                      :color="row.featured ? 'primary' : 'warning'"
                      >{{ row.featured ? "Destaque" : "Normal" }}</Tag
                    >
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button
                      type="primary"
                      size="small"
                      style="margin-right: 5px"
                      :loading="on_load_data_to_update[row.id]"
                      @click="onUpdateArticle(row.id)"
                    >
                      <Icon
                        v-if="!on_load_data_to_update[row.id]"
                        type="md-create"
                      />
                    </Button>
                    <Button
                      type="error"
                      size="small"
                      :loading="deleting[row.id]"
                      @click="
                        onDelete('articles', row.id, 'APP_UPDATE_ARTICLES_DATA')
                      "
                    >
                      <Icon v-if="!deleting[row.id]" type="md-trash"
                    /></Button>
                  </template>
                </Table>
                <create-article></create-article>
                <update-article></update-article>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="Categorias">
            <Row>
              <Col span="24">
                <list-categories></list-categories>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="Marcadores">
            <Row>
              <Col span="24">
                <list-tags></list-tags>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
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
  name: "ArticlePage",
  layout: "admin",
  mixins: [handleActivations, deleteDatas, requests],

  async fetch({ store }) {
    await store.dispatch("articles/getArticles");
    await store.dispatch("categories/getCategories");
    await store.dispatch("tags/getTags");
  },

  data() {
    return {
      context_article: {},

      on_load_data_to_update: {},
      creating_article: false,
      selected: [],
      context_article: {},
      single_article: [],
      articles_header: [
        {
          title: "Título",
          slot: "title",
          minWidth: 150,
          fixed: 'left'
        },

         {
          title: "Autor",
          slot: "user",
          minWidth: 150
        },

        {
          title: "Criado",
          slot: "created_at",
          minWidth: 100,
          maxWidth: 150
        },
        {
          title: "Categoria",
          key: "category",
          width: 120
        },

        {
          title: "Estado",
          slot: "status",
          width: 150,
          align: "center"
        },
        {
          title: "Destaque",
          slot: "featured",
          width: 150,
          align: "center"
        },
        // {
        //   title: "Action",
        //   slot: "action",
        //   width: 140,
        //   align: "center"
        // }
      ]
    };
  },

  computed: {
    ...mapGetters({
      articles: "articles/articles"
    })
  },
  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_ARTICLES_DATA", () => {
        this.getArticles();
      });
    }
  },
  methods: {
    async onCreateArticle() {
      this.creating_article = true;
      await this.loadExtraData();
      this.handleModal("articles/toggleCreateArticleDialog");
      this.creating_article = false;
    },

    async onUpdateArticle(id) {
      this.$set(this.on_load_data_to_update, id, true);
      await this.loadExtraData();
      await this.onUpdateData(
        id,
        "articles",
        "APP_ON_UPDATE_ARTICLE",
        "articles/toggleUpdateArticleDialog"
      );
      this.$set(this.on_load_data_to_update, id, false);
    },

    async loadExtraData() {
      await this.$store.dispatch("categories/getCategories");
      await this.$store.dispatch("tags/getTags");
    },

    async getArticles() {
      await this.$store.dispatch("articles/getArticles");
    },

    handleContextMenu(row) {
      this.context_article = row;
    },
    handleContextMenuStatus() {
      this.toggleStatus(
        "articles/publish-article",
        this.context_article.id,
        this.context_article.status,
        "Artigo",
        "APP_UPDATE_ARTICLES_DATA"
      );
    },
    handleContextMenuFeatured() {
      this.toggleStatus(
        "articles/featured-article",
        this.context_article.id,
        this.context_article.featured,
        "Artigo",
        "APP_UPDATE_ARTICLES_DATA",
        true
      );
    },
    handleContextMenuEdit() {
      this.onUpdateArticle(this.context_article.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "articles",
        this.context_article.id,
        "APP_UPDATE_ARTICLES_DATA"
      );
    }
  },
  components: {
    CreateArticle: () => import("@/components/backend/articles/CreateArticle"),
    UpdateArticle: () => import("@/components/backend/articles/UpdateArticle"),
    ListCategories: () =>
      import("@/components/backend/categories/ListCategories"),
    ListTags: () => import("@/components/backend/tags/ListTags")
  }
};
</script>

<style lang="scss" scoped></style>
