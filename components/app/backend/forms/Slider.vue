<template>
  <el-form
    ref="sliderForm"
    :model="formData"
    :rules="sliderFormValidation"
    label-position="top"
    label-width="80"
  >
    <el-divider content-position="left">
      <span class="text-gray-500">Descrição Geral</span></el-divider
    >

    <el-row :gutter="20">
      <el-col>
        <el-form-item prop="type" label="Slider Para">
          <el-radio-group  v-model="formData.type">
            <el-radio-button label="1"
              >Cursos/Formações</el-radio-button
            >
            <el-radio-button label="2"
              >Blog/Artigos</el-radio-button
            >
            <el-radio-button label="3"
              >Ligações Externas</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col
        :xs="24"
        :sm="formData.type != 3 ? 8 : 24"
        v-if="formData.type && formData.type != 3"
      >
        <el-form-item
          prop="slider_dst"
          :label="formData.type == 1 ? 'Curso' : 'Artigo'"
        >
          <el-select
            @change="setSliderTitle()"
            class="w-full"
            v-model="formData.slider_dst"
            :placeholder="
              formData.type == 1
                ? 'Selecione um curso em destaque'
                : formData.type == 2
                ? 'Selecione um artigo em destaque'
                : ''
            "
          >
            <template v-if="formData.type == 1">
              <el-option
                v-for="course in courses"
                :value="course.id"
                :key="course.id"
                :label="course.name"
              ></el-option>
            </template>

            <template v-if="formData.type == 2">
              <el-option
                v-for="article in articles"
                :value="article.id"
                :key="article.id"
                :label="article.name"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="formData.type != 3 ? 16 : 24">
        <el-form-item
          prop="title"
          label="Título do Slider"
          :error="showFormErrors('title')"
        >
          <el-input
            placeholder="Insira o título deste slider"
            v-model="formData.title"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item
          prop="description"
          label="Descrição"
          :error="showFormErrors('description')"
        >
          <el-input
            placeholder="Insira descrição/resumo deste Slider"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            v-model="formData.description"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item
          :prop="formData.type == 3 ? 'link' : 'link2'"
          label="Ligação/Link"
          :error="showFormErrors('link')"
        >
          <el-input
            :disabled="formData.type != 3"
            v-model="formData.link"
            :placeholder="
              formData.type != 3
                ? 'Ligação será inserida automaticamente'
                : 'Insira a ligação do Slider (Link)'
            "
          >
            <template slot="prepend">Https://</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item
          prop="btn_text"
          label="Estilo da ligação"
          :error="showFormErrors('btn_text')"
        >
          <el-input
            v-model="formData.btn_text"
            placeholder="Texto da ligação (Ex. Ler mais)"
          >
            <el-select
              class="w-32"
              slot="append"
              v-model="formData.btn_style"
              placeholder="Tipo"
            >
              <el-option label="Botão" value="1"> </el-option>
              <el-option label="Texto" value="2"> </el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left">
      <span class="text-gray-500">Modo de Apresentação</span></el-divider
    >

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <el-form-item prop="background" label="Imagem do Slider">
          <baseImageUpload
            ref="sliderBackground"
            :uploadMsg="'Clique ou largue o logotipo aqui'"
            :fileActions="`${$axios.defaults.baseURL}/upload-slider-background`"
            :fileList="uploadBackgroundList"
            @onFileSuccess="handleBackgroundSuccess($event)"
            @onRemoveFile="handleRemoveBackground($event)"
          ></baseImageUpload>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item label="Cor padrõ do slider" prop="color" class="m-3">
          <el-color-picker v-model="formData.color"></el-color-picker>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item prop="status" label="Ativação">
          <el-switch
            active-text="Sim"
            inactive-text="Não"
            v-model="formData.status"
          ></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
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
      uploadBackgroundList: [],
      disabledUpload: false,
      sliderTab: "slider_info",
      resetPass: false
    };
  },

  computed: {
    ...mapGetters({
      courses: "courses/featured_courses",
      articles: "articles/featured_articles"
    })
  },

   watch: {
    "formData.slider_dst"(newVal) {
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
      this.formData.slider_dst = "";
      this.formData.title = "";
      this.formData.link = "";
      this.formData.description = "";
      // this.resetFormFields("sliderForm");
    },




    handleBackgroundSuccess(res) {
      this.formData.background = res;
      if (
        this.formData.background &&
        this.$refs.sliderBackground.$refs.uploadImageComponent.uploadFiles
          .length > 0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadBackgroundList = this.$refs.sliderBackground.$refs.uploadImageComponent.clearFiles();
      }
    },

    async handleRemoveBackground() {
      let background = this.formData.background;
      if (background.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-slider-background", {
        background: background
      });
      if (res.status != 200) {
        this.formData.background = background;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadBackgroundList = this.$refs.sliderBackground.$refs.uploadImageComponent.clearFiles();
      this.formData.background = "";
      this.disabledUpload = false;
    },

    async addSlider() {
      await this.addData(
        "sliderForm",
        "sliders",
        "Slider Registado",
        "APP_UPDATE_SLIDERS_DATA",
        "sliders/toggleCreateSliderDialog"
      );
      this.sliderTab = "slider_info";
      this.$refs.sliderBackground.$refs.uploadImageComponent.clearFiles();
    },

    updateSlider() {
      this.updateData(
        "sliderForm",
        "sliders",
        "Slider Atualizado",
        "APP_UPDATE_SLIDERS_DATA",
        "sliders/toggleCreateSliderDialog"
      );
      this.sliderTab = "slider_info";
      this.$refs.sliderBackground.$refs.uploadImageComponent.clearFiles();
    },

    cancelSliderForm() {
      this.resetFormFields("sliderForm");
      if (this.formData.background && this.formData.background != "default.svg") {
        this.handleRemoveBackground();
      }
      this.sliderTab = "slider_info";
      this.handleModal("sliders/toggleCreateSliderDialog");
    },

    initFilesUploaded() {
      this.uploadBackgroundList = [];
      if (
        !this.creating &&
        this.formData.background &&
        !this.formData.background.includes("default")
      ) {
        this.uploadBackgroundList.push({
          name: this.formData.background,
          response: this.formData.background,
          percentage: 100,
          status: "success",
          url: `${this.publicURL}/uploads/sliders/background/${this.formData.background}`
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
