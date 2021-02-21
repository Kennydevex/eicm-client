<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button
          :loading_data="loading_data"
          size="medium"
          type="primary"
          @click.stop="redirectToPageByName('create-article')"
          ><span v-if="!loading_data">Criar Novo Artigo</span>
          <span v-else>Solicitando dados...</span></el-button
        >
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
        :deleteEntity="'articles'"
          :updateEntity="'APP_UPDATE_ARTICLES_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Título', key: 'title' }]"
          :sendingData="sending"
          :dataSourse="articles"
          @handleEdit="onEditArticle($event)"
          @handleDelete="onDeleteArticle($event)"
        >
        </appBackendCommonDataTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";

export default {
  name: "ArticlesIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("articles/getArticles");
  },

  data() {
    return {
      selected: [],
      tableFields: [{ label: "Título", name: "title" }],
      sending: {},
      singleArticle: {},
      loading_data: false
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
        this.getArticles(1);
      });
    }
  },

  methods: {
    async onCreateArticle() {
      this.redirectToPageByName("create-article");
    },

    async onEditArticle(ev) {
      await this.redirectToPageWithParam("edit-article", ev[1].slug);
    },

    onDeleteArticle(ev) {
      this.onDelete("articles", ev[1].id, "APP_UPDATE_ARTICLES_DATA");
    },

    async getArticles(page) {
      await this.$store.dispatch("articles/getArticles", page);
    }
  }
};
</script>
