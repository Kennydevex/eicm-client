<template>
  <el-form
    ref="userForm"
    :model="formData"
    :rules="userFormValidation"
    label-position="top"
    label-width="80"
  >
    <el-tabs v-model="userTab">
      <el-tab-pane label="Dados do Utilizador" name="user_info">
        <el-divider content-position="left">
          <span class="text-gray-500">Dados Pessoais</span></el-divider
        >

        <el-row :gutter="20">
          <el-col :xs="24">
            <el-form-item
              prop="person.name"
              label="Nome"
              :error="showFormErrors('person.name')"
            >
              <el-input
                placeholder="Nome Completo"
                v-model="formData.person.name"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12">
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
          <el-col :xs="24" :md="12">
            <el-form-item label="Sexo" prop="person.gender">
              <el-radio border v-model="formData.person.gender" label="m"
                >Masculino</el-radio
              >
              <el-radio border v-model="formData.person.gender" label="f"
                >Feminino</el-radio
              >
            </el-form-item>
          </el-col>

          <el-col :xs="24">
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
        </el-row>
        <el-divider content-position="left"
          ><span class="text-gray-500">Autenticação</span></el-divider
        >
        <el-row :gutter="20">
          <el-col :xs="24">
            <el-form-item
              prop="email"
              label="Email"
              :error="showFormErrors('email')"
            >
              <el-input
                placeholder="Insira o email de autenticação"
                v-model="formData.email"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24">
            <el-form-item
              prop="name"
              label="Utilizador"
              :error="showFormErrors('name')"
            >
              <el-input
                placeholder="Insira uma identificaçõe como utilizador"
                v-model="formData.name"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12" v-if="creating || resetPass">
            <el-form-item
              prop="password"
              label="Palavra Passe"
              :error="showFormErrors('password')"
            >
              <el-input
                show-password
                placeholder="Palavra Passe"
                v-model="formData.password"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12" v-if="!creating">
            <el-form-item prop="status" label="Reset Password">
              <el-switch
                active-text="Sim"
                inactive-text="Não"
                v-model="resetPass"
              >
              </el-switch>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12">
            <el-form-item prop="status" label="Ativação">
              <el-switch
                active-text="Ativo"
                inactive-text="Inativo"
                v-model="formData.status"
              >
              </el-switch>
            </el-form-item>
          </el-col>

          <el-col :xs="24">
            <el-form-item prop="avatar" label="Foto de Perfil">
              <baseImageUpload
                ref="userAvatar"
                :uploadMsg="'Clique ou largue o logotipo aqui'"
                :fileActions="`${$axios.defaults.baseURL}/upload-user-avatar`"
                :fileList="uploadAvatarList"
                @onFileSuccess="handleAvatarSuccess($event)"
                @onRemoveFile="handleRemoveAvatar($event)"
              ></baseImageUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Permisções e Papeis" name="access_permission">
        <el-divider content-position="left"
          ><span class="text-gray-500"
            >Configuração de permissão de acessp</span
          ></el-divider
        >
        <el-row>
          <el-col>
            <el-tabs tab-position="top">
              <el-tab-pane label="Papeis">
                <div class="flex items-center justify-center">
                  <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="Filtrar Papeis"
                    v-model="formData.user_roles"
                    :props="{
                      key: 'id',
                      label: 'name'
                    }"
                    :data="roles"
                    :titles="['Papeis', 'Selecionados']"
                  >
                  </el-transfer>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Permissões">
                <div class="flex items-center justify-center">
                  <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="Filtrar permissões"
                    v-model="formData.user_permissions"
                     :props="{
                      key: 'id',
                      label: 'name'
                    }"
                    :data="permissions"
                    :titles="['Permissões', 'Selecionados']"
                  >
                  </el-transfer>
                </div>
              </el-tab-pane>
            </el-tabs>
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
import { user_validation } from "@/mixins/fieldsValidation";
export default {
  name: "UserForm",

  mixins: [requests, uploadFeedback, user_validation],
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
      userTab: "user_info",
      resetPass: false
    };
  },

  computed: {
    ...mapGetters({
      roles: "permissions/roles",
      permissions: "permissions/permissions"
    })
  },

  methods: {
    filterMethod(query, item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    },

    handleAvatarSuccess(res) {
      this.formData.avatar = res;
      if (
        this.formData.avatar &&
        this.$refs.userAvatar.$refs.uploadImageComponent.uploadFiles.length > 0
      ) {
        this.disabledUpload = true;
      } else {
        this.disabledUpload = false;
        this.uploadAvatarList = this.$refs.userAvatar.$refs.uploadImageComponent.clearFiles();
      }
    },

    async handleRemoveAvatar() {
      let avatar = this.formData.avatar;
      if (avatar.includes("default")) {
        this.actionMsg("Imagem por defeito não pode ser apagada", "warning");
        return;
      }
      const res = await this.$axios.post("remove-user-avatar", {
        avatar: avatar
      });
      if (res.status != 200) {
        this.formData.avatar = avatar;
        this.actionMsg("Ago correu mal", "error");
        return;
      }
      this.uploadAvatarList = this.$refs.userAvatar.$refs.uploadImageComponent.clearFiles();
      this.formData.avatar = "";
      this.disabledUpload = false;
    },

    async addUser() {
      await this.addData(
        "userForm",
        "users",
        "Utilizador Registado",
        "APP_UPDATE_USERS_DATA",
        "users/toggleCreateUserDialog"
      );
      this.userTab = "user_info";
      this.$refs.userAvatar.$refs.uploadImageComponent.clearFiles();
    },

    updateUser() {
      this.updateData(
        "userForm",
        "users",
        "Utilizador Atualizado",
        "APP_UPDATE_USERS_DATA",
        "users/toggleCreateUserDialog"
      );
      this.userTab = "user_info";
      this.$refs.userAvatar.$refs.uploadImageComponent.clearFiles();
    },

    cancelUserForm() {
      this.resetFormFields("userForm");
      if (this.formData.avatar && this.formData.avatar != "default.svg") {
        this.handleRemoveAvatar();
      }
      this.userTab = "user_info";
      this.handleModal("users/toggleCreateUserDialog");
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
