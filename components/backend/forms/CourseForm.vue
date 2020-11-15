<template>
  <div>
    <Form
      ref="courseForm"
      :model="formData"
      :rules="courseFormValidation"
      label-position="top"
    >
      <Tabs type="card" value="description">
        <TabPane label="Descrição Geral" name="description">
          <div>
            <Row :gutter="16">
              <Col span="18">
                <FormItem
                  :error="showFormErrors('name')"
                  label="Nome do Curso"
                  prop="name"
                >
                  <Input
                    v-model="formData.name"
                    placeholder="Insira o nome do curso"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem
                  :error="showFormErrors('abbr')"
                  prop="abbr"
                  label="Abreviatura"
                >
                  <Input
                    v-model="formData.abbr"
                    placeholder="Insira uma abreviatura para este curso"
                  ></Input>
                </FormItem>
              </Col>

              <Col span="24">
                <FormItem
                  prop="summary"
                  :error="showFormErrors('summary')"
                  label="Resumo/Missão do curso"
                >
                  <Input
                    type="textarea"
                    :rows="2"
                    v-model="formData.summary"
                    placeholder="Faça um pequeno resumo deste curso"
                  ></Input>
                </FormItem>
              </Col>

              <Col span="24">
                <FormItem
                prop="presentation"
                  :error="showFormErrors('presentation')"
                  label="Apresentação/Descrição"
                >
                  <Input
                    type="textarea"
                    :rows="4"
                    v-model="formData.presentation"
                    placeholder="Faça a apresentação ou descruição deste curso"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  prop="release"
                  label="Data de Lançamento"
                  :error="showFormErrors('release')"
                >
                  <DatePicker
                    class="w-full"
                    :value="formData.release"
                    type="date"
                    placeholder="Data de abertura da escola"
                    v-model="formData.release"
                  ></DatePicker>
                </FormItem>
              </Col>

              <Col span="12">
                <FormItem
                  label="Familia do Curso"
                  :error="showFormErrors('family_id')"
                  prop="family_id"
                >
                  <Select
                    v-model="formData.family_id"
                    placeholder="Familia do curso"
                  >
                    <Option
                      v-for="family in families"
                      :value="family.id"
                      :key="family.id"
                      >{{ family.name }}</Option
                    >
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
                    <Option value="1">Curso Via Técnica</Option>
                    <Option value="2">Formação Profissional</Option>
                    <Option value="3">Curso de Curta Duração</Option>
                    <Option value="4">ACP</Option>
                    <Option value="5">Outros</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem prop="duration_type" label="Duração do Curso">
                  <Input v-model="formData.duration">
                    <Select
                      v-model="formData.duration_type"
                      slot="append"
                      style="width: 80px"
                    >
                      <Option value="1">Dia(s)</Option>
                      <Option value="2">Mês(s)</Option>
                      <Option value="3">Ano(s)</Option>
                    </Select>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane label="Perfil de Acesso/Saída" name="perfil">
          <div>
            <Row :gutter="16">
              <Col span="24">
                <FormItem
                prop="requirement"
                  :error="showFormErrors('requirement')"
                  label="Requisitos de Acesso"
                >
                  <Input
                    type="textarea"
                    :rows="4"
                    v-model="formData.requirement"
                    placeholder="Introduza as condições de acesso ao curso"
                  ></Input>
                </FormItem>
              </Col>

              <Col span="24">
                <FormItem prop="course_outcomes" label="Perfil de Saída">
                  <Select multiple v-model="formData.course_outcomes">
                    <Option
                      v-for="outcome in outcomes"
                      :value="outcome.id"
                      :key="outcome.id"
                      >{{ outcome.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane label="Cordenação" name="coordenation">
          <div>
            <Row :gutter="16">
              <Col span="24">
                <FormItem label="Departamento" prop="departament_id">
                  <Select v-model="formData.departament_id">
                    <Option
                      v-for="departament in departaments"
                      :value="departament.id"
                      :key="departament.id"
                      >{{ departament.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Cordenação do Curso</span
              ></Divider
            >

            <template v-for="(teacher, k) in formData.teachers">
              <Row :key="k + 'coordination'">
                <Col span="24">
                  <FormItem prop="teacher_id" label="Cordenador do curso">
                    <Select
                      placeholder="Selecionar cordenador"
                      v-model="teacher.coordination.teacher_id"
                    >
                      <Option
                        v-for="teacher in actived_teachers"
                        :value="teacher.id"
                        :key="teacher.id"
                        >{{ teacher.employee.person.name }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>

                <Col span="11">
                  <FormItem prop="start_date" label="Início da cordenação">
                    <DatePicker
                      format="dd/MM/yyyy"
                      class="w-full"
                      type="date"
                      placeholder="Data de início da cordenação"
                      v-model="teacher.coordination.start_date"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                  <FormItem prop="end_date" label="Fim da corenação">
                    <DatePicker
                      format="dd/MM/yyyy"
                      class="w-full"
                      type="date"
                      placeholder="Data de fim da cordenação"
                      v-model="teacher.coordination.end_date"
                    ></DatePicker>
                  </FormItem>
                </Col>
              </Row>
            </template>
            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Associação das disciplinas/Modulos</span
              ></Divider
            >

            <Row :gutter="16">
              <Col
                span="24"
                class="mb-5"
                v-if="!(adding_discipline || on_edit_discipline)"
              >
                <Button type="primary" @click="adding_discipline = true"
                  >Associar Disciplinas</Button
                >
                <Button
                  v-if="
                    formData.disciplines.length > 0 &&
                      !(adding_discipline || on_edit_discipline)
                  "
                  @click="clearAllDisciplines()"
                >
                  Limpar dados
                </Button>
              </Col>

              <Col
                v-if="adding_discipline || on_edit_discipline"
                span="24"
                class="mb-2"
              >
                <Form
                  ref="attributionForm"
                  :model="temp_attribution"
                  :rules="attributionValidation"
                >
                  <Row :gutter="16">
                    <Col span="12">
                      <FormItem
                        prop="attribution.discipline_id"
                        :error="
                          repeated_discipline ? 'Disciplina já configurada' : ''
                        "
                      >
                        <Select
                          @on-change="
                            findRepeatedDiscipline(
                              temp_attribution.attribution.discipline_id
                            )
                          "
                          v-model="temp_attribution.attribution.discipline_id"
                          placeholder="Selecionar disciplina"
                        >
                          <Option
                            v-for="discipline in disciplines"
                            :value="discipline.id"
                            :key="discipline.id"
                            >{{ discipline.name }}</Option
                          >
                        </Select>
                      </FormItem>
                    </Col>

                    <Col span="12">
                      <FormItem prop="attribution.workload">
                        <Input
                          v-model.number="temp_attribution.attribution.workload"
                          placeholder="Carga horária da disciplina no curso"
                        >
                        </Input>
                      </FormItem>
                    </Col>

                    <Col span="12">
                      <FormItem>
                        <Select
                          placeholder="Selecionar o ano académico"
                          v-model="temp_attribution.attribution.academic_year"
                        >
                          <Option value="1º Ano">1º Ano</Option>
                          <Option value="2º Ano">2º Ano</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem>
                        <Select
                          placeholder="Selecionar o periodo"
                          v-model="temp_attribution.attribution.period"
                        >
                          <Option value="1º Trimestre">1º Trimestre</Option>
                          <Option value="2º Trimestre">2º Trimestre</Option>
                          <Option value="3º Trimestre">3º Trimestre</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                  <FormItem>
                    <Button
                      ghost
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
                      }}</Button
                    >

                    <ButtonGroup>
                      <Button
                        @click="
                          on_edit_discipline
                            ? cancelUpdateDiscipline()
                            : adding_discipline
                            ? cancelAddingDiscipline()
                            : ''
                        "
                        >Cancelar</Button
                      >
                      <Button
                        v-if="formData.disciplines.length > 0"
                        @click="clearAllDisciplines()"
                        >Cancelar todos</Button
                      >
                    </ButtonGroup>
                  </FormItem>
                </Form>
              </Col>

              <Col span="24" v-if="formData.disciplines.length">
                <Table
                  border
                  :columns="discipline_header"
                  :data="formData.disciplines"
                >
                  <template slot-scope="{ row }" slot="discipline">
                    <span>{{
                      selectedDiscipline(row.attribution.discipline_id)
                    }}</span>
                  </template>
                  <template slot-scope="{ row }" slot="workload">
                    <span>{{ row.attribution.workload }} Horas</span>
                  </template>
                  <template slot-scope="{ row }" slot="academic_year">
                    <span>{{ row.attribution.academic_year }}</span>
                  </template>
                  <template slot-scope="{ row }" slot="period">
                    <span>{{ row.attribution.period }}</span>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button
                      type="primary"
                      size="small"
                      style="margin-right: 5px"
                      @click.stop="onEditDiscipline(index)"
                      :disabled="on_edit_discipline"
                      ><Icon type="md-create"
                    /></Button>
                    <Button
                      @click.stop="removeFormData(index, formData.disciplines)"
                      :disabled="on_edit_discipline"
                      type="error"
                      size="small"
                      ><Icon type="md-close"
                    /></Button>
                  </template>
                </Table>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane label="Apresentação" name="presentation">
          <div>
            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic">Cores</span></Divider
            >
            <Row>
              <Col span="24">
                Escola um cor de apresentação deste curso
                <ColorPicker v-model="formData.color" />
              </Col>
            </Row>

            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Arquivo</span
              ></Divider
            >

            <Row>
              <Col span="24">
                <FormItem label="Capa do curso">
                  <base-file-upload
                    ref="courseCover"
                    :uploadMsg="'Clique ou largue a imagem aqui'"
                    :fileList="uploadCoverList"
                    :fileActions="
                      `${$axios.defaults.baseURL}/upload-course-cover`
                    "
                    :tempFileUrl="
                      `${publicURL}/uploads/courses/covers/${formData.cover}`
                    "
                    :fileFormData="formData.cover"
                    @onFileSuccess="handleCoverSuccess($event)"
                    @onRemoveFile="handleRemoveCover($event)"
                  ></base-file-upload>
                </FormItem>
              </Col>
            </Row>

            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Ativação e Destaque</span
              ></Divider
            >

            <Row>
              <Col span="24">
                <FormItem label="Ativação do curso">
                  <i-switch v-model="formData.status" size="large">
                    <span slot="open">Sim</span>
                    <span slot="close">Não</span>
                  </i-switch>
                </FormItem>
                <FormItem label="Curso em destaque">
                  <i-switch v-model="formData.featured" size="large">
                    <span slot="open">Sim</span>
                    <span slot="close">Não</span>
                  </i-switch>
                </FormItem>
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
      <FormItem>
        <div class="flex justify-end">
          <Button
            @click="resetFormFields('courseForm')"
            style="margin-right: 8px"
            >Limpar</Button
          >

          <Button
            @click="
              creating
                ? handleModal('courses/toggleCreateCourseDialog')
                : handleModal('courses/toggleUpdateCourseDialog')
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
                    'courseForm',
                    'courses',
                    'Curso Registado',
                    'APP_UPDATE_COURSES_DATA',
                    'courses/toggleCreateCourseDialog'
                  )
                : updateData(
                    'courseForm',
                    'courses',
                    'Curso Atualizado',
                    'APP_UPDATE_COURSES_DATA',
                    'courses/toggleUpdateCourseDialog'
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
import {
  course_validation,
  mult_form_validation
} from "@/mixins/fieldsValidation";
import { alerts } from "@/mixins/appAlerts";
import { debounce, splice, find } from "lodash";
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
      adding_discipline: false,
      no_discipline: false,
      repeated_discipline: false,
      selected_discipline: "",
      on_edit_discipline: false,

      temp_attribution: {
        attribution: {
          id: "",
          discipline_id: "",
          workload: "",
          academic_year: "",
          period: ""
        }
      },

      discipline_header: [
        {
          title: "Disciplina",
          slot: "discipline"
        },
        {
          title: "Carga Horária",
          slot: "workload",
          align: "center"
        },
        {
          title: "Ano Académico",
          slot: "academic_year",
          align: "center"
        },
        {
          title: "Periodo",
          slot: "period",
          align: "center"
        },
        {
          title: "Op.",
          slot: "action",
          width: 120,
          align: "center"
        }
      ]
    };
  },

  computed: {
    ...mapGetters({
      departaments: "departaments/departaments",
      families: "families/families",
      outcomes: "outcomes/outcomes",
      disciplines: "disciplines/disciplines",
      actived_teachers: "teachers/actived_teachers"
    })
  },

  mounted() {
    this.initFilesUploaded();
  },

  methods: {
    selectedDiscipline(discipline_id) {
      return find(this.disciplines, function(d) {
        return d.id == discipline_id;
      }).name;
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
        this.selected_contact,
        this.temp_attribution,
        this.clearTempDiscipline
      );

      this.selected_discipline = "";
      this.on_edit_discipline = false;
      this.adding_discipline = false;
    },

    handleCoverSuccess(res) {
      this.formData.cover = res;
      this.uploadCoverList = this.$refs.courseCover.$refs.uploadFileComponent.fileList;
    },

    async handleRemoveCover() {
      let cover = this.formData.cover;
      const res = await this.$axios.post("remove-course-cover", {
        cover: cover
      });
      if (res.status != 200) {
        this.formData.cover = cover;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadCoverList = this.$refs.courseCover.$refs.uploadFileComponent.clearFiles();
      this.formData.cover = "";
    },

    initFilesUploaded() {
      if (this.creating) {
        this.uploadCoverList = this.$refs.courseCover.$refs.uploadFileComponent.fileList;
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
