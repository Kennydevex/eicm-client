<template>
  <div class="px-3">
    <Form
      ref="userForm"
      :model="formData"
      :rules="userFormValidation"
      label-position="right"
      :label-width="80"
    >
      <Tabs value="user_data">
        <TabPane label="Utilizador" name="user_data">
          <div>
            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Informações Pessoais</span
              ></Divider
            >
            <FormItem
              prop="person.name"
              label="Nome"
              :error="showFormErrors('person.name')"
            >
              <Input
                v-model="formData.person.name"
                placeholder="Nome Completo"
              ></Input>
            </FormItem>

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

            <FormItem label="Sexo">
              <RadioGroup v-model="formData.person.gender">
                <Radio label="0">Masculino</Radio>
                <Radio label="1">Feminino</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="Contacto" :error="showFormErrors('person.phone')">
              <Input
                placeholder="Contacto (Tel/Móvel)"
                v-mask="'(+238) ### ## ##'"
                v-model="formData.person.phone"
              ></Input>
            </FormItem>
            <Divider orientation="left"
              ><span class="text-sm text-gray-500 italic"
                >Dados de autenticação</span
              ></Divider
            >

            <FormItem
              label="Email"
              prop="email"
              :error="showFormErrors('email')"
            >
              <Input
                v-model="formData.email"
                placeholder="Insira o email de autenticação"
              ></Input>
            </FormItem>
            <FormItem
              label="Utilizador"
              prop="name"
              :error="showFormErrors('name')"
            >
              <Input
                v-model="formData.name"
                placeholder="Indique um nome de utilizador"
              ></Input>
            </FormItem>
            <FormItem
              v-if="creating"
              label="Password"
              prop="password"
              :error="showFormErrors('password')"
            >
              <Input
                type="password"
                v-model="formData.password"
                placeholder="Palavra passe"
              ></Input>
            </FormItem>
            <FormItem label="Ativação">
              <i-switch v-model="formData.status" size="large">
                <span slot="open">Sim</span>
                <span slot="close">Não</span>
              </i-switch>
            </FormItem>
            <FormItem label="Perfil">
              <div>
                <Upload
                  :disabled="uploadAvatarList && uploadAvatarList.length == 1"
                  ref="uploadAvatar"
                  :show-upload-list="false"
                  :on-success="handleAvatarSuccess"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :format="['jpg', 'jpeg', 'png']"
                  :on-exceeded-size="handleMaxSize"
                  :on-error="handleError"
                  type="drag"
                  :action="`${$axios.defaults.baseURL}/upload-user-avatar`"
                  :headers="{
                    'Access-Control-Allow-Origin': '*',
                    'X-Requested-With': 'XMLHttpRequest'
                  }"
                >
                  <div class="p-2">
                    <Icon
                      type="ios-cloud-upload"
                      size="52"
                      :class="
                        uploadAvatarList && uploadAvatarList.length == 1
                          ? 'text-gray-600'
                          : 'text-primary'
                      "
                    ></Icon>
                    <p>Click or drag files here to upload</p>
                  </div>
                </Upload>
                <div
                  class="demo-upload-list"
                  v-for="(item, i) in uploadAvatarList"
                  :key="i"
                >
                  <template v-if="item.status === 'finished'">
                    <img
                      class="w-full h-full"
                      v-if="formData.avatar"
                      :src="`${publicURL}/uploads/avatars/${formData.avatar}`"
                    />
                    <div class="demo-upload-list-cover">
                      <Icon
                        size="32"
                        class="text-gray-100 cursor-pointer"
                        @click.native="handleRemoveAvatar(item)"
                        type="ios-trash"
                      />
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        text-inside
                      />
                    </div>
                  </template>
                </div>
              </div>
            </FormItem>
          </div>
        </TabPane>
        <TabPane label="Permisções e Papeis" name="access_ermission">
          <div>
            <Collapse v-model="permission_tab">
              <Panel name="permissions">
                Permissões de Acesso
                <div slot="content" class=" flex justify-center">
                  <Transfer
                    :data="permissions"
                    :target-keys="formData.permissions"
                    :list-style="listStyle"
                    :render-format="renderTransfers"
                    @on-change="onChangePermissions"
                    :operations="['Remover', 'Adicionar']"
                    :not-found-text="'Nada para mostrar'"
                    filterable
                    :filter-method="filterMethod"
                    :titles="['Permissões', 'As selecionadas']"
                  ></Transfer>
                </div>
              </Panel>
              <Panel name="roles">
                Papeis de utilizador
                <div slot="content" class=" flex justify-center">
                  <Transfer
                    :data="roles"
                    :target-keys="formData.roles"
                    :list-style="listStyle"
                    :render-format="renderTransfers"
                    @on-change="onChangeRoles"
                    :operations="['Remover', 'Adicionar']"
                    :not-found-text="'Nada para mostrar'"
                    filterable
                    :filter-method="filterMethod"
                    :titles="['Papeis', 'Os selecionados']"
                  ></Transfer>
                </div>
              </Panel>
            </Collapse>
          </div>
        </TabPane>
      </Tabs>
      <FormItem>
        <div class="flex justify-end">
          <Button @click="resetFormFields('userForm')" style="margin-right: 8px"
            >Limpar</Button
          >

          <Button
            @click="
              creating
                ? handleModal('users/toggleCreateUserDialog')
                : handleModal('users/toggleUpdateUserDialog')
            "
            >Cancelar</Button
          >

          <Button
            :loading="sending"
            type="primary"
            style="margin-left: 8px"
            @click.stop="
              creating
                ? addData('userForm', 'users', 'Utilizador Registado')
                : updateData('userForm', 'users', 'Utilizador Atualizado')
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
import { user_validation } from "@/mixins/fieldsValidation";

export default {
  mixins: [requests, uploadFeedback, user_validation],
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
      // sending: false,
      permission_tab: "permissions",
      listStyle: {
        width: "200px",
        height: "300px"
      },
      uploadAvatarList: []
    };
  },

  computed: {
    ...mapGetters({
      roles: "permissions/roles",
      permissions: "permissions/permissions"
    })
  },

  mounted() {
    this.creating
      ? (this.uploadAvatarList = this.$refs.uploadAvatar.fileList)
      : this.uploadAvatarList.push({
          response: this.formData.avatar,
          status: "finished"
        });
  },

  // created() {
  //   if (process.client) {
  //     window.getApp.$on("APP_CREATE_USER", () => {
  //       this.addUser("userForm");
  //     });
  //   }
  // },

  methods: {

    filterMethod(data, query) {
      return data.label.indexOf(query) > -1;
    },

    handleAvatarSuccess(res, file) {
      this.formData.avatar = res;
      this.uploadAvatarList = this.$refs.uploadAvatar.fileList;
    },

    async handleRemoveAvatar() {
      let avatar = this.formData.avatar;
      this.formData.avatar = "";
      const res = await this.$axios.post("remove-user-avatar", {
        avatar: avatar
      });
      if (res.status != 200) {
        this.formData.avatar = avatar;
        this.errorMsg("Ago correu mal");
        return;
      }
      this.uploadAvatarList = this.$refs.uploadAvatar.clearFiles();
    },

    renderTransfers(item) {
      return item.label;
    },

    onChangePermissions(new_entries) {
      this.formData.permissions = new_entries;
    },
    onChangeRoles(new_entries) {
      this.formData.roles = new_entries;
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
