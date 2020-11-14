<template>
  <div class="p-3">
    <Form
      ref="articleForm"
      :model="formData"
      :rules="articleFormValidation"
      label-position="top"
    >
      <Row :gutter="16">
        <Col span="24">
          <FormItem
            :error="showFormErrors('title')"
            label="Título do Artigo"
            prop="title"
          >
            <Input
              v-model="formData.title"
              placeholder="Insira o título do artigo"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem
            prop="summary"
            :error="showFormErrors('summary')"
            label="Síntise do artigo"
          >
            <Input
              type="textarea"
              :rows="3"
              v-model="formData.summary"
              placeholder="Faça um pequeno resumo deste artigo"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem :error="showFormErrors('content')" label="Conteúdo">
            <Input
              type="textarea"
              :rows="5"
              v-model="formData.content"
              placeholder="Desenvolva a sua publicação aqui"
            ></Input>
          </FormItem>
        </Col>

        <!-- <Col span="12">
                <FormItem
                  prop="publish_start_date"
                  label="Data de publicação"
                  :error="showFormErrors('publish_start_date')"
                >
                  <DatePicker
                    class="w-full"
                    :value="formData.publish_start_date"
                    type="date"
                    placeholder="Data inicio desta publicação"
                    v-model="formData.publish_start_date"
                  ></DatePicker>
                </FormItem>
              </Col>
               <Col span="12">
                <FormItem
                  prop="publish_end_date"
                  label="Fim da publicação"
                  :error="showFormErrors('publish_end_date')"
                >
                  <DatePicker
                    class="w-full"
                    :value="formData.publish_end_date"
                    type="date"
                    placeholder="Data de encerramento desta publicação"
                    v-model="formData.publish_end_date"
                  ></DatePicker>
                </FormItem>
              </Col>-->

        <Col span="12">
          <FormItem
            label="Categoria"
            :error="showFormErrors('category_id')"
            prop="category_id"
          >
            <Select
              v-model="formData.category_id"
              placeholder="Categoria do artigo"
            >
              <Option
                v-for="category in categories"
                :value="category.id"
                :key="category.id"
                >{{ category.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem
            label="Marcadores"
            :error="showFormErrors('category_id')"
            prop="category_id"
          >
            <Select
              multiple
              v-model="formData.article_tags"
              placeholder="Marcadores do artigo"
            >
              <Option v-for="tag in tags" :value="tag.id" :key="tag.id">{{
                tag.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem
            prop="type"
            label="Tipo de Oferta"
            :error="showFormErrors('type')"
          >
            <Select v-model="formData.type">
              <Option value="1">Publicação Interna</Option>
              <Option value="2">Publicação Externa</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <Row>
            <Col span="12">
              <FormItem label="Publicação do artigo">
                <i-switch v-model="formData.status" size="large">
                  <span slot="open">Sim</span>
                  <span slot="close">Não</span>
                </i-switch>
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="Artigo em destaque">
                <i-switch v-model="formData.featured" size="large">
                  <span slot="open">Sim</span>
                  <span slot="close">Não</span>
                </i-switch>
              </FormItem>
            </Col>
          </Row>
        </Col>

        <Col span="24">
          <FormItem label="Imagem fundo">
            <base-file-upload
              ref="articleCover"
              :uploadMsg="'Clique ou largue a imagem aqui'"
              :fileList="uploadCoverList"
              :fileActions="`${$axios.defaults.baseURL}/upload-article-cover`"
              :tempFileUrl="
                `${publicURL}/uploads/articles/covers/${formData.cover}`
              "
              :fileFormData="formData.cover"
              @onFileSuccess="handleCoverSuccess($event)"
              @onRemoveFile="handleRemoveCover($event)"
            ></base-file-upload>
          </FormItem>
        </Col>
      </Row>

      <FormItem>
        <div class="flex justify-end">
          <Button
            @click="resetFormFields('articleForm')"
            style="margin-right: 8px"
            >Limpar</Button
          >

          <Button
            @click="
              creating
                ? handleModal('articles/toggleCreateArticleDialog')
                : handleModal('articles/toggleUpdateArticleDialog')
            "
            >Cancelar</Button
          >

          <Button
            :loading="sending"
            type="primary"
            style="margin-left: 8px"
            @click.stop="
              creating
                ? addData(
                    'articleForm',
                    'articles',
                    'Artigo Registado',
                    'APP_UPDATE_ARTICLES_DATA',
                    'articles/toggleCreateArticleDialog'
                  )
                : updateData(
                    'articleForm',
                    'articles',
                    'Artigo Atualizado',
                    'APP_UPDATE_ARTICLES_DATA',
                    'articles/toggleUpdateArticleDialog'
                  )
            "
            ><span v-if="!sending">{{
              creating ? "Registar" : "Atualizar"
            }}</span>
            <span v-else>Enviando...</span></Button
          >
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { uploadFeedback } from "@/mixins/handleFileUploads";
import { article_validation } from "@/mixins/fieldsValidation";
import { alerts } from "@/mixins/appAlerts";
export default {
  name: "ArticleForm",

  mixins: [
    requests,
    uploadFeedback,
    article_validation,
    alerts,
  ],

  props: {
    creating: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      uploadCoverList: [],
    };
  },

  computed: {
    ...mapGetters({
      categories: "categories/categories",
      tags: "tags/tags",
    }),
    availableTags(){
      if (creating) {
        return this.tags
      }
    }
  },

  mounted() {
    this.initFilesUploaded();
  },

  methods: {

    handleCoverSuccess(res) {
      this.formData.cover = res;
      this.uploadCoverList = this.$refs.articleCover.$refs.uploadFileComponent.fileList;
    },

    async handleRemoveCover() {
      let cover = this.formData.cover;
      const res = await this.$axios.post("remove-article-cover", {
        cover: cover
      });
      if (res.status != 200) {
        this.formData.cover = cover;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadCoverList = this.$refs.articleCover.$refs.uploadFileComponent.clearFiles();
      this.formData.cover = "";
    },

    initFilesUploaded() {
      if (this.creating) {
        this.uploadCoverList = this.$refs.articleCover.$refs.uploadFileComponent.fileList;
        return;
      }

      this.uploadCoverList.push({
        response: this.formData.cover,
        status: "finished"
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
