<template>
  <el-form
    ref="schoolForm"
    :model="formData"
    :rules="schoolFormValidation"
    label-position="top"
    label-width="80"
  >
    <el-tabs type="card" v-model="schoolTab">
      <el-tab-pane label="Informações" name="school_info">
        <el-divider content-position="left">
          <span class="text-gray-500"
            >Informações gerais da instituição</span
          ></el-divider
        >

        <el-row :gutter="20">
          <el-col :span="18">
            <el-form-item
              prop="name"
              label="Nome da Instituição"
              :error="showFormErrors('name')"
            >
              <el-input
                placeholder="Introduza o nome da instituição"
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
                placeholder="Abreviatura do nome introduzido"
                v-model="formData.abbr"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              label="Inaugoração"
              prop="opning"
              :error="showFormErrors('opning')"
            >
              <el-date-picker
                :value="formData.opning"
                class="w-full"
                v-model="formData.opning"
                type="date"
                placeholder="Data de abertura da escola"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              prop="slogan"
              label="Lema da Escola"
              :error="showFormErrors('slogan')"
            >
              <el-input
                placeholder="Introduza o lema da Escola"
                v-model="formData.slogan"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left"
          ><span class="text-gray-500"
            >Informações de contacto</span
          ></el-divider
        >
        <el-row :gutter="20" class="my-2">
          <el-col class="mb-2" v-if="!(adding_contact || on_edit_contact)">
            <el-button type="primary" @click="adding_contact = true"
              >Adicionar Contacto</el-button
            >
            <el-button
              type="primary"
              v-if="
                formData.contacts.length > 0 &&
                  !(adding_contact || on_edit_contact)
              "
              @click="clearAllContacts()"
              >Limpar todos</el-button
            >
          </el-col>

          <el-col
            v-if="adding_contact || on_edit_contact"
            :span="24"
            class="mb-2"
          >
            <el-form
              ref="contactForm"
              :model="temp_contacts"
              :rules="contactValidation"
            >
              <el-row :gutter="20">
                <el-col :span="temp_contacts.type == 1 ? 8 : 12">
                  <el-form-item
                    prop="contact"
                    :error="repeated_contact ? 'Contacto já introduzido' : ''"
                  >
                    <el-input
                      @change="findRepeatedContact(temp_contacts.contact)"
                      v-model="temp_contacts.contact"
                    >
                      <el-select
                        class="w-24"
                        v-model="temp_contacts.type"
                        slot="prepend"
                      >
                        <el-option label="Tel" value="1"></el-option>
                        <el-option label="Email" value="2"></el-option>
                      </el-select>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="temp_contacts.type == 1 ? 16 : 12">
                  <el-form-item>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4 }"
                      placeholder="Descrição do contacto"
                      v-model="temp_contacts.description"
                    >
                      <i slot="append" class="el-icon-lock"></i>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item>
                    <el-button
                      :disabled="repeated_contact"
                      type="primary"
                      @click="
                        on_edit_contact
                          ? updateContact('contactForm')
                          : adding_contact
                          ? addContact('contactForm')
                          : ''
                      "
                      >{{
                        on_edit_contact ? "Atualizar" : "Adicionar"
                      }}</el-button
                    >

                    <el-button-group>
                      <el-button
                        type="primary"
                        @click="
                          on_edit_contact
                            ? cancelUpdateContact()
                            : adding_contact
                            ? cancelAddingContact()
                            : ''
                        "
                      >
                        Cancelar</el-button
                      >
                      <el-button
                        v-if="formData.contacts.length > 0"
                        @click="clearAllContacts()"
                        >Cancelar Todos</el-button
                      >
                    </el-button-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>

          <el-col v-if="formData.contacts.length">
            <el-table :data="contacts" style="width: 100%">
              <el-table-column label="Tipo" width="180">
                <template slot-scope="{ row }">
                  <i
                    v-if="row.type == 1"
                    :class="row.type == 1 ? 'el-icon-phone' : 'el-icon-message'"
                  ></i>
                  <strong style="margin-left: 10px">{{
                    row.type == 1 ? "Tel" : "Email"
                  }}</strong>
                </template>
              </el-table-column>

              <el-table-column label="Contacto" min-width="180">
                <template slot-scope="{ row, $index }">
                  <span style="margin-left: 10px">{{ row.contact }}</span>
                  <br />
                  <small class="text-red-500">{{
                    showFormErrors("contacts." + $index + ".contact")
                  }}</small>
                </template>
              </el-table-column>

              <el-table-column label="Operações" width="120">
                <template slot-scope="{ $index }">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    circle
                    style="margin-right: 5px"
                    @click.stop="onEditContact($index)"
                    :disabled="on_edit_contact"
                  ></el-button>

                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    @click.stop="removeFormData($index, formData.contacts)"
                    :disabled="on_edit_contact"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="Sobre a Instituição" name="about_institution">
        <el-row>
          <el-col>
            <el-form-item
              prop="about"
              label="Sobre a Escola"
              :error="showFormErrors('about')"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                placeholder="Apresente uma breve discrição sobre a escola"
                v-model="formData.about"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item
              prop="history"
              label="História"
              :error="showFormErrors('history')"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                placeholder="Apresente a história da Escola"
                v-model="formData.history"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-tabs :tab-position="device === 'desktop' ? 'left' : 'top'">
              <el-tab-pane label="Marcos Históricos">
                <el-row :gutter="20">
                  <el-col class="mb-2" v-if="!(adding_mark || on_edit_mark)">
                    <el-button type="primary" @click="adding_mark = true"
                      >Adicionar Marcos</el-button
                    >
                    <el-button
                      type="primary"
                      v-if="
                        formData.marks.length > 0 &&
                          !(adding_mark || on_edit_mark)
                      "
                      @click="clearAllMarks()"
                      >Limpar todos</el-button
                    >
                  </el-col>

                  <el-col v-if="adding_mark || on_edit_mark" class="mb-2">
                    <el-form
                      ref="markForm"
                      :model="temp_marks"
                      :rules="markValidation"
                    >
                      <el-row :gutter="20">
                        <el-col>
                          <el-form-item prop="designation">
                            <el-input
                              placeholder="Desiguinação do marco histórico"
                              v-model="temp_marks.designation"
                            >
                            </el-input>
                          </el-form-item>
                        </el-col>

                        <el-col>
                          <el-row>
                            <el-col :span="11">
                              <el-form-item prop="begin">
                                <el-date-picker
                                  class="w-full"
                                  type="date"
                                  placeholder="Data Inicio"
                                  :value="temp_marks.begin"
                                  v-model="temp_marks.begin"
                                >
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="2" style="text-align: center"
                              >-</el-col
                            >
                            <el-col :span="11">
                              <el-form-item prop="end">
                                <el-date-picker
                                  class="w-full"
                                  type="date"
                                  placeholder="Data Fim"
                                  :value="temp_marks.end"
                                  v-model="temp_marks.end"
                                >
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-col>

                        <el-col>
                          <el-form-item prop="content">
                            <el-input
                              type="textarea"
                              placeholder="Descrição do marco histórico"
                              v-model="temp_marks.content"
                            >
                            </el-input>
                          </el-form-item>
                        </el-col>

                        <el-col>
                          <el-form-item>
                            <el-button
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
                              }}</el-button
                            >

                            <el-button-group>
                              <el-button
                                type="primary"
                                @click="
                                  on_edit_mark
                                    ? cancelUpdateMark()
                                    : adding_mark
                                    ? cancelAddingMark()
                                    : ''
                                "
                              >
                                Cancelar</el-button
                              >
                              <el-button
                                v-if="formData.marks.length > 0"
                                @click="clearAllMarks()"
                                >Limpar Todos</el-button
                              >
                            </el-button-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-col>
                  <el-col v-if="formData.marks.length">
                    <el-table :data="formData.marks" style="width: 100%">
                      <el-table-column label="Designação" min-width="180">
                        <template slot-scope="{ row, $index }">
                          <span>{{ row.designation }}</span>
                          <br />
                          <small class="text-red-500">{{
                            showFormErrors("marks." + $index + ".designation")
                          }}</small>
                        </template>
                      </el-table-column>

                      <el-table-column label="Início" width="100">
                        <template slot-scope="{ row, $index }">
                          <span>{{ $moment(row.begin).format("l") }}</span>
                          <br />
                          <small class="text-red-500">{{
                            showFormErrors("marks." + $index + ".begin")
                          }}</small>
                        </template>
                      </el-table-column>

                      <el-table-column label="Fim" width="100">
                        <template slot-scope="{ row, $index }">
                          <span>{{
                            row.end
                              ? $moment(row.end).format("l")
                              : "Por Determinar"
                          }}</span>
                          <br />
                          <small class="text-red-500">{{
                            showFormErrors("marks." + $index + ".end")
                          }}</small>
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
                            @click.stop="onEditMark($index)"
                            :disabled="on_edit_mark"
                          ></el-button>

                          <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            size="mini"
                            @click.stop="removeFormData($index, formData.marks)"
                            :disabled="on_edit_mark"
                          ></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>

              <el-tab-pane label="Diretrizes">
                <el-row :gutter="20">
                  <el-col
                    class="mb-2"
                    v-if="!(adding_guideline || on_edit_guideline)"
                  >
                    <el-button type="primary" @click="adding_guideline = true"
                      >Adicionar Diretriz</el-button
                    >
                    <el-button
                      type="primary"
                      v-if="
                        formData.guidelines.length > 0 &&
                          !(adding_guideline || on_edit_guideline)
                      "
                      @click="clearAllGuidelines()"
                      >Limpar todos</el-button
                    >
                  </el-col>

                  <el-col
                    v-if="adding_guideline || on_edit_guideline"
                    class="mb-2"
                  >
                    <el-form
                      ref="guidelineForm"
                      :model="temp_guidelines"
                      :rules="guidelineValidation"
                    >
                      <el-row :gutter="20">
                        <el-col :span="24" :sm="12">
                          <el-form-item prop="name">
                            <el-input
                              placeholder="Desiguinação"
                              v-model="temp_guidelines.name"
                            >
                            </el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="24" :sm="12">
                          <el-form-item prop="icon">
                            <el-select
                              v-model="temp_guidelines.icon"
                              placeholder="Icone"
                            >
                              <el-option label="Missão" value="fa-user">
                              </el-option>
                              <el-option label="Visão" value="fa-user">
                              </el-option>
                              <el-option label="Valores" value="fa-user">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>

                        <el-col>
                          <el-form-item prop="description">
                            <el-input
                              placeholder="Descrição do diretriz"
                              v-model="temp_guidelines.description"
                            >
                            </el-input>
                          </el-form-item>
                        </el-col>

                        <el-col>
                          <el-form-item>
                            <el-button
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
                              }}</el-button
                            >

                            <el-button-group>
                              <el-button
                                type="primary"
                                @click="
                                  on_edit_guideline
                                    ? cancelUpdateGuideline()
                                    : adding_guideline
                                    ? cancelAddingGuideline()
                                    : ''
                                "
                              >
                                Cancelar</el-button
                              >
                              <el-button
                                v-if="formData.guidelines.length > 0"
                                @click="clearAllGuidelines()"
                                >Limpar Todos</el-button
                              >
                            </el-button-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-col>
                  <el-col v-if="formData.guidelines.length">
                    <el-table :data="formData.guidelines" style="width: 100%">
                      <el-table-column label="Designação" min-width="180">
                        <template slot-scope="{ row, $index }">
                          <span>{{ row.name }}</span>
                          <br />
                          <small class="text-red-500">{{
                            showFormErrors("guidelines." + $index + ".name")
                          }}</small>
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
                            @click.stop="onEditGuideline($index)"
                            :disabled="on_edit_guideline"
                          ></el-button>

                          <el-button
                            type="danger"
                            icon="el-icon-delete"
                            size="mini"
                            circle
                            @click.stop="
                              removeFormData($index, formData.guidelines)
                            "
                            :disabled="on_edit_guideline"
                          ></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>

              <el-tab-pane label="Mural">
                <el-row :gutter="20">
                  <el-col class="mb-2" v-if="!(adding_mural || on_edit_mural)">
                    <el-button type="primary" @click="adding_mural = true"
                      >Adicionar Mural</el-button
                    >
                    <el-button
                      type="primary"
                      v-if="
                        formData.murals.length > 0 &&
                          !(adding_mural || on_edit_mural)
                      "
                      @click="clearAllMurals()"
                      >Limpar todos</el-button
                    >
                  </el-col>

                  <el-col v-if="adding_mural || on_edit_mural" class="mb-2">
                    <el-form
                      ref="muralForm"
                      :model="temp_murals"
                      :rules="muralValidation"
                    >
                      <el-row :gutter="20">
                        <el-col :span="24" :sm="12">
                          <el-form-item prop="designation">
                            <el-input
                              placeholder="Desiguinação"
                              v-model="temp_murals.designation"
                            >
                            </el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="24" :sm="12">
                          <el-form-item prop="icon">
                            <el-select
                              v-model="temp_murals.icon"
                              placeholder="Icone"
                            >
                              <el-option label="Missão" value="fa-user">
                              </el-option>
                              <el-option label="Visão" value="fa-user">
                              </el-option>
                              <el-option label="Valores" value="fa-user">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>

                        <el-col>
                          <el-form-item prop="description">
                            <el-input
                              placeholder="Descrição do mural"
                              v-model="temp_murals.description"
                            >
                            </el-input>
                          </el-form-item>
                        </el-col>

                        <el-col>
                          <el-form-item>
                            <el-button
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
                              }}</el-button
                            >

                            <el-button-group>
                              <el-button
                                type="primary"
                                @click="
                                  on_edit_mural
                                    ? cancelUpdateMural()
                                    : adding_mural
                                    ? cancelAddingMural()
                                    : ''
                                "
                              >
                                Cancelar</el-button
                              >
                              <el-button
                                v-if="formData.murals.length > 0"
                                @click="clearAllMurals()"
                                >Limpar Todos</el-button
                              >
                            </el-button-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-col>
                  <el-col v-if="formData.murals.length">
                    <el-table :data="formData.murals" style="width: 100%">
                      <el-table-column label="Designação" min-width="180">
                        <template slot-scope="{ row, $index }">
                          <span>{{ row.designation }}</span>
                          <br />
                          <small class="text-red-500">{{
                            showFormErrors("murals." + $index + ".designation")
                          }}</small>
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
                            @click.stop="onEditMural($index)"
                            :disabled="on_edit_mural"
                          ></el-button>

                          <el-button
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            size="mini"
                            @click.stop="
                              removeFormData($index, formData.murals)
                            "
                            :disabled="on_edit_mural"
                          ></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="Apresentação e Aparência" name="presentation">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item
              prop="director_msg"
              label="Mensagem do Diretor"
              :error="showFormErrors('director_msg')"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                placeholder="A mensagem do diretor para Escola e Alunos"
                v-model="formData.director_msg"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item
              prop="banner_msg"
              label="Texto para Banner"
              :error="showFormErrors('banner_msg')"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
                placeholder="Apresente um texto apelativo para a abresentação do banner"
                v-model="formData.banner_msg"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item prop="cover" label="Banner da Escola">
              <baseImageUpload
                ref="bannerImg"
                :uploadMsg="'Clique ou largue uma imagem de banner'"
                :fileActions="`${$axios.defaults.baseURL}/upload-school-banner`"
                :fileList="uploadBannerList"
                @onFileSuccess="handleBannerSuccess($event)"
                @onRemoveFile="handleRemoveBanner($event)"
              ></baseImageUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">Aparencia</el-divider>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="Cor Principal"
              prop="primary_color"
              class="m-3"
            >
              <el-color-picker
                v-model="formData.primary_color"
              ></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Cor Secundária"
              prop="secundary_color"
              class="m-3"
            >
              <el-color-picker
                v-model="formData.secundary_color"
              ></el-color-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="logo" label="Logotipo da Escola">
              <baseImageUpload
                ref="schoolLogo"
                :uploadMsg="'Clique ou largue o logotipo aqui'"
                :fileActions="`${$axios.defaults.baseURL}/upload-school-logo`"
                :fileList="uploadLogoList"
                @onFileSuccess="handleLogoSuccess($event)"
                @onRemoveFile="handleRemoveLogo($event)"
              ></baseImageUpload>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="cover" label="Imagem de Capa">
              <baseImageUpload
                ref="schoolCover"
                :uploadMsg="'Clique ou largue o logotipo aqui'"
                :fileActions="`${$axios.defaults.baseURL}/upload-school-cover`"
                :fileList="uploadCoverList"
                @onFileSuccess="handleCoverSuccess($event)"
                @onRemoveFile="handleRemoveCover($event)"
              ></baseImageUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import { requests } from "@/mixins/appRequest";
