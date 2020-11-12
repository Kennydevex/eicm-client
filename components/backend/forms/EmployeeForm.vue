<template>
  <div class="px-3">
    <Form
      ref="employeeForm"
      :model="formData"
      :rules="employeeFormValidation"
      label-position="top"
    >
      <div>
        <Divider orientation="left"
          ><span class="text-sm text-gray-500 italic"
            >Informações Pessoais</span
          ></Divider
        >
      </div>
      <Row :gutter="16">
        <Col span="24" :xs="24" :sm="16">
          <FormItem
            prop="person.name"
            label="Nome Completo"
            :error="showFormErrors('person.name')"
          >
            <Input
              v-model="formData.person.name"
              placeholder="Nome do colaborador"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="8">
          <FormItem prop="ic" label="BI" :error="showFormErrors('ic')">
            <Input
              v-mask="'######'"
              v-model="formData.ic"
              placeholder="Bilhete de Identidade"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="16">
          <FormItem
            prop="email"
            label="Email do trabalho"
            :error="showFormErrors('email')"
          >
            <Input
              @on-change="syncEmployeeUserEmail()"
              v-model="formData.email"
              placeholder="Insira um email coorporativo"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="8">
          <FormItem label="Contacto" :error="showFormErrors('person.phone')">
            <Input
              placeholder="Contacto (Tel/Móvel)"
              v-mask="'(+238) ### ## ##'"
              v-model="formData.person.phone"
            ></Input>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="16">
          <FormItem
            label="Nascimento"
            :error="showFormErrors('person.birthday')"
          >
            <DatePicker
              class="w-full"
              :value="formData.person.birthday"
              type="date"
              placeholder="Data de Nascimento"
              v-model="formData.person.birthday"
            ></DatePicker>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="8">
          <FormItem label="Sexo">
            <RadioGroup
              class="w-full"
              type="button"
              v-model="formData.person.gender"
            >
              <Radio class="w-1/2" label="m">Masculino</Radio>
              <Radio class="w-1/2" label="f">Feminino</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>

      <div>
        <Divider orientation="left"
          ><span class="text-sm text-gray-500 italic"
            >Responsabilidades</span
          ></Divider
        >
      </div>

      <Row :gutter="16">
        <Col span="24">
          <template v-for="(charge, k) in formData.charges">
            <Row :key="k + 'encumbrance'" :gutter="16">
              <Col span="24" :xs="24" :sm="8">
                <FormItem
                  prop="charges.0.encumbrance.charge_id"
                  label="Cargo/Responsabilidade"
                >
                  <Select
                    placeholder="Selecionar o cargo do colaborador"
                    v-model="charge.encumbrance.charge_id"
                  >
                    <Option
                      v-for="charge in charges"
                      :value="charge.id"
                      :key="charge.id"
                      >{{ charge.name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>

              <Col span="24" :xs="12" :sm="8">
                <FormItem
                  prop="charges.0.encumbrance.activity_begin"
                  label="Início do cargo"
                >
                  <DatePicker
                    format="dd/MM/yyyy"
                    class="w-full"
                    type="date"
                    placeholder="Data de início do cargo"
                    v-model="charge.encumbrance.activity_begin"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="24" :xs="12" :sm="8">
                <FormItem label="Fim do cargo">
                  <DatePicker
                    format="dd/MM/yyyy"
                    class="w-full"
                    type="date"
                    placeholder="Data de fim da cordenação"
                    v-model="charge.encumbrance.activity_end"
                  ></DatePicker>
                </FormItem>
              </Col>
            </Row>
          </template>
        </Col>

        <Col span="24" :xs="24" :sm="12">
          <FormItem label="Este colaborador tambem leciona nesta escola">
            <i-switch v-model="formData.is_teacher" size="large">
              <span slot="open">Sim</span>
              <span slot="close">Não</span>
            </i-switch>
          </FormItem>
        </Col>

        <Col span="24" :xs="24" :sm="12">
          <FormItem label="Este colaborador pode ter uma conta de utilizador">
            <i-switch
              @on-change="resetUserEmail()"
              v-model="formData.sync_user_account"
              size="large"
            >
              <span slot="open">Sim</span>
              <span slot="close">Não</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>

      <template v-if="formData.sync_user_account">
        <div>
          <Divider orientation="left"
            ><span class="text-sm text-gray-500 italic"
              >Conta e autenticação</span
            ></Divider
          >
        </div>

        <Row :gutter="16">
          <Col span="24">
            <FormItem
              prop="person.user.email"
              label="Email de autenticação"
              :error="showFormErrors('person.user.email')"
            >
              <Input
                :disabled="formData.sync_email"
                v-model="formData.person.user.email"
                placeholder="Insira um email de autenticação de utilizador"
              >
                <Tooltip
                  slot="prepend"
                  placement="right"
                  width="200"
                  :content="
                    formData.email
                      ? 'Utilizar o email cooporativo?'
                      : 'Antes, insira o email coorporativo'
                  "
                >
                  <i-switch
                    :disabled="!formData.email"
                    @on-change="syncEmployeeUserEmail()"
                    v-model="formData.sync_email"
                    size="large"
                  >
                    <span slot="open">Sim</span>
                    <span slot="close">Não</span>
                  </i-switch>
                </Tooltip>
              </Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              prop="person.user.name"
              label="Nome de utilizador"
              :error="showFormErrors('person.user.name')"
            >
              <Input
                v-model="formData.person.user.name"
                placeholder="Insira o nome do colaborador como utilizador"
              >
              </Input>
            </FormItem>
          </Col>

          <Col
            span="12"
            v-if="
              creating ||
                (!formData.person.user.email && !formData.person.user.name)
            "
          >
            <FormItem
              prop="person.user.password"
              label="Palavra passe"
              :error="showFormErrors('person.user.password')"
            >
              <Input
                v-model="formData.person.user.password"
                placeholder="Insira a passe de autenticação"
                :disabled="formData.default_password"
              >
                <Tooltip
                  slot="prepend"
                  placement="right"
                  content="Usar password padrão"
                >
                  <i-switch
                    @on-change="checkDefaultPassword()"
                    v-model="formData.default_password"
                    size="large"
                  >
                    <span slot="open">Sim</span>
                    <span slot="close">Não</span>
                  </i-switch>
                </Tooltip>
              </Input>
            </FormItem>
          </Col>

          <Col
            span="12"
            v-if="
              !creating &&
                formData.person.user.email &&
                formData.person.user.name
            "
          >
            <FormItem label="Fazer reset da palavra passe">
              <i-switch
                @on-change="checkDefaultPassword()"
                v-model="formData.default_password"
                size="large"
              >
                <span slot="open">Sim</span>
                <span slot="close">Não</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
      </template>
      <Row>
        <Col span="24">
          <FormItem>
            <base-file-upload
              ref="employeeAvatar"
              :uploadMsg="'Clique ou largue a imagem de perfil'"
              :fileList="uploadAvatarList"
              :fileActions="`${$axios.defaults.baseURL}/upload-employee-avatar`"
              :tempFileUrl="`${publicURL}/uploads/avatars/${formData.avatar}`"
              :fileFormData="formData.avatar"
              @onFileSuccess="handleAvatarSuccess($event)"
              @onRemoveFile="handleRemoveAvatar($event)"
            ></base-file-upload>
          </FormItem>
        </Col>
      </Row>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('employeeForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('employees/toggleCreateEmployeeDialog')
                    : handleModal('employees/toggleUpdateEmployeeDialog')
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
                        'employeeForm',
                        'employees',
                        'Utilizador Registado',
                        'APP_UPDATE_EMPLOYEES_DATA',
                        'employees/toggleCreateEmployeeDialog'
                      )
                    : updateData(
                        'employeeForm',
                        'employees',
                        'Utilizador Atualizado',
                        'APP_UPDATE_EMPLOYEES_DATA',
                        'employees/toggleUpdateEmployeeDialog'
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
import { employee_validation } from "@/mixins/fieldsValidation";

export default {
  name: "EmployeeForm",
  mixins: [requests, uploadFeedback, employee_validation],
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
      uploadAvatarList: []
    };
  },

  mounted() {
    this.initFilesUploaded();
  },
  computed: {
    ...mapGetters({
      charges: "charges/charges"
    })
  },

  methods: {
    async resetUserEmail() {
      if (this.formData.person.user == null) {
        this.formData.person.user = {
          id: "",
          name: "",
          email: "",
          password: ""
        };
        return;
      }
    },

    checkDefaultPassword() {
      if (this.formData.default_password) {
        this.formData.person.user.password = "eicm@password";
      }
      return;
    },
    syncEmployeeUserEmail() {
      if (!this.formData.email) {
        return;
      }
      if (this.formData.sync_email && this.formData.email) {
        this.formData.person.user.email = this.formData.email;
        return;
      }
      this.formData.person.user.email = "";
    },

    handleAvatarSuccess(res) {
      this.formData.avatar = res;
      this.uploadAvatarList = this.$refs.employeeAvatar.$refs.uploadFileComponent.fileList;
    },

    async handleRemoveAvatar() {
      let avatar = this.formData.avatar;
      const res = await this.$axios.post("remove-employee-avatar", {
        avatar: avatar
      });
      if (res.status != 200) {
        this.formData.avatar = avatar;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadAvatarList = this.$refs.employeeAvatar.$refs.uploadFileComponent.clearFiles();
      this.formData.avatar = "";
    },

    initFilesUploaded() {
      if (this.creating) {
        this.uploadAvatarList = this.$refs.employeeAvatar.$refs.uploadFileComponent.fileList;
        return;
      }

      this.uploadAvatarList.push({
        response: this.formData.avatar,
        status: "finished"
      });
    }
  }
};
</script>

<style lang="css"></style>
