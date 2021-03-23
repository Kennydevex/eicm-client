<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button size="medium" type="primary" @click.stop="onCreateSlider()"
          ><span>Criar Novo Slider</span></el-button
        >

        <appBackendCommonRegisterDialog
          @save-data="onSaveSlider()"
          @update-data="onUpdateSlider()"
          @cancel-data="cancelSliderForm()"
          :dialogVisible="create_slider_dialog"
          :dialogTitle="slider_dialog_title"
          :dialogWidth="400"
          :creatingRecord="creatingSlider"
        >
          <appBackendFormsSlider
            :creating="creatingSlider"
            :formData="formData"
            ref="sliderForm"
          ></appBackendFormsSlider>
        </appBackendCommonRegisterDialog>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <appBackendCommonDataTable
          :deleteEntity="'sliders'"
          :updateEntity="'APP_UPDATE_SLIDERS_DATA'"
          :tableFields="tableFields"
          :searchParams="[{ name: 'Título', key: 'title' }]"
          :sendingData="sending"
          :dataSourse="sliders"
          @handleContextMenu="contextMenu($event)"
          @handleEdit="onEditSlider($event)"
          @handleDelete="onDeleteSlider($event)"
        >
          <template v-slot:column_after>
            <el-table-column
              header-align="center"
              align="center"
              label="Ativação"
              width="80"
            >
              <template slot-scope="{ row }">
                <el-popover trigger="hover" placement="top">
                  <p>
                    <b>Ativação:</b>
                    <span
                      :class="!row.status ? 'text-red-400' : 'text-green-600'"
                    >
                      {{ row.status ? "Slider Ativo" : "Slider Inativo" }}
                    </span>

                    <el-button
                      @click="
                        toggleStatus(
                          'sliders/slider-activation',
                          row.id,
                          row.status,
                          'Slider',
                          'APP_UPDATE_SLIDERS_DATA'
                        )
                      "
                      type="text"
                      >{{ row.status ? "Inativar" : "Ativar" }}</el-button
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
  name: "SlidersIndex",
  mixins: [handleActivations, deleteDatas],

  async fetch({ store }) {
    await store.dispatch("sliders/getSliders", 1);
  },

  data() {
    return {
      creatingSlider: "",
      selected: [],
      tableFields: [{ label: "Título", name: "title" }],
      sending: {},
      singleSlider: {},
      formData: {
        id: "",
        title: "",
        description: "",
        slider_dst: "",
        link: "",
        btn_text: "",
        btn_style: "1",
        background: "default.svg",
        color: "#3E4095",
        type: "3",
        status: false
      }
    };
  },

  computed: {
    ...mapGetters({
      sliders: "sliders/sliders"
      //   pagination: "sliders/pagination"
    }),
    create_slider_dialog: {
      get() {
        return this.$store.state.sliders.create_slider_dialog;
      },
      set(val) {
        this.$store.commit("sliders/create_slider_dialog", val);
      }
    },
    slider_dialog_title() {
      return this.creatingSlider ? "Registar Slider" : "Editar Slider";
    }
  },

  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_SLIDERS_DATA", () => {
        this.getSliders(1);
      });
    }
  },

  methods: {
    contextMenu() {
      console.log("context menu");
    },
    async cancelSliderForm() {
      this.$refs.sliderForm.cancelSliderForm();
    },
    async onSaveSlider() {
      this.$refs.sliderForm.addSlider();
    },
    async onUpdateSlider() {
      await this.loadExtraData();
      this.$refs.sliderForm.updateSlider();
    },
    async onCreateSlider() {
      this.resetFormData();
      this.creatingSlider = true;
      await this.loadExtraData();
      await this.handleModal("sliders/toggleCreateSliderDialog");
    },

    async onEditSlider(ev) {
      this.creatingSlider = false;
      try {
        this.$set(this.sending, ev[1].id, true);
        await this.$axios.$get(`sliders/${ev[1].id}`).then(res => {
          this.singleSlider = res.data;
          this.formData = this.singleSlider;
          this.handleModal("sliders/toggleCreateSliderDialog");
          this.$set(this.sending, ev[1].id, false);
        });
        this.$refs.sliderForm.initFilesUploaded();
      } catch (error) {
        this.actionMsg("Algo correu mal", "error");
      }
    },

    onDeleteSlider(ev) {
      this.onDelete("sliders", ev[1].id, "APP_UPDATE_SLIDERS_DATA");
    },

    resetFormData() {
      this.formData = {
        id: "",
        title: "",
        description: "",
        slider_dst: "",
        link: "",
        btn_text: "",
        btn_style: "1",
        background: "default.svg",
        color: "#3E4095",
        type: "3",
        status: false
      };
    },

    async getSliders(page) {
      await this.$store.dispatch("sliders/getSliders", page);
    },

    async loadExtraData() {
      await this.$store.dispatch("articles/getFeaturedArticles");
      await this.$store.dispatch("courses/getFeaturedCourses");
    }
  }
};
</script>