import { uploadFeedback } from "@/mixins/handleFileUploads";
import { alerts } from "@/mixins/appAlerts";
import { debounce } from "lodash";
import {
  school_validation,
  mult_form_validation
} from "@/mixins/fieldsValidation";
import { handleFormData } from "@/mixins/multFormData";
import { nacional_states } from "@/mixins/locations";
export default {
  name: "SchoolForm",
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
      uploadLogoList: [],
      uploadCoverList: [],
      disabledUpload: false,
      schoolTab: "school_info",
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
      }
    };
  },

  computed: {
    contacts() {
      return this.formData.contacts;
    },

    device() {
      return this.$store.state.app.device;
    }
  },

  methods: {
    handleLogoSuccess(res) {
      this.formData.logo = res;
      if (
        this.formData.logo &&
        this.$refs.schoolLogo.$refs.uploadImageComponent.uploadFiles.length > 0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadLogoList = this.$refs.schoolLogo.$refs.uploadImageComponent.clearFiles();
      }
    },

    handleCoverSuccess(res) {
      this.formData.cover = res;
      if (
        this.formData.cover &&
        this.$refs.schoolCover.$refs.uploadImageComponent.uploadFiles.length > 0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadCoverList = this.$refs.schoolCover.$refs.uploadImageComponent.clearFiles();
      }
    },

    async handleRemoveCover() {
      let cover = this.formData.cover;
      if (cover.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-school-cover", {
        cover: cover
      });
      if (res.status != 200) {
        this.formData.cover = cover;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadCoverList = this.$refs.schoolCover.$refs.uploadImageComponent.clearFiles();
      this.formData.cover = "";
      this.disabledUpload = false;
    },

    async handleRemoveLogo() {
      let logo = this.formData.logo;
      if (logo.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-school-logo", {
        logo: logo
      });
      if (res.status != 200) {
        this.formData.logo = logo;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadLogoList = this.$refs.schoolLogo.$refs.uploadImageComponent.clearFiles();
      this.formData.logo = "";
      this.disabledUpload = false;
    },

    async addSchool() {
      await this.addData(
        "schoolForm",
        "schools",
        "Instituição Registada",
        "APP_UPDATE_SCHOOLS_DATA",
        "schools/toggleCreateSchoolDialog"
      );
      this.schoolTab = "school_info";
      this.$refs.schoolLogo.$refs.uploadImageComponent.clearFiles();
    },

    updateSchool() {
      this.updateData(
        "schoolForm",
        "schools",
        "Instituição Atualizada",
        "APP_UPDATE_SCHOOLS_DATA",
        "schools/toggleCreateSchoolDialog"
      );
      this.schoolTab = "school_info";
      this.$refs.schoolLogo.$refs.uploadImageComponent.clearFiles();
    },

    cancelSchoolForm() {
      this.resetFormFields("schoolForm");
      if (this.formData.logo && this.formData.logo != "default.svg") {
        this.handleRemoveLogo();
      }
      if (this.formData.cover && this.formData.cover != "default.svg") {
        this.handleRemoveCover();
      }
      this.schoolTab = "school_info";
      this.handleModal("schools/toggleCreateSchoolDialog");
    },

    initFilesUploaded() {
      this.uploadLogoList = [];
      this.uploadCoverList = [];
      if (
        !this.creating &&
        this.formData.logo &&
        !this.formData.logo.includes("default")
      ) {
        this.uploadLogoList.push({
          name: this.formData.logo,
          response: this.formData.logo,
          percentage: 100,
          status: "success",
          url: `${this.publicURL}/uploads/schools/logos/${this.formData.logo}`
        });
      }
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
          url: `${this.publicURL}/uploads/schools/covers/${this.formData.cover}`
        });
      }
    },

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
        this.repeated_contact,
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
        this.clearTempMark
      );
    },

    addGuideline(formRef) {
      this.addMultFormData(
        formRef,
        "guidelines",
        this.repeated_guideline,
        this.temp_guidelines,
        this.clearTempGuideline
      );
    },

    addMural(formRef) {
      this.addMultFormData(
        formRef,
        "murals",
        this.repeated_mural,
        this.temp_murals,
        this.clearTempMural
      );
    },

    onEditContact(index) {
      if (this.formData.contacts.length > 0) {
        this.selected_contact = "";
        this.repeated_contact = false;
        let aux_contact = this.formData.contacts[index];
        this.temp_contacts.id = aux_contact.id;
        this.temp_contacts.contact = aux_contact.contact;
        this.temp_contacts.type = aux_contact.type;
        this.temp_contacts.description = aux_contact.description;
        this.selected_contact = index;
        this.on_edit_contact = true;
        this.adding_contact = false;
        return;
      }
      return;
    },

    onEditMark(index) {
      if (this.formData.marks.length > 0) {
        this.selected_mark = "";
        this.repeated_mark = false;
        let aux_mark = this.formData.marks[index];

        this.$set(this.temp_marks, "id", aux_mark.id);
        this.$set(this.temp_marks, "designation", aux_mark.designation);
        this.$set(this.temp_marks, "content", aux_mark.content);
        this.$set(this.temp_marks, "begin", aux_mark.begin);
        this.$set(this.temp_marks, "end", aux_mark.end);

        this.selected_mark = index;
        this.on_edit_mark = true;
        this.adding_mark = false;
        return;
      }
      return;
    },

    onEditGuideline(index) {
      if (this.formData.guidelines.length > 0) {
        this.selected_guideline = "";
        this.repeated_guideline = false;
        let aux_guideline = this.formData.guidelines[index];
        this.temp_guidelines.id = aux_guideline.id;
        this.temp_guidelines.name = aux_guideline.name;
        this.temp_guidelines.description = aux_guideline.description;
        this.temp_guidelines.icon = aux_guideline.icon;
        this.selected_guideline = index;
        this.on_edit_guideline = true;
        this.adding_guideline = false;
        return;
      }
      return;
    },

    onEditMural(index) {
      if (this.formData.murals.length > 0) {
        this.selected_mural = "";
        this.repeated_mural = false;
        let aux_mural = this.formData.murals[index];
        this.temp_murals.id = aux_mural.id;
        this.temp_murals.designation = aux_mural.designation;
        this.temp_murals.description = aux_mural.description;
        this.temp_murals.icon = aux_mural.icon;
        this.selected_mural = index;
        this.on_edit_mural = true;
        this.adding_mural = false;
        return;
      }
      return;
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

    updateContact(formRef) {
      this.updateMultFormData(
        formRef,
        this.repeated_contact,
        "contacts",
        this.selected_contact,
        this.temp_contacts,
        this.clearTempContact
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
        this.selected_mark,
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
        this.selected_guideline,
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
        this.selected_mural,
        this.temp_murals,
        this.clearTempMural
      );

      this.selected_mural = "";
      this.on_edit_mural = false;
      this.adding_mural = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
