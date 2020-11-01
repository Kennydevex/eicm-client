<template>
  <div class="px-3">
    <Form
      ref="schoolForm"
      :model="formData"
      :rules="schoolFormValidation"
      label-position="top"
    >
      <Tabs type="card" value="information">
        <TabPane label="Informações" name="information">
          <div>
            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Informações Básicas</span
              ></Divider
            >
            <Row :gutter="16">
              <Col span="18">
                <FormItem
                  :error="showFormErrors('name')"
                  label="Nome da Escola"
                  prop="name"
                >
                  <Input
                    v-model="formData.name"
                    placeholder="Instroduza o nome da escola"
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
                    placeholder="A Abreviatura do Nome Introduzido"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="Inaugoração" :error="showFormErrors('opning')">
              <DatePicker
                class="w-full"
                :value="formData.opning"
                type="date"
                placeholder="Data de abertura da escola"
                v-model="formData.opning"
              ></DatePicker>
            </FormItem>

            <FormItem label="Lema da Escola">
              <Input
                v-model="formData.slogan"
                placeholder="Introduza o lema da escola"
              ></Input>
            </FormItem>

            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Endereço e Localização</span
              ></Divider
            >
            <!--<Row :gutter="16">
              <Col span="24" :sm="12">
                <FormItem label="Concelho">
                  <Select
                    @on-change="clearLocationDataFrom('state')"
                    v-model="formData.location.state"
                  >
                    <Option
                      v-for="(state, s) in states"
                      :key="s"
                      :value="state.name"
                      >{{ state.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col span="24" :sm="12">
                <FormItem label="Concelho">
                  <Select
                    @change="clearLocationDataFrom('county')"
                    v-model="formData.location.county"
                  >
                    <Option
                      v-for="(county, c) in counties"
                      :key="c"
                      :value="county.name"
                      >{{ county.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>

              <Col span="24" :sm="12">
                <FormItem label="Freguesia">
                  <Select
                    @change="clearLocationDataFrom('parish')"
                    v-model="formData.location.parish"
                  >
                    <Option
                      v-for="(parish, p) in parishes"
                      :key="p"
                      :value="parish.name"
                      >{{ parish.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col span="24" :sm="12">
                <FormItem label="Cidade">
                  <Select disabled  @change="clearLocationDataFrom('city')" v-model="formData.location.city">
                     <Option
                      v-for="(city, c) in cities"
                      :key="c"
                      :value="city.name"
                      >{{ city.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col span="24" :sm="12">
                <FormItem label="Zona">
                  <Select v-model="formData.location.zone">
                    <Option
                      v-for="(zone, z) in zones"
                      :key="z"
                      :value="zone.name"
                      >{{ zone.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
            </Row> -->

            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Informações de Contactos</span
              ></Divider
            >

            <Row :gutter="16" class="my-2">
              <Col
                span="24"
                class="mb-2"
                v-if="!(adding_contact || on_edit_contact)"
              >
                <Button type="primary" @click="adding_contact = true"
                  >Adicionar</Button
                >
                <Button
                  v-if="
                    formData.contacts.length > 0 &&
                      !(adding_contact || on_edit_contact)
                  "
                  @click="clearAllContacts()"
                  >Limpar todos</Button
                >
              </Col>
              <Col
                v-if="adding_contact || on_edit_contact"
                span="24"
                class="mb-2"
              >
                <Form
                  ref="contactForm"
                  :model="temp_contacts"
                  :rules="contactValidation"
                >
                  <Row :gutter="16">
                    <Col :span="temp_contacts.type == 1 ? 8 : 12">
                      <FormItem
                        prop="contact"
                        :error="
                          repeated_contact ? 'Contacto já introduzido' : ''
                        "
                      >
                        <Input
                          @on-change="
                            findRepeatedContact(temp_contacts.contact)
                          "
                          v-model="temp_contacts.contact"
                        >
                          <Select
                            v-model="temp_contacts.type"
                            slot="prepend"
                            style="width: 80px"
                          >
                            <Option value="1">Tel</Option>
                            <Option value="2">Email</Option>
                          </Select>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col :span="temp_contacts.type == 1 ? 16 : 12">
                      <FormItem>
                        <Input
                          :autosize="true"
                          type="textarea"
                          v-model="temp_contacts.description"
                          placeholder="Descrição"
                        >
                          <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                      </FormItem>
                    </Col>
                  </Row>
                  <FormItem>
                    <Button
                      ghost
                      :disabled="repeated_contact"
                      type="primary"
                      @click="
                        on_edit_contact
                          ? updateContact('contactForm')
                          : adding_contact
                          ? addContact('contactForm')
                          : ''
                      "
                      >{{ on_edit_contact ? "Atualizar" : "Adicionar" }}</Button
                    >

                    <ButtonGroup>
                      <Button
                        @click="
                          on_edit_contact
                            ? cancelUpdateContact()
                            : adding_contact
                            ? cancelAddingContact()
                            : ''
                        "
                        >Cancelar</Button
                      >
                      <Button
                        v-if="formData.contacts.length > 0"
                        @click="clearAllContacts()"
                        >Cancelar todos</Button
                      >
                    </ButtonGroup>
                  </FormItem>
                </Form>
              </Col>
              <Col span="24" v-if="formData.contacts.length">
                <Table border :columns="contact_header" :data="contacts">
                  <template slot-scope="{ row }" slot="type">
                    <strong>{{ row.type == 1 ? "Tel" : "Email" }}</strong>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button
                      type="primary"
                      size="small"
                      style="margin-right: 5px"
                      @click.stop="onEditContact(index)"
                      :disabled="on_edit_contact"
                      ><Icon type="md-create"
                    /></Button>
                    <Button
                      @click.stop="removeFormData(index, formData.contacts)"
                      :disabled="on_edit_contact"
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
        <TabPane label="Sobre a Instituição" name="about_institution">
          <Row>
            <Col span="24">
              <FormItem label="Sobre a Escola">
                <Input
                  type="textarea"
                  v-model="formData.about"
                  placeholder="Apresente uma breve discrição sobre a escola"
                  :rows="3"
                ></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="História">
                <Input
                  type="textarea"
                  :rows="3"
                  v-model="formData.history"
                  placeholder="Apresente a história da Escola"
                ></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <Collapse
                accordion
                simple
                v-model="about_school_collapse"
                acordion
              >
                <Panel name="marks">
                  Marcos Históricos
                  <div slot="content">
                    <Row :gutter="16" class="my-2">
                      <Col
                        span="24"
                        class="mb-2"
                        v-if="!(adding_mark || on_edit_mark)"
                      >
                        <Button type="primary" @click="adding_mark = true"
                          >Adicionar</Button
                        >
                        <Button
                          v-if="
                            formData.marks.length > 0 &&
                              !(adding_mark || on_edit_mark)
                          "
                          @click="clearAllMarks()"
                          >Limpar todos</Button
                        >
                      </Col>
                      <Col
                        v-if="adding_mark || on_edit_mark"
                        span="24"
                        class="mb-2"
                      >
                        <Form
                          ref="markForm"
                          :model="temp_marks"
                          :rules="markValidation"
                        >
                          <Row :gutter="16">
                            <Col span="24">
                              <FormItem prop="designation">
                                <Input
                                  v-model="temp_marks.designation"
                                  placeholder="Desiguinação do marco histórico"
                                >
                                </Input>
                              </FormItem>
                            </Col>
                            <Col span="24">
                              <Row>
                                <Col span="11">
                                  <FormItem prop="begin">
                                    <DatePicker
                                      format="dd/MM/yyyy"
                                      class="w-full"
                                      type="date"
                                      placeholder="Data Inicio"
                                      v-model="temp_marks.begin"
                                    ></DatePicker>
                                  </FormItem>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                  <FormItem prop="end">
                                    <DatePicker
                                      format="dd/MM/yyyy"
                                      class="w-full"
                                      type="date"
                                      placeholder="Data Fim"
                                      v-model="temp_marks.end"
                                    ></DatePicker>
                                  </FormItem>
                                </Col>
                              </Row>
                            </Col>
                            <Col span="24">
                              <FormItem prop="content">
                                <Input
                                  type="textarea"
                                  :rows="4"
                                  v-model="temp_marks.content"
                                  placeholder="Desiguinação do marco histórico"
                                >
                                </Input>
                              </FormItem>
                            </Col>
                          </Row>
                          <FormItem>
                            <Button
                              ghost
                              :disabled="repeated_mark"
                              type="primary"
                              @click="
                                on_edit_mark
                                  ? updateMark('markForm')
                                  : adding_mark
                                  ? addMark('markForm')
                                  : ''
                              "
                              >{{
                                on_edit_mark ? "Atualizar" : "Adicionar"
                              }}</Button
                            >

                            <ButtonGroup>
                              <Button
                                @click="
                                  on_edit_mark
                                    ? cancelUpdateMark()
                                    : adding_mark
                                    ? cancelAddingMark()
                                    : ''
                                "
                                >Cancelar</Button
                              >
                              <Button
                                v-if="formData.marks.length > 0"
                                @click="clearAllMarks()"
                                >Cancelar todos</Button
                              >
                            </ButtonGroup>
                          </FormItem>
                        </Form>
                      </Col>
                      <Col span="24" v-if="formData.marks.length">
                        <Table
                          border
                          :columns="mark_header"
                          :data="formData.marks"
                        >
                          <template slot-scope="{ row }" slot="begin">
                            <span>{{ $moment(row.begin).format("l") }}</span>
                          </template>
                          <template slot-scope="{ row }" slot="end">
                            <span>{{ $moment(row.end).format("l") }}</span>
                          </template>
                          <template slot-scope="{ row, index }" slot="action">
                            <Button
                              type="primary"
                              size="small"
                              style="margin-right: 5px"
                              @click.stop="onEditMark(index)"
                              :disabled="on_edit_mark"
                              ><Icon type="md-create"
                            /></Button>
                            <Button
                              @click.stop="
                                removeFormData(index, formData.marks)
                              "
                              :disabled="on_edit_mark"
                              type="error"
                              size="small"
                              ><Icon type="md-close"
                            /></Button>
                          </template>
                        </Table>
                      </Col>
                    </Row>
                  </div>
                </Panel>
                <Panel name="guidelines">
                  Diretrizes
                  <div slot="content">
                    <Row :gutter="16" class="my-2">
                      <Col
                        span="24"
                        class="mb-2"
                        v-if="!(adding_guideline || on_edit_guideline)"
                      >
                        <Button type="primary" @click="adding_guideline = true"
                          >Adicionar</Button
                        >
                        <Button
                          v-if="
                            formData.guidelines.length > 0 &&
                              !(adding_guideline || on_edit_guideline)
                          "
                          @click="clearAllGuidelines()"
                          >Limpar todos</Button
                        >
                      </Col>
                      <Col
                        v-if="adding_guideline || on_edit_guideline"
                        span="24"
                        class="mb-2"
                      >
                        <Form
                          ref="guidelineForm"
                          :model="temp_guidelines"
                          :rules="guidelineValidation"
                        >
                          <Row :gutter="16">
                            <Col span="24" :sm="12">
                              <FormItem prop="name">
                                <Input
                                  v-model="temp_guidelines.name"
                                  placeholder="Nome do diretriz"
                                >
                                </Input>
                              </FormItem>
                            </Col>
                            <Col span="24" :sm="12">
                              <FormItem>
                                <Select
                                  v-model="temp_guidelines.icon"
                                  placeholder="Icone"
                                >
                                  <Icon
                                    :type="temp_guidelines.icon"
                                    slot="prefix"
                                  ></Icon
                                  >>
                                  <Option value="ios-compass">Missão</Option>
                                  <Option value="ios-eye">Visão</Option>
                                  <Option value="md-checkmark-circle-outline"
                                    >Valores</Option
                                  >
                                </Select>
                              </FormItem>
                            </Col>

                            <Col span="24">
                              <FormItem prop="description">
                                <Input
                                  type="textarea"
                                  :rows="4"
                                  v-model="temp_guidelines.description"
                                  placeholder="Descrição do diretriz"
                                >
                                </Input>
                              </FormItem>
                            </Col>
                          </Row>
                          <FormItem>
                            <Button
                              ghost
                              :disabled="repeated_guideline"
                              type="primary"
                              @click="
                                on_edit_guideline
                                  ? updateGuideline('guidelineForm')
                                  : adding_guideline
                                  ? addGuideline('guidelineForm')
                                  : ''
                              "
                              >{{
                                on_edit_guideline ? "Atualizar" : "Adicionar"
                              }}</Button
                            >

                            <ButtonGroup>
                              <Button
                                @click="
                                  on_edit_guideline
                                    ? cancelUpdateGuideline()
                                    : adding_guideline
                                    ? cancelAddingGuideline()
                                    : ''
                                "
                                >Cancelar</Button
                              >
                              <Button
                                v-if="formData.guidelines.length > 0"
                                @click="clearAllGuidelines()"
                                >Cancelar todos</Button
                              >
                            </ButtonGroup>
                          </FormItem>
                        </Form>
                      </Col>
                      <Col span="24" v-if="formData.guidelines.length">
                        <Table
                          border
                          :columns="guideline_header"
                          :data="formData.guidelines"
                        >
                          <template slot-scope="{ row }" slot="icon">
                            <Icon size="16" :type="row.icon" />
                          </template>
                          <template slot-scope="{ row, index }" slot="action">
                            <Button
                              type="primary"
                              size="small"
                              style="margin-right: 5px"
                              @click.stop="onEditGuideline(index)"
                              :disabled="on_edit_guideline"
                              ><Icon type="md-create"
                            /></Button>
                            <Button
                              @click.stop="
                                removeFormData(index, formData.guidelines)
                              "
                              :disabled="on_edit_guideline"
                              type="error"
                              size="small"
                              ><Icon type="md-close"
                            /></Button>
                          </template>
                        </Table>
                      </Col>
                    </Row>
                  </div>
                </Panel>
                <Panel name="murals">
                  Mural
                  <div slot="content">
                    <Row :gutter="16" class="my-2">
                      <Col
                        span="24"
                        class="mb-2"
                        v-if="!(adding_mural || on_edit_mural)"
                      >
                        <Button type="primary" @click="adding_mural = true"
                          >Adicionar</Button
                        >
                        <Button
                          v-if="
                            formData.murals.length > 0 &&
                              !(adding_mural || on_edit_mural)
                          "
                          @click="clearAllMurals()"
                          >Limpar todos</Button
                        >
                      </Col>
                      <Col
                        v-if="adding_mural || on_edit_mural"
                        span="24"
                        class="mb-2"
                      >
                        <Form
                          ref="muralForm"
                          :model="temp_murals"
                          :rules="muralValidation"
                        >
                          <Row :gutter="16">
                            <Col span="24" :sm="12">
                              <FormItem prop="designation">
                                <Input
                                  v-model="temp_murals.designation"
                                  placeholder="Nome do diretriz"
                                >
                                </Input>
                              </FormItem>
                            </Col>
                            <Col span="24" :sm="12">
                              <FormItem>
                                <Select
                                  v-model="temp_murals.icon"
                                  placeholder="Icone"
                                >
                                  <Icon
                                    :type="temp_murals.icon"
                                    slot="prefix"
                                  ></Icon
                                  >>
                                  <Option value="ios-compass">Missão</Option>
                                  <Option value="ios-eye">Visão</Option>
                                  <Option value="md-checkmark-circle-outline"
                                    >Valores</Option
                                  >
                                </Select>
                              </FormItem>
                            </Col>

                            <Col span="24">
                              <FormItem prop="description">
                                <Input
                                  type="textarea"
                                  :rows="4"
                                  v-model="temp_murals.description"
                                  placeholder="Descrição do diretriz"
                                >
                                </Input>
                              </FormItem>
                            </Col>
                          </Row>
                          <FormItem>
                            <Button
                              ghost
                              :disabled="repeated_mural"
                              type="primary"
                              @click="
                                on_edit_mural
                                  ? updateMural('muralForm')
                                  : adding_mural
                                  ? addMural('muralForm')
                                  : ''
                              "
                              >{{
                                on_edit_mural ? "Atualizar" : "Adicionar"
                              }}</Button
                            >

                            <ButtonGroup>
                              <Button
                                @click="
                                  on_edit_mural
                                    ? cancelUpdateMural()
                                    : adding_mural
                                    ? cancelAddingMural()
                                    : ''
                                "
                                >Cancelar</Button
                              >
                              <Button
                                v-if="formData.murals.length > 0"
                                @click="clearAllMurals()"
                                >Cancelar todos</Button
                              >
                            </ButtonGroup>
                          </FormItem>
                        </Form>
                      </Col>
                      <Col span="24" v-if="formData.murals.length">
                        <Table
                          border
                          :columns="mural_header"
                          :data="formData.murals"
                        >
                          <template slot-scope="{ row }" slot="icon">
                            <Icon size="16" :type="row.icon" />
                          </template>
                          <template slot-scope="{ row, index }" slot="action">
                            <Button
                              type="primary"
                              size="small"
                              style="margin-right: 5px"
                              @click.stop="onEditMural(index)"
                              :disabled="on_edit_mural"
                              ><Icon type="md-create"
                            /></Button>
                            <Button
                              @click.stop="
                                removeFormData(index, formData.murals)
                              "
                              :disabled="on_edit_mural"
                              type="error"
                              size="small"
                              ><Icon type="md-close"
                            /></Button>
                          </template>
                        </Table>
                      </Col>
                    </Row>
                  </div>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="Apresentação e Aparência" name="presentation">
          <Row type="flex" justify="center" :gutter="16">
            <Col span="24" class="flex justify-center">
              <FormItem label="Cor principal" class="m-3">
                <ColorPicker v-model="formData.primary_color" />
              </FormItem>
              <FormItem label="Cor Secundária" class="m-3">
                <ColorPicker v-model="formData.primary_color" />
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="Logotipo da Escola">
                <base-file-upload
                  ref="schoolLogo"
                  :uploadMsg="'Clique ou largue o logotipo aqui'"
                  :fileList="uploadLogoList"
                  :fileActions="`${$axios.defaults.baseURL}/upload-school-logo`"
                  :tempFileUrl="
                    `${publicURL}/uploads/schools/logos/${formData.logo}`
                  "
                  :fileFormData="formData.logo"
                  @onFileSuccess="handleLogoSuccess($event)"
                  @onRemoveFile="handleRemoveLogo($event)"
                ></base-file-upload>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="Imagem de Capa">
                <base-file-upload
                  ref="schoolCover"
                  :uploadMsg="'Clique ou largue uma imagem aqui'"
                  :fileList="uploadCoverList"
                  :fileActions="
                    `${$axios.defaults.baseURL}/upload-school-cover`
                  "
                  :tempFileUrl="
                    `${publicURL}/uploads/schools/covers/${formData.cover}`
                  "
                  :fileFormData="formData.cover"
                  @onFileSuccess="handleCoverSuccess($event)"
                  @onRemoveFile="handleRemoveCover($event)"
                ></base-file-upload>
              </FormItem>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      <FormItem>
        <div class="flex justify-end">
          <Button
            @click="resetFormFields('schoolForm')"
            style="margin-right: 8px"
            >Limpar</Button
          >

          <Button
            @click="
              creating
                ? handleModal('schools/toggleCreateSchoolDialog')
                : handleModal('schools/toggleUpdateSchoolDialog')
            "
            >Cancelar</Button
          >

          <Button
            :loading="sending"
            type="primary"
            style="margin-left: 8px"
            @click.stop="
              creating
                ? addData('schoolForm', 'schools', 'Instituição Registado')
                : updateData('schoolForm', 'schools', 'Instituição Atualizado')
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
  school_validation,
  mult_form_validation
} from "@/mixins/fieldsValidation";
import { alerts } from "@/mixins/appAlerts";
import { debounce, splice } from "lodash";
import { handleFormData } from "@/mixins/multFormData";
import { nacional_states } from "@/mixins/locations";

export default {
  mixins: [
    requests,
    uploadFeedback,
    school_validation,
    mult_form_validation,
    alerts,
    handleFormData,
    nacional_states
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
      uploadLogoList: [],
      uploadCoverList: [],
      about_school_collapse: "",
      // --------------------
      adding_contact: false,
      no_contact: false,
      repeated_contact: false,
      selected_contact: "",
      on_edit_contact: false,
      // --------------------
      adding_mark: false,
      no_mark: false,
      repeated_mark: false,
      selected_mark: "",
      on_edit_mark: false,
      // --------------------
      adding_guideline: false,
      no_guideline: false,
      repeated_guideline: false,
      selected_guideline: "",
      on_edit_guideline: false,
      // --------------------
      adding_mural: false,
      no_mural: false,
      repeated_mural: false,
      selected_mural: "",
      on_edit_mural: false,
      // --------------------

      temp_contacts: {
        id: "",
        contact: "",
        description: "",
        type: "1"
      },
      temp_marks: {
        id: "",
        designation: "",
        content: "",
        begin: "",
        end: ""
      },
      temp_guidelines: {
        id: "",
        name: "",
        description: "",
        icon: ""
      },
      temp_murals: {
        id: "",
        designation: "",
        description: "",
        icon: ""
      },
      // sending: false,
      listStyle: {
        width: "200px",
        height: "300px"
      },

      contact_header: [
        {
          title: "Tipo",
          slot: "type",
          width: 80
        },
        {
          title: "Contacto",
          key: "contact"
        },
        {
          title: "Descrição",
          key: "description"
        },
        {
          title: "Op.",
          slot: "action",
          width: 120,
          align: "center"
        }
      ],

      mark_header: [
        {
          title: "Designação",
          key: "designation"
        },
        {
          title: "Data Inicio",
          slot: "begin"
        },
        {
          title: "Data Fim",
          slot: "end"
        },
        {
          title: "Op.",
          slot: "action",
          width: 120,
          align: "center"
        }
      ],

      guideline_header: [
        {
          title: "Icone",
          slot: "icon",
          width: 80,
          align: "center"
        },
        {
          title: "Nome",
          key: "name"
        },
        {
          title: "Descrição",
          key: "description"
        },

        {
          title: "Op.",
          slot: "action",
          width: 120,
          align: "center"
        }
      ],
      mural_header: [
        {
          title: "Icone",
          slot: "icon",
          width: 80,
          align: "center"
        },
        {
          title: "Deseguinação",
          key: "designation"
        },
        {
          title: "Descrição",
          key: "description"
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
      roles: "permissions/roles",
      permissions: "permissions/permissions"
    }),
    contacts() {
      return this.formData.contacts;
    }
  },

  mounted() {
    this.initFilesUploaded();
  },

  methods: {
    cancelAddingContact() {
      this.temp_contacts = {
        id: "",
        contact: "",
        description: "",
        type: "1"
      };
      this.adding_contact = false;
      this.on_edit_contact = false;
    },

    cancelAddingMark() {
      this.temp_marks = {
        id: "",
        designation: "",
        content: "",
        begin: "",
        end: ""
      };
      this.adding_mark = false;
      this.on_edit_mark = false;
    },

    cancelAddingGuideline() {
      this.temp_guidelines = {
        id: "",
        name: "",
        description: "",
        icon: ""
      };
      this.adding_guideline = false;
      this.on_edit_guideline = false;
    },

    cancelAddingMural() {
      this.temp_murals = {
        id: "",
        designation: "",
        description: "",
        icon: ""
      };
      this.adding_mural = false;
      this.on_edit_mural = false;
    },

    clearTempContact() {
      this.temp_contacts = {
        id: "",
        contact: "",
        description: "",
        type: "1"
      };
    },

    clearTempMark() {
      this.temp_marks = {
        id: "",
        designation: "",
        content: "",
        begin: "",
        end: ""
      };
    },

    clearTempGuideline() {
      this.temp_guidelines = {
        id: "",
        name: "",
        description: "",
        icon: ""
      };
    },

    clearTempMural() {
      this.temp_murals = {
        id: "",
        designation: "",
        description: "",
        icon: ""
      };
    },

    addContact(formRef) {
      this.addMultFormData(
        formRef,
        "contacts",
        this.repeated_mark,
        this.temp_contacts,
        this.clearTempContact
      );
    },

    addMark(formRef) {
      this.addMultFormData(
        formRef,
        "marks",
        this.repeated_mark,
        this.temp_marks,
        this.clearTempMark()
      );
    },

    addGuideline(formRef) {
      this.addMultFormData(
        formRef,
        "guidelines",
        this.repeated_guideline,
        this.temp_guidelines,
        this.clearTempGuideline()
      );
    },

    addMural(formRef) {
      this.addMultFormData(
        formRef,
        "murals",
        this.repeated_mural,
        this.temp_murals,
        this.clearTempMural()
      );
    },

    onEditContact(index) {
      this.selected_contact = "";
      this.repeated_contact = false;
      let aux_contact = this.formData.contacts[index];
      this.temp_contacts.contact = aux_contact.contact;
      this.temp_contacts.type = aux_contact.type;
      this.temp_contacts.description = aux_contact.description;
      this.selected_contact = index;
      this.on_edit_contact = true;
      this.adding_contact = false;
    },

    onEditMark(index) {
      this.selected_mark = "";
      this.repeated_mark = false;
      let aux_mark = this.formData.marks[index];
      this.temp_marks.designation = aux_mark.designation;
      this.temp_marks.begin = aux_mark.begin;
      this.temp_marks.end = aux_mark.end;
      this.temp_marks.content = aux_mark.content;
      this.selected_mark = index;
      this.on_edit_mark = true;
      this.adding_mark = false;
    },

    onEditGuideline(index) {
      this.selected_guideline = "";
      this.repeated_guideline = false;
      let aux_guideline = this.formData.guidelines[index];
      this.temp_guidelines.name = aux_guideline.name;
      this.temp_guidelines.description = aux_guideline.description;
      this.temp_guidelines.icon = aux_guideline.icon;
      this.selected_guideline = index;
      this.on_edit_guideline = true;
      this.adding_guideline = false;
    },

    onEditMural(index) {
      this.selected_mural = "";
      this.repeated_mural = false;
      let aux_mural = this.formData.murals[index];
      this.temp_murals.designation = aux_mural.designation;
      this.temp_murals.description = aux_mural.description;
      this.temp_murals.icon = aux_mural.icon;
      this.selected_mural = index;
      this.on_edit_mural = true;
      this.adding_mural = false;
    },

    clearAllContacts() {
      this.clearAllMultFormData("contacts", this.clearTempContact);
      this.repeated_contact = false;
      this.adding_contact = false;
      this.on_edit_contact = false;
    },

    clearAllMarks() {
      this.clearAllMultFormData("marks", this.clearTempMark);
      this.repeated_mark = false;
      this.adding_mark = false;
      this.on_edit_mark = false;
    },

    clearAllGuidelines() {
      this.clearAllMultFormData("guidelines", this.clearTempGuideline);
      this.repeated_guideline = false;
      this.adding_guideline = false;
      this.on_edit_guideline = false;
    },

    clearAllMurals() {
      this.clearAllMultFormData("murals", this.clearTempMural);
      this.repeated_mural = false;
      this.adding_mural = false;
      this.on_edit_mural = false;
    },
    findRepeatedContact: debounce(function(contact) {
      this.repeated_contact = false;
      for (var i = 0; i < this.formData.contacts.length; i++) {
        if (
          this.formData.contacts[i].contact == contact &&
          i !== this.selected_contact
        ) {
          this.repeated_contact = true;
          return;
        }
      }
      this.repeated_contact = false;
    }, 500),

    // findRepeatedContact(contact) {
    //   this.repeated_contact = this.repeatedFormData(
    //     "contacts",
    //     'contact',
    //     contact,
    //     this.selected_contact
    //   );
    // },

    // findRepeateddMark(mark) {
    //   this.repeated_mark = this.repeatedFormData(
    //     "marks",
    //     mark,
    //     this.selected_mark
    //   );
    // },

    findRepeatedGuideline: debounce(function(guideline) {
      this.repeated_guideline = false;
      for (var i = 0; i < this.formData.guidelines.length; i++) {
        if (
          this.formData.guidelines[i].guideline == guideline &&
          i !== this.selected_guideline
        ) {
          this.repeated_guideline = true;
          return;
        }
      }
      this.repeated_guideline = false;
    }, 500),

    findRepeatedMural: debounce(function(mural) {
      this.repeated_mural = false;
      for (var i = 0; i < this.formData.murals.length; i++) {
        if (
          this.formData.murals[i].mural == mural &&
          i !== this.selected_mural
        ) {
          this.repeated_mural = true;
          return;
        }
      }
      this.repeated_mural = false;
    }, 500),

    cancelUpdateContact() {
      this.cancelMultFormData(
        "contacts",
        this.selected_contact,
        this.clearTempContact
      );
      this.on_edit_contact = false;
      this.adding_contact = false;
    },

    cancelUpdateMark() {
      this.cancelMultFormData("marks", this.selected_mark, this.clearTempMark);
      this.on_edit_mark = false;
      this.adding_mark = false;
    },

    cancelUpdateGuideline() {
      this.cancelMultFormData(
        "guidelines",
        this.selected_guideline,
        this.clearTempGuideline
      );
      this.on_edit_guideline = false;
      this.adding_guideline = false;
    },

    cancelUpdateMural() {
      this.cancelMultFormData(
        "murals",
        this.selected_mural,
        this.clearTempMural
      );
      this.on_edit_mural = false;
      this.adding_mural = false;
    },
    // updateContact(formRef) {
    //   this.$refs[formRef].validate(valid => {
    //     if (valid) {
    //       if (this.repeated_contact) {
    //         return;
    //       }
    //       this.repeated_contact = false;
    //       // this.formData.contacts[this.selected_contact] = this.temp_contacts;
    //       this.formData.contacts.splice(
    //         this.selected_contact,
    //         1,
    //         this.temp_contacts
    //       );
    //       this.clearTempContact();
    //       this.selected_contact = "";
    //       this.on_edit_contact = false;
    //       this.adding_contact = false;
    //     } else {
    //       this.$Message.error("Erro de validação");
    //     }
    //   });
    // },

    updateContact(formRef) {
      this.updateMultFormData(
        formRef,
        this.repeated_contact,
        "contacts",
        this.selected_contact,
        this.temp_contacts,
        this.clearTempMark
      );

      this.selected_contact = "";
      this.on_edit_contact = false;
      this.adding_contact = false;
    },

    updateMark(formRef) {
      this.updateMultFormData(
        formRef,
        this.repeated_mark,
        "marks",
        this.selected_contact,
        this.temp_marks,
        this.clearTempMark
      );

      this.selected_mark = "";
      this.on_edit_mark = false;
      this.adding_mark = false;
    },

    updateGuideline(formRef) {
      this.updateMultFormData(
        formRef,
        this.repeated_guideline,
        "guidelines",
        this.selected_contact,
        this.temp_guidelines,
        this.clearTempGuideline
      );

      this.selected_guideline = "";
      this.on_edit_guideline = false;
      this.adding_guideline = false;
    },

    updateMural(formRef) {
      this.updateMultFormData(
        formRef,
        this.repeated_mural,
        "murals",
        this.selected_contact,
        this.temp_murals,
        this.clearTempMural
      );

      this.selected_mural = "";
      this.on_edit_mural = false;
      this.adding_mural = false;
    },

    handleLogoSuccess(res) {
      this.formData.logo = res;
      this.uploadLogoList = this.$refs.schoolLogo.$refs.uploadFileComponent.fileList;
    },

    handleCoverSuccess(res) {
      this.formData.cover = res;
      this.uploadCoverList = this.$refs.schoolCover.$refs.uploadFileComponent.fileList;
    },
    async handleRemoveLogo() {
      let logo = this.formData.logo;
      const res = await this.$axios.post("remove-school-logo", {
        logo: logo
      });
      if (res.status != 200) {
        this.formData.logo = logo;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadLogoList = this.$refs.schoolLogo.$refs.uploadFileComponent.clearFiles();
      this.formData.logo = "";
    },

    async handleRemoveCover() {
      let cover = this.formData.cover;
      const res = await this.$axios.post("remove-school-cover", {
        cover: cover
      });
      if (res.status != 200) {
        this.formData.cover = cover;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadCoverList = this.$refs.schoolCover.$refs.uploadFileComponent.clearFiles();
      this.formData.cover = "";
    },

    initFilesUploaded() {
      if (this.creating) {
        this.uploadLogoList = this.$refs.schoolLogo.$refs.uploadFileComponent.fileList;
        this.uploadCoverList = this.$refs.schoolCover.$refs.uploadFileComponent.fileList;
        return;
      }
      this.uploadLogoList.push({
        response: this.formData.logo,
        status: "finished"
      });
      this.uploadCoverList.push({
        response: this.formData.cover,
        status: "finished"
      });
    }
  }
};
</script>

<style lang="css">
.vue-map-container {
  height: 450px;
  width: 100%;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
