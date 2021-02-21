<template>
  <el-form
    ref="employeeForm"
    :model="formData"
    :rules="employeeFormValidation"
    label-position="top"
    label-width="80"
  >
    <el-divider content-position="left">
      <span class="text-gray-500">Informações Pessoais</span></el-divider
    >

    <el-row :gutter="20">
      <el-col :xs="24" :sm="16">
        <el-form-item
          prop="person.name"
          label="Nome completo"
          :error="showFormErrors('person.name')"
        >
          <el-input
            placeholder="Nome do colaborador"
            v-model="formData.person.name"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-form-item
          prop="ic"
          label="Número de BI"
          :error="showFormErrors('ic')"
        >
          <el-input
            placeholder="Introduza o numero de BI"
            v-mask="'######'"
            v-model="formData.ic"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="16">
        <el-form-item
          prop="email"
          label="Email do trabalho"
          :error="showFormErrors('email')"
        >
          <el-input
            placeholder="Insira um email coorporativo"
            v-model="formData.email"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-form-item
          prop="person.phone"
          label="Contacto"
          :error="showFormErrors('person.phone')"
        >
          <el-input
            placeholder="Contacto (Tel/Móvel)"
            v-mask="'(+238) ### ## ##'"
            v-model="formData.person.phone"
          ></el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item
          prop="person.birthday"
          label="Nascimento"
          :error="showFormErrors('person.birthday')"
        >
          <el-date-picker
            :value="formData.person.birthday"
            class="w-full"
            v-model="formData.person.birthday"
            type="date"
            placeholder="Data de Nascimento"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-form-item label="Sexo" prop="person.gender">
          <el-radio border v-model="formData.person.gender" label="m"
            >Masculino</el-radio
          >
          <el-radio border v-model="formData.person.gender" label="f"
            >Feminino</el-radio
          >
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-form-item
          prop="facebook"
          label="Página do facebook"
          :error="showFormErrors('facebook')"
        >
          <el-input
            placeholder="Cole a ligação da sua página no facebook"
            v-model="formData.facebook"
          >
            <template slot="prepend">Https://</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-form-item
          prop="twitter"
          label="Twitter"
          :error="showFormErrors('twitter')"
        >
          <el-input
            placeholder="Cole a ligação da sua página no twitter"
            v-model="formData.twitter"
          >
            <template slot="prepend">Https://</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="8">
        <el-form-item
          prop="linkedin"
          label="Perfil do linkedin"
          :error="showFormErrors('linkedin')"
        >
          <el-input
            placeholder="Cole a ligação da sua página no linkedin"
            v-model="formData.linkedin"
          >
            <template slot="prepend">Https://</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left"
      ><span class="text-gray-500">Responsabilidades</span></el-divider
    >
    <el-row :gutter="20">
      <el-col :span="24">
        <template v-for="(charge, k) in formData.charges">
          <el-row :key="k + 'encumbrance'" :gutter="20">
            <el-col :span="24" :xs="24" :sm="12">
              <el-form-item
                prop="charges.0.encumbrance.charge_id"
                label="Cargo/Responsabilidade"
              >
                <el-select
                  v-model="charge.encumbrance.charge_id"
                  placeholder="Selecionar o cargo do colaborador"
                >
                  <el-option
                    v-for="charge in charges"
                    :value="charge.id"
                    :key="charge.id"
                    :label="charge.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6">
              <el-form-item
                prop="charges.0.encumbrance.activity_begin"
                label="Início do cargo"
              >
                <el-date-picker
                  value-format="yyyy-MM-dd "
                  :value="charge.encumbrance.activity_begin"
                  class="w-full"
                  placeholder="Data de início do cargo"
                  v-model="charge.encumbrance.activity_begin"
                  type="date"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6">
              <el-form-item
                prop="charges.0.encumbrance.activity_end"
                label="Fim do cargo"
              >
                <el-date-picker
                  value-format="yyyy-MM-dd "
                  :value="charge.encumbrance.activity_end"
                  class="w-full"
                  placeholder="Data de fim do cargo"
                  v-model="charge.encumbrance.activity_end"
                  type="date"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item
          prop="is_teacher"
          label="Este colaborador leciona na escola?"
        >
          <el-switch
            active-text="Sim"
            inactive-text="Não"
            v-model="formData.is_teacher"
          ></el-switch>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :sm="12">
        <el-form-item
          prop="sync_user_account"
          label="Este colaborador precisa de uma conta de utilizador?"
        >
          <el-switch
            active-text="Sim"
            inactive-text="Não"
            @change="resetUserEmail()"
            v-model="formData.sync_user_account"
          ></el-switch>
        </el-form-item>
      </el-col>
    </el-row>

    <template v-if="formData.sync_user_account">
      <el-divider content-position="left">
        <span class="text-gray-500">Conta e autenticação</span></el-divider
      >

      <el-row :gutter="20">
        <el-col :xs="24">
          <el-form-item
            prop="person.user.email"
            label="Email de autenticação"
            :error="showFormErrors('person.user.email')"
          >
            <el-input
              :disabled="formData.sync_email"
              v-model="formData.person.user.email"
              placeholder="Insira um email de autenticação de utilizador"
            >
              <el-tooltip
                slot="prepend"
                class="item"
                effect="dark"
                :content="
                  formData.email
                    ? 'Utilizar o email cooporativo?'
                    : 'Antes, insira o email coorporativo'
                "
                placement="top-start"
              >
                <el-switch
                  active-text="Sim"
                  inactive-text="Não"
                  :disabled="!formData.email"
                  @change="syncEmployeeUserEmail()"
                  v-model="formData.sync_email"
                ></el-switch>
              </el-tooltip>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-form-item
            prop="person.user.name"
            label="Nome de utilizador"
            :error="showFormErrors('person.user.name')"
          >
            <el-input
              v-model="formData.person.user.name"
              placeholder="Insira o nome de utilizador"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col
          :xs="24"
          :md="12"
          v-if="
            creating ||
              (!formData.person.user.email && !formData.person.user.name)
          "
        >
          <el-form-item
            prop="person.user.password"
            label="Palavra Passe"
            :error="showFormErrors('person.user.password')"
          >
            <el-input
              placeholder="Insira uma palavra passe"
              v-model="formData.person.user.password"
              :show-password="!formData.default_password"
              :readonly="formData.default_password"
            >
              <el-tooltip
                slot="prepend"
                class="item"
                effect="dark"
                :content="
                  formData.default_password
                    ? 'Criar uma palavra passe'
                    : 'Usar password padrão: eicm@password'
                "
                placement="top-start"
              >
                <el-switch
                  @change="checkDefaultPassword()"
                  v-model="formData.default_password"
                ></el-switch>
              </el-tooltip>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </template>

    <el-row :gutter="20">
      <el-col>
        <el-form-item prop="avatar" label="Foto de Perfil">
          <baseImageUpload
            ref="employeeAvatar"
            :uploadMsg="'Clique ou largue o logotipo aqui'"
            :fileActions="`${$axios.defaults.baseURL}/upload-employee-avatar`"
            :fileList="uploadAvatarList"
            @onFileSuccess="handleAvatarSuccess($event)"
            @onRemoveFile="handleRemoveAvatar($event)"
          ></baseImageUpload>
        </el-form-item> 
      </el-col>
    </el-row>

    <el-divider content-position="left">
      <span class="text-gray-500">Ativação</span></el-divider
    >
    <el-row>
      <el-col :span="12">
        <el-form-item prop="active" label="Ativação">
          <el-switch
            active-text="Ativo"
            inactive-text="Inativo"
            v-model="formData.active"
          >
          </el-switch>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="team" label="Destaque como equipe">
          <el-switch
            active-text="Sim"
            inactive-text="Não"
            v-model="formData.team"
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
import { employee_validation } from "@/mixins/fieldsValidation";
export default {
  name: "EmployeeForm",

  mixins: [requests, uploadFeedback, employee_validation],
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
      uploadAvatarList: [],
      disabledUpload: false,
      employeeTab: "employee_info",
      resetPass: false
    };
  },

  computed: {
    ...mapGetters({
      charges: "charges/charges"
    })
  },

  methods: {
    resetUserEmail() {
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
        return;
      }
      this.formData.person.user.password = "";
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
      if (
        this.formData.avatar &&
        this.$refs.employeeAvatar.$refs.uploadImageComponent.uploadFiles
          .length > 0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadAvatarList = this.$refs.employeeAvatar.$refs.uploadImageComponent.clearFiles();
      }
    },

    async handleRemoveAvatar() {
      let avatar = this.formData.avatar;
      if (avatar.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-employee-avatar", {
        avatar: avatar
      });
      if (res.status != 200) {
        this.formData.avatar = avatar;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadAvatarList = this.$refs.employeeAvatar.$refs.uploadImageComponent.clearFiles();
      this.formData.avatar = "";
      this.disabledUpload = false;
    },

    async addEmployee() {
      await this.addData(
        "employeeForm",
        "employees",
        "Colaborador Registado",
        "APP_UPDATE_EMPLOYEES_DATA",
        "employees/toggleCreateEmployeeDialog"
      );
      this.employeeTab = "employee_info";
      this.$refs.employeeAvatar.$refs.uploadImageComponent.clearFiles();
    },

    updateEmployee() {
      this.updateData(
        "employeeForm",
        "employees",
        "Colaborador Atualizado",
        "APP_UPDATE_EMPLOYEES_DATA",
        "employees/toggleCreateEmployeeDialog"
      );
      this.employeeTab = "employee_info";
      this.$refs.employeeAvatar.$refs.uploadImageComponent.clearFiles();
    },

    cancelEmployeeForm() {
      this.resetFormFields("employeeForm");
      if (this.formData.avatar && this.formData.avatar != "default.svg") {
        this.handleRemoveAvatar();
      }
      this.employeeTab = "employee_info";
      this.handleModal("employees/toggleCreateEmployeeDialog");
    },

    initFilesUploaded() {
      this.uploadAvatarList = [];
      if (
        !this.creating &&
        this.formData.avatar &&
        !this.formData.avatar.includes("default")
      ) {
        this.uploadAvatarList.push({
          name: this.formData.avatar,
          response: this.formData.avatar,
          percentage: 100,
          status: "success",
          url: `${this.publicURL}/uploads/avatars/${this.formData.avatar}`
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
