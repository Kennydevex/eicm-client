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

         <template v-slot:column_after>
           

            <el-table-column header-align="center" align="center" label="Ativação" width="80">
              <template slot-scope="{ row }">
                <el-popover trigger="hover" placement="top">
                  <p>
                    <b>Ativação:</b>
                    <span
                      :class="!row.status ? 'text-red-400' : 'text-green-600'"
                    >
                      {{
                        row.status ? "Artigo ativo" : "Artigo inativo"
                      }}
                    </span>
                    <el-button
                      @click="
                        toggleStatus(
                          'articles/publish-article',
                          row.id,
                          row.status,
                          'Artigo',
                          'APP_UPDATE_ARTICLES_DATA'
                        )
                      "
                      type="text"
                      >{{ row.status ? "Inativar" : "Ativar" }}</el-button
                    >
                  </p>
                  <p>
                    <b>Destaque:</b>
                    {{ row.featured ? "Artigo em Destaque" : "Sem Destaque" }}
                    <el-button
                      @click="
                        toggleStatus(
                          'articles/highlight-article',
                          row.id,
                          row.featured,
                          'Artigo',
                          'APP_UPDATE_ARTICLES_DATA',
                          true
                        )
                      "
                      type="text"
                      >{{ row.featured ? "Tirar destaque" : "Destacar" }}</el-button
                    >
                  </p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag
                      :type="row.status ? 'success' : 'info'"
                      size="medium"
                      >{{ row.status ? "Ativo" : "Inativo" }}</el-tag
                    >
                  </div>
                </el-popover>
              </template>
            </el-table-column>
          </template>
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
