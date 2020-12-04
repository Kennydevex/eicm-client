<template>
  <div class="px-3">
    <Form
      ref="sliderForm"
      :model="formData"
      :rules="sliderFormValidation"
      label-position="top"
    >
      <Divider orientation="left">Descrições</Divider>

      <Row :gutter="16">
        <Col span="24">
          <FormItem prop="type" label="Slider Para">
            <RadioGroup class="w-full" type="button" v-model="formData.type">
              <Radio class="w-1/3" label="1">Cursos/Formações</Radio>
              <Radio class="w-1/3" label="2">Blog/Artigos</Radio>
              <Radio class="w-1/3" label="3">Ligações Externas</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <Col
          span="24"
          :xs="24"
          :sm="formData.type != 3 ? 8 : 24"
          v-if="formData.type && formData.type != 3"
        >
          <FormItem
            prop="slider_dst"
            :label="formData.type == 1 ? 'Curso' : 'Artigo'"
          >
            <Select
              :placeholder="
                formData.type == 1
                  ? 'Selecione um curso em destaque'
                  : formData.type == 2
                  ? 'Selecione um artigo em destaque'
                  : ''
              "
              v-model="slider_dst"
            >
              <template v-if="formData.type == 1">
                <Option
                  v-for="course in courses"
                  :value="course.id"
                  :key="course.id"
                  >{{ course.name }}</Option
                >
              </template>
              <template v-if="formData.type == 2">
                <Option
                  v-for="article in articles"
                  :value="article.id"
                  :key="article.id"
                  >{{ article.title }}</Option
                >
              </template>
            </Select>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="formData.type != 3 ? 16 : 24">
          <FormItem
            prop="title"
            label="Título do Slider"
            :error="showFormErrors('title')"
          >
            <Input
              v-model="formData.title"
              placeholder="Insira o título deste slider"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24">
          <FormItem
            prop="description"
            label="Descrição"
            :error="showFormErrors('description')"
          >
            <Input
              type="textarea"
              :rows="3"
              v-model="formData.description"
              placeholder="Insira descrição/resumo deste Slider"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="12">
          <FormItem
            :prop="formData.type == 3 ? 'link' : 'link2'"
            label="Ligação/Link"
            :error="showFormErrors('link')"
          >
            <Input
              :disabled="formData.type != 3"
              v-model="formData.link"
              :placeholder="
                formData.type != 3
                  ? 'Ligação será inserida automaticamente'
                  : 'Insira a ligação do Slider (Link)'
              "
            ></Input>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="12">
          <FormItem
            prop="btn_text"
            label="Estilo da ligação"
            :error="showFormErrors('btn_text')"
          >
            <Input
              v-model="formData.btn_text"
              placeholder="Texto da ligação (Ex. Ler mais)"
            >
              <Select
                v-model="formData.btn_style"
                slot="prepend"
                style="width: 100px"
                placeholder="Tipo"
              >
                <Option value="1">Botão</Option>
                <Option value="2">Texto</Option>
              </Select>
            </Input>
          </FormItem>
        </Col>
      </Row>

      <Divider orientation="left">Modo de Apresentação</Divider>

      <Row :gutter="16">
        <Col span="24">
          <FormItem label="Capa do curso">
            <base-file-upload
              ref="sliderBackground"
              :uploadMsg="'Clique ou largue uma imagem aqui'"
              :fileList="uploadBackgroundList"
              :fileActions="
                `${$axios.defaults.baseURL}/upload-slider-background`
              "
              :tempFileUrl="
                `${publicURL}/uploads/sliders/background/${formData.background}`
              "
              :fileFormData="formData.background"
              @onFileSuccess="handleBackgroundSuccess($event)"
              @onRemoveFile="handleRemoveBackground($event)"
            ></base-file-upload>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="12">
          <div class="mb-3 -mt-1">Escola uma cor padrão para este slider</div>
          <ColorPicker v-model="formData.color" />
        </Col>

        <Col span="24" :xs="24" :sm="12">
          <FormItem label="Ativação do slider">
            <i-switch v-model="formData.status" size="large">
              <span slot="open">Sim</span>
              <span slot="close">Não</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button @click="clearSliderForm()" style="margin-right: 8px"
                >Limpar</Button
              >

              <Button @click="cancelSlider()">Cancelar</Button>

              <Button
                :loading="sending"
                type="primary"
                style="margin-left: 8px"
                @click.stop="
                  creating
                    ? addData(
                        'sliderForm',
                        'sliders',
                        'Slider regsitado',
                        'APP_UPDATE_SLIDERS_DATA',
                        'sliders/toggleCreateSliderDialog'
                      )
                    : updateData(
                        'sliderForm',
                        'sliders',
                        'Slider Atualizado',
                        'APP_UPDATE_SLIDERS_DATA',
                        'sliders/toggleUpdateSliderDialog'
                      )
                "
                ><span v-if="!sending">{{
                  creating ? "Registar" : "Atualizar"
                }}</span>
                <span v-else>Enviando...</span></Button
              >
            </div>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { uploadFeedback } from "@/mixins/handleFileUploads";
import { slider_validation } from "@/mixins/fieldsValidation";

export default {
  name: "SliderForm",
  mixins: [requests, uploadFeedback, slider_validation],
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
      uploadBackgroundList: [],
      slider_dst: ""
    };
  },

  mounted() {
    this.initFilesUploaded();
  },
  computed: {
    ...mapGetters({
      courses: "courses/featured_courses",
      articles: "articles/featured_articles"
    })
  },

  watch: {
    "formData.type"(newVal) {
      this.resetData();
    },

    slider_dst(newVal) {
      this.setSliderTitle(newVal);
    }
  },

  methods: {
    async clearSliderForm() {
      this.resetFormFields("sliderForm");
      await this.handleRemoveBackground(this.$event);
    },
    async cancelSlider() {
      await this.handleRemoveBackground(this.$event);
      if (this.creating) {
        this.handleModal("sliders/toggleCreateSliderDialog");
        this.resetFormFields("sliderForm");
        return;
      }
      this.handleModal("sliders/toggleUpdateSliderDialog");
    },
    async setSliderTitle(id) {
      let course = await this.courses.find(course => course.id === id);
      let article = await this.articles.find(article => article.id === id);
      if (this.formData.type == 1 && course) {
        this.formData.title = "Curso de " + course.name;
        this.formData.link = course.slug;
        this.formData.description = course.presentation;
      }

      if (this.formData.type == 2 && article) {
        this.formData.title = article.title;
        this.formData.link = article.slug;
        this.formData.description = article.summary;
      }
    },

    resetData() {
      this.slider_dst = "";
      this.formData.title = "";
      this.formData.link = "";
      this.formData.description = "";
      // this.resetFormFields("sliderForm");
    },

    handleBackgroundSuccess(res) {
      this.formData.background = res;
      this.uploadBackgroundList = this.$refs.sliderBackground.$refs.uploadFileComponent.fileList;
    },

    async handleRemoveBackground() {
      let background = this.formData.background;
      const res = await this.$axios.post("remove-slider-background", {
        background: background
      });
      if (res.status != 200) {
        this.formData.background = background;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadBackgroundList = this.$refs.sliderBackground.$refs.uploadFileComponent.clearFiles();
      this.formData.background = "";
    },

    initFilesUploaded() {
      if (this.creating) {
        this.uploadBackgroundList = this.$refs.sliderBackground.$refs.uploadFileComponent.fileList;
        return;
      }

      this.uploadBackgroundList.push({
        response: this.formData.background,
        status: "finished"
      });
    }
  }
};
</script>

<style lang="css"></style>
