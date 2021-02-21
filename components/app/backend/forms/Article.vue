<template>
  <el-form ref="articleForm" :model="formData" :rules="articleFormValidation">
    <el-row :gutter="20">
      <el-col>
        <el-form-item
          prop="title"
          label="Título do Artigo"
          :error="showFormErrors('title')"
        >
          <el-input
            placeholder="Introduza o título do artigo"
            v-model="formData.title"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item
          :error="showFormErrors('summary')"
          prop="summary"
          label="Síntise do Artigo"
        >
          <el-input
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="Faça um pequeno resumo deste artigo"
            v-model="formData.summary"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left"
      ><span class="text-gray-500">Conteúdos a publicar</span></el-divider
    >

    <el-row>
      <el-col>
        <el-form-item :error="showFormErrors('content')" prop="content">
          <client-only>
            <editor
              v-model="formData.content"
              api-key="kgnwbdzz6d6k20i8h6n924bus6myboh3i062pouio4dxsavx"
              :init="initConf"
            />
          </client-only>
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider content-position="left"
      ><span class="text-gray-500">Caracterização</span></el-divider
    >

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <el-form-item prop="category_id" label="Categoria">
          <el-select
            class="w-full"
            v-model="formData.category_id"
            placeholder="Categoria do artigo"
          >
            <el-option
              v-for="category in categories"
              :value="category.id"
              :key="category.id"
              :label="category.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item prop="article_tags" label="Marcadores">
          <el-select
            class="w-full"
            v-model="formData.article_tags"
            placeholder="Marcadores do artigo"
            multiple
          >
            <el-option
              v-for="tag in tags"
              :value="tag.id"
              :key="tag.id"
              :label="tag.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item
          prop="type"
          label="Alvo do artigo"
          :error="showFormErrors('type')"
        >
          <el-radio-group v-model="formData.type">
            <el-radio-button label="1">Eventos Interno</el-radio-button>
            <el-radio-button label="2">Publicação Externa</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left"
      ><span class="text-gray-500">Ativação e Apresentação</span></el-divider
    >

    <el-row :gutter="20">
      <el-col>
        <el-form-item prop="cover" label="Imagem de capa">
          <baseImageUpload
            ref="articleCover"
            :uploadMsg="'Clique ou largue o covertipo aqui'"
            :fileActions="`${$axios.defaults.baseURL}/upload-article-cover`"
            :fileList="uploadCoverList"
            @onFileSuccess="handleCoverSuccess($event)"
            @onRemoveFile="handleRemoveCover($event)"
          ></baseImageUpload>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item prop="status" label="Ativação do artigo">
          <el-switch
            active-text="Ativo"
            inactive-text="Inativo"
            v-model="formData.status"
          >
          </el-switch>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item prop="featured" label="Colocar o artigo em destaque">
          <el-switch
            active-text="Sim"
            inactive-text="Não"
            v-model="formData.featured"
          >
          </el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";

import { requests } from "@/mixins/appRequest";
import { uploadFeedback } from "@/mixins/handleFileUploads";
import { alerts } from "@/mixins/appAlerts";
import { debounce, find } from "lodash";

import {
  article_validation,
  mult_form_validation
} from "@/mixins/fieldsValidation";
import { handleFormData } from "@/mixins/multFormData";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "ArticleForm",

  mixins: [
    requests,
    uploadFeedback,
    article_validation,
    mult_form_validation,
    alerts,
    handleFormData
  ],
  props: {
    creating: {
      type: Boolean,
      default: true,
      required: false
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    }
  },

  data() {
    return {
      uploadCoverList: [],
      disabledUpload: false,
      initConf: {
        // Chave de kenny.teste@gmail.com
        min_height: 400,
        max_height: 600,

        selector: "textarea",
        language: "pt_PT",
        // skin: "oxide-dark",
        // content_css: "dark",
        menubar: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code emoticons wordcount imagetools"
        ],
        toolbar:
          "undo redo | formatselect |fontselect fontsizeselect bold italic backcolor forecolor| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image media"
      }
    };
  },

  computed: {
    ...mapGetters({
      categories: "categories/categories",
      tags: "tags/tags"
    }),

    device() {
      return this.$store.state.app.device;
    }
  },

  methods: {
    handleCoverSuccess(res) {
      this.formData.cover = res;
      if (
        this.formData.cover &&
        this.$refs.articleCover.$refs.uploadImageComponent.uploadFiles.length >
          0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadCoverList = this.$refs.articleCover.$refs.uploadImageComponent.clearFiles();
      }
    },

    async handleRemoveCover() {
      let cover = this.formData.cover;
      if (cover.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-article-cover", {
        cover: cover
      });
      if (res.status != 200) {
        this.formData.cover = cover;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadCoverList = this.$refs.articleCover.$refs.uploadImageComponent.clearFiles();
      this.formData.cover = "";
      this.disabledUpload = false;
    },

    async addArticle() {
      await this.addData(
        "articleForm",
        "articles",
        "Artigo Registado",
        "APP_UPDATE_ARTICLES_DATA",
        "articles",
        false
      );

      this.$refs.articleCover.$refs.uploadImageComponent.clearFiles();
    },

    updateArticle() {
      this.updateData(
        "articleForm",
        "articles",
        "Artigo Atualizado",
        "APP_UPDATE_ARTICLES_DATA",
        "articles",
        false
      );

      this.$refs.articleCover.$refs.uploadImageComponent.clearFiles();
    },

    cancelArticleForm() {
      this.resetFormFields("articleForm");
      if (this.formData.cover && this.formData.cover != "default.svg") {
        this.handleRemoveCover();
      }
    },

    initFilesUploaded() {
      this.uploadCoverList = [];
      if (
        !this.creating &&
        this.formData.cover &&
        !this.formData.cover.includes("default")
      ) {
        this.uploadCoverList.push({
          name: this.formData.cover,
          response: this.formData.cover,
          percentage: 100,
          status: "success",
          url: `${this.publicURL}/uploads/articles/covers/${this.formData.cover}`
        });
      }
    }
  },

  components: {
    Editor
  }
};
</script>
