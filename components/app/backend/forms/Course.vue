<template>
  <el-form ref="courseForm" :model="formData" :rules="courseFormValidation">
    <el-tabs type="card" v-model="courseTab">
      <el-tab-pane label="Descrição Geral" name="course_info">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item
              prop="name"
              label="Nome do Curso"
              :error="showFormErrors('name')"
            >
              <el-input
                placeholder="Introduza o nome do curso"
                v-model="formData.name"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item
              prop="abbr"
              label="Abreviatura"
              :error="showFormErrors('abbr')"
            >
              <el-input
                placeholder="Abreviatura para este curso"
                v-model="formData.abbr"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :error="showFormErrors('summary')"
              prop="summary"
              label="Objetivo geral do curso"
            >
              <el-input
                :autosize="{ minRows: 3, maxRows: 6 }"
                type="textarea"
                placeholder="Apresente um pequeno resumo do foco deste curso"
                v-model="formData.summary"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              :error="showFormErrors('presentation')"
              prop="presentation"
              label="Apresentação/Descrição"
            >
              <el-input
                :autosize="{ minRows: 3, maxRows: 6 }"
                type="textarea"
                placeholder="Faça uma apresentação ou descruição detalhada deste curso"
                v-model="formData.presentation"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="Data de lançamento"
              prop="release"
              :error="showFormErrors('release')"
            >
              <el-date-picker
                :value="formData.release"
                class="w-full"
                v-model="formData.release"
                type="date"
                placeholder="Data de lançamento do curso"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              prop="family_id"
              label="Família do curso"
              :error="showFormErrors('family_id')"
            >
              <el-select
                class="w-full"
                v-model="formData.family_id"
                placeholder="Selecionar uma família ou categoria para este curso"
              >
                <el-option
                  v-for="family in families"
                  :value="family.id"
                  :key="family.id"
                  :label="family.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              prop="type"
              label="Tipo de Oferta"
              :error="showFormErrors('type')"
            >
              <el-radio-group v-model="formData.type">
                <el-radio-button label="1">Área Técnica</el-radio-button>
                <el-radio-button label="2"
                  >Formação Profissional</el-radio-button
                >
                <el-radio-button label="3"
                  >Formação de Curta Duração</el-radio-button
                >
                <el-radio-button label="4">ACP</el-radio-button>
                <el-radio-button label="5">Outros</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              prop="duration_type"
              label="Duração do curso"
              :error="showFormErrors('duration_type')"
            >
              <el-input
                placeholder="Abreviatura para este curso"
                v-model="formData.duration"
              >
                <el-select
                  class="w-32"
                  slot="append"
                  v-model="formData.duration_type"
                  placeholder="Duração"
                >
                  <el-option label="Dia/s" value="1"> </el-option>
                  <el-option label="Mês/es" value="2"> </el-option>
                  <el-option label="Ano/s" value="3"> </el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="Perfil de Acesso/Saída" name="perfil">
        <el-row>
          <el-col>
            <el-form-item
              prop="requirement"
              label="Requisitos de Acess"
              :error="showFormErrors('requirement')"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                placeholder="Introduza as condições de acesso ao curso"
                v-model="formData.requirement"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <div class="mb-2 text-gray-700">
              Selecione as saídas para este curso
            </div>
            <el-form-item prop="course_outcomes">
              <el-transfer
                class="w-full"
                filterable
                :filter-method="filterMethod"
                filter-placeholder="Filtrar saídas"
                :props="{
                  key: 'id',
                  label: 'name'
                }"
                v-model="formData.course_outcomes"
                :data="outcomes"
                :titles="['Saídas Disponíveis', 'Selecionados']"
              >
              </el-transfer>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="Coordenação Geral" name="coordenation">
        <el-row>
          <el-col>
            <el-form-item
              prop="departament_id"
              label="Departamento"
              :error="showFormErrors('departament_id')"
            >
              <el-select
                class="w-full"
                v-model="formData.departament_id"
                placeholder="Selecionar o departamento do curso"
              >
                <el-option
                  v-for="departament in departaments"
                  :value="departament.id"
                  :key="departament.id"
                  :label="departament.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col>
            <template v-for="(teacher, k) in formData.teachers">
              <el-row :key="k + 'coordination'" :gutter="20">
                <el-col :span="24" :xs="24" :sm="12">
                  <el-form-item prop="teacher_id" label="Cordenador">
                    <el-select
                      class="w-full"
                      v-model="teacher.coordination.teacher_id"
                      placeholder="Selecionar o coordenador"
                    >
                      <el-option
                        v-for="teacher in actived_teachers"
                        :value="teacher.id"
                        :key="teacher.id"
                        :label="teacher.employee.person.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6">
                  <el-form-item
                    :error="
                      showFormErrors('teachers.0.coordination.start_date')
                    "
                    prop="start_date"
                    label="Início"
                  >
                    <el-date-picker
                      value-format="yyyy-MM-dd "
                      :value="teacher.coordination.start_date"
                      class="w-full"
                      placeholder="Data de início da cordenação"
                      v-model="teacher.coordination.start_date"
                      type="date"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6">
                  <el-form-item
                    :error="showFormErrors('teachers.0.coordination.end_date')"
                    prop="end_date"
                    label="Fim"
                  >
                    <el-date-picker
                      value-format="yyyy-MM-dd "
                      :value="teacher.coordination.end_date"
                      class="w-full"
                      placeholder="Data de fim da cordenação"
                      v-model="teacher.coordination.end_date"
                      type="date"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </el-col>
        </el-row>

        <el-divider content-position="left"
          ><span class="text-gray-500"
            >Associar disciplinas/Modulos</span
          ></el-divider
        >

        <el-row>
          <el-col>
            <el-col
              class="mb-2"
              v-if="!(adding_discipline || on_edit_discipline)"
            >
              <el-button type="primary" @click="adding_discipline = true"
                >Adicionar Disciplinas ao Curso</el-button
              >
              <el-button
                type="primary"
                v-if="
                  formData.disciplines.length > 0 &&
                    !(adding_discipline || on_edit_discipline)
                "
                @click="clearAllDisciplines()"
                >Limpar todos</el-button
              >
            </el-col>

            <el-col v-if="adding_discipline || on_edit_discipline" class="mb-2">
              <el-form
                ref="attributionForm"
                :model="temp_attribution"
                :rules="attributionValidation"
              >
                <el-row :gutter="20">
                  <el-col>
                    <el-form-item
                      label="Disciplina"
                      prop="attribution.discipline_id"
                      :error="
                        repeated_discipline ? 'Disciplina já configurada' : ''
                      "
                    >
                      <el-select
                        class="w-full"
                        v-model="temp_attribution.attribution.discipline_id"
                        placeholder="Selecionar disciplina"
                        @change="
                          findRepeatedDiscipline(
                            temp_attribution.attribution.discipline_id
                          )
                        "
                      >
                        <el-option
                          v-for="discipline in disciplines"
                          :value="discipline.id"
                          :key="discipline.id"
                          :label="discipline.name"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item
                      prop="attribution.workload"
                      label="Carga horária"
                    >
                      <el-input-number
                        class="w-full"
                        placeholder="Carga Horária"
                        v-model="temp_attribution.attribution.workload"
                        controls-position="right"
                        :min="1"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item
                      prop="attribution.academic_year"
                      label="Ano Académico"
                    >
                      <el-select
                        class="w-full"
                        v-model="temp_attribution.attribution.academic_year"
                        placeholder="Selecionar o ano académico"
                      >
                        <el-option value="1º Ano" label="1º Ano"></el-option>
                        <el-option value="2º Ano" label="2º Ano"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item prop="attribution.period" label="Periodo">
                      <el-select
                        class="w-full"
                        v-model="temp_attribution.attribution.period"
                        placeholder="Selecionar o periodo"
                      >
                        <el-option
                          value="1º Trimestre"
                          label="1º Trimestre"
                        ></el-option>
                        <el-option
                          value="2º Trimestre"
                          label="2º Trimestre"
                        ></el-option>
                        <el-option
                          value="3º Trimestre"
                          label="3º Trimestre"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col>
                    <el-form-item>
                      <el-button
                        :disabled="repeated_discipline"
                        type="primary"
                        @click="
                          on_edit_discipline
                            ? updateDiscipline('attributionForm')
                            : adding_discipline
                            ? addDiscipline('attributionForm')
                            : ''
                        "
                        >{{
                          on_edit_discipline ? "Atualizar" : "Adicionar"
                        }}</el-button
                      >

                      <el-button-group>
                        <el-button
                          type="primary"
                          @click="
                            on_edit_discipline
                              ? cancelUpdateDiscipline()
                              : adding_discipline
                              ? cancelAddingDiscipline()
                              : ''
                          "
                        >
                          Cancelar</el-button
                        >
                        <el-button
                          v-if="formData.disciplines.length > 0"
                          @click="clearAllDisciplines()"
                          >Limpar Todos</el-button
                        >
                      </el-button-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
            <el-col v-if="formData.disciplines.length">
              <el-table border :data="formData.disciplines" style="width: 100%">
                <el-table-column label="Disciplina" min-width="180">
                  <template slot-scope="{ row }">
                    <span>{{
                      selectedDiscipline(row.attribution.discipline_id)
                    }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="Carga Horária" width="100">
                  <template slot-scope="{ row }">
                    <span>{{ row.attribution.academic_year }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="Periodo" width="100">
                  <template slot-scope="{ row }">
                    <span>{{ row.attribution.period }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="Operations" width="120">
                  <template slot-scope="{ $index }">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      circle
                      size="mini"
                      style="margin-right: 5px"
                      @click.stop="onEditDiscipline($index)"
                      :disabled="on_edit_discipline"
                    ></el-button>

                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                      @click.stop="removeFormData($index, formData.disciplines)"
                      :disabled="on_edit_discipline"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="Apresentação do Curso" name="presentation">
        <el-row :gutter="20">
          <el-col>
            <el-form-item
              label="Cor que representa o curso"
              prop="color"
              class="m-3"
            >
              <el-color-picker v-model="formData.color"></el-color-picker>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item prop="cover" label="Imagem de capa">
              <baseImageUpload
                ref="courseCover"
                :uploadMsg="'Clique ou largue o covertipo aqui'"
                :fileActions="`${$axios.defaults.baseURL}/upload-course-cover`"
                :fileList="uploadCoverList"
                @onFileSuccess="handleCoverSuccess($event)"
                @onRemoveFile="handleRemoveCover($event)"
              ></baseImageUpload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left"
          ><span class="text-gray-500">Ativação e Destaque</span></el-divider
        >

        <el-row>
          <el-col>
            <el-col :span="24">
              <el-form-item prop="status" label="Ativação do curso">
                <el-switch
                  active-text="Ativo"
                  inactive-text="Inativo"
                  v-model="formData.status"
                >
                </el-switch>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item prop="featured" label="Colocar o curso em destaque">
                <el-switch
                  active-text="Sim"
                  inactive-text="Não"
                  v-model="formData.featured"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";

import { requests } from "@/mixins/appRequest";
import { uploadFeedback } from "@/mixins/handleFileUploads";
import { alerts } from "@/mixins/appAlerts";
import { debounce, find } from "lodash";

import {
  course_validation,
  mult_form_validation
} from "@/mixins/fieldsValidation";
import { handleFormData } from "@/mixins/multFormData";
export default {
  name: "CourseForm",
  mixins: [
    requests,
    uploadFeedback,
    course_validation,
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
      courseTab: "course_info",
      // --------------------
      adding_discipline: false,
      no_discipline: false,
      repeated_discipline: false,
      selected_discipline: "",
      on_edit_discipline: false,

      // --------------------

      temp_attribution: {
        attribution: {
          id: "",
          discipline_id: "",
          workload: "",
          academic_year: "",
          period: ""
        }
      }
    };
  },

  computed: {
    ...mapGetters({
      departaments: "departaments/departaments",
      families: "families/families",
      outcomes: "outcomes/outcomes",
      disciplines: "disciplines/disciplines",
      actived_teachers: "teachers/actived_teachers"
    }),

    device() {
      return this.$store.state.app.device;
    }
  },

  methods: {
    selectedDiscipline(discipline_id) {
      return find(this.disciplines, function(d) {
        return d.id == discipline_id;
      }).name;
    },
    filterMethod(query, item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    },
    handleCoverSuccess(res) {
      this.formData.cover = res;
      if (
        this.formData.cover &&
        this.$refs.courseCover.$refs.uploadImageComponent.uploadFiles.length > 0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadCoverList = this.$refs.courseCover.$refs.uploadImageComponent.clearFiles();
      }
    },

    async handleRemoveCover() {
      let cover = this.formData.cover;
      if (cover.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-course-cover", {
        cover: cover
      });
      if (res.status != 200) {
        this.formData.cover = cover;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadCoverList = this.$refs.courseCover.$refs.uploadImageComponent.clearFiles();
      this.formData.cover = "";
      this.disabledUpload = false;
    },

    async addCourse() {
      await this.addData(
        "courseForm",
        "courses",
        "Curso Registado",
        "APP_UPDATE_COURSES_DATA",
        "courses",
        false
      );
      this.courseTab = "course_info";
      this.$refs.courseCover.$refs.uploadImageComponent.clearFiles();
    },

    updateCourse() {
      this.updateData(
        "courseForm",
        "courses",
        "Curso Atualizado",
        "APP_UPDATE_COURSES_DATA",
        "courses",
        false
      );
      this.courseTab = "course_info";
      this.$refs.courseCover.$refs.uploadImageComponent.clearFiles();

    },

    cancelCourseForm() {
      this.resetFormFields("courseForm");
      if (this.formData.cover && this.formData.cover != "default.svg") {
        this.handleRemoveCover();
      }

      this.courseTab = "course_info";
      this.handleModal("courses/toggleCreateCourseDialog");
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
          url: `${this.publicURL}/uploads/courses/covers/${this.formData.cover}`
        });
      }
    },

    cancelAddingDiscipline() {
      this.clearTempDiscipline();
      this.adding_discipline = false;
      this.on_edit_discipline = false;
    },

    clearTempDiscipline() {
      this.temp_attribution = {
        attribution: {
          id: "",
          discipline_id: "",
          workload: "",
          academic_year: "",
          period: ""
        }
      };
    },

    addDiscipline(formRef) {
      this.addMultFormData(
        formRef,
        "disciplines",
        this.repeated_discipline,
        this.temp_attribution,
        this.clearTempDiscipline
      );
    },

    onEditDiscipline(index) {
      this.selected_discipline = "";
      this.repeated_discipline = false;
      let aux_discipline = this.formData.disciplines[index].attribution;
      this.temp_attribution.attribution.discipline_id =
        aux_discipline.discipline_id;
      this.temp_attribution.attribution.workload = aux_discipline.workload;
      this.temp_attribution.attribution.academic_year =
        aux_discipline.academic_year;
      this.temp_attribution.attribution.period = aux_discipline.period;
      this.selected_discipline = index;
      this.on_edit_discipline = true;
      this.adding_discipline = false;
    },

    clearAllDisciplines() {
      this.clearAllMultFormData("disciplines", this.clearTempDiscipline);
      this.repeated_discipline = false;
      this.adding_discipline = false;
      this.on_edit_discipline = false;
    },

    findRepeatedDiscipline: debounce(function(discipline_id) {
      this.repeated_discipline = false;
      for (var i = 0; i < this.formData.disciplines.length; i++) {
        if (
          this.formData.disciplines[i].attribution.discipline_id ==
            discipline_id &&
          i !== this.attribution_edited
        ) {
          this.repeated_discipline = true;
          return;
        }
      }
      this.repeated_discipline = false;
      return;
    }, 500),

    cancelUpdateDiscipline() {
      this.cancelMultFormData(
        "disciplines",
        this.selected_discipline,
        this.clearTempDiscipline
      );
      this.on_edit_discipline = false;
      this.adding_discipline = false;
    },

    updateDiscipline(formRef) {
      this.updateMultFormData(
        formRef,
        this.repeated_discipline,
        "disciplines",
        this.selected_discipline,
        this.temp_attribution,
        this.clearTempDiscipline
      );

      this.selected_discipline = "";
      this.on_edit_discipline = false;
      this.adding_discipline = false;
    }
  }
};
</script>
