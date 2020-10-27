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
                <Radio label="m">Masculino</Radio>
                <Radio label="f">Feminino</Radio>
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

            <!-- File upload
            <FormItem label="Ativação">
              <base-file-upload
                ref="uploadAvatar"
                :fileList="uploadAvatarList"
                :fileActions="`${$axios.defaults.baseURL}/upload-user-avatar`"
                :tempFileUrl="`${publicURL}/uploads/avatars/${formData}`"
                :fileFormData="formData.avatar"
                @onFileSuccess="handleAvatarSuccess($event)"
                @onRemoveFile="handleRemoveAvatar($event)"
              ></base-file-upload>
            </FormItem>
             End File upload-->

            <FormItem>
              <div class="flex justify-end">
                <Button
                  @click="resetFormFields('userForm')"
                  style="margin-right: 8px"
                  >Limpar</Button
                >
                <template v-if="creating">
                  <Button @click="handleModal('users/toggleCreateUserDialog')"
                    >Cancelar</Button
                  >

                  <Button
                    :loading="sending"
                    type="primary"
                    style="margin-left: 8px"
                    @click.stop="
                      addData('userForm', 'users', 'Utilizador Registado')
                    "
                    ><span v-if="!sending">Registar</span>
                    <span v-else>Enviando...</span></Button
                  >
                </template>

                <template v-else>
                  <Button @click="handleModal('users/toggleUpdateUserDialog')"
                    >Cancelar</Button
                  >

                  <Button
                    :loading="sending"
                    type="primary"
                    style="margin-left: 8px"
                    @click.stop="
                      addData('userForm', 'users', 'Utilizador Registado')
                    "
                    ><span v-if="!sending">Atualizar</span>
                    <span v-else>Enviando...</span></Button
                  >
                </template>
              </div>
            </FormItem>
          </div>
        </TabPane>
      </Tabs>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { user_validation } from "@/mixins/fieldsValidation";
import { requests } from "@/mixins/appRequest";

export default {
  props: ["formData", "creating"],
  mixins: [user_validation, requests],

  data() {
    return {
      permission_tab: "permissions",
      listStyle: {
        width: "200px",
        height: "300px"
      },
      uploadAvatarList: []
    };
  },

  // mounted() {
  //   this.initUserAvatar();
  // },

  computed: {
    ...mapGetters({
      roles: "permissions/roles",
      permissions: "permissions/permissions"
    })
  },

  methods: {
    // initUserAvatar() {
    //   if (this.creating) {
    //     this.uploadAvatarList = this.$refs.uploadAvatar.fileList;
    //     return;
    //   }
    //   this.uploadAvatarList.push({
    //     response: this.formData.avatar,
    //     status: "finished"
    //   });
    // },

    // handleAvatarSuccess(ev) {
    //   console.log("ta aqui");
    //   console.log(ev);
    //   this.formData.avatar = res;
    //   this.uploadAvatarList = this.$refs.uploadAvatar.fileList;
    // },

    // async handleRemoveAvatar(item) {
    //   let avatar = this.formData.avatar;
    //   this.formData.avatar = "";
    //   const res = await this.$axios.post("remove-user-avatar", {
    //     avatar: avatar
    //   });
    //   if (res.status != 200) {
    //     this.formData.avatar = avatar;
    //     this.errorMsg("Ago correu mal");
    //     return;
    //   }
    //   this.uploadAvatarList = this.$refs.uploadAvatar.clearFiles();
    // }
  }
};
</script>

<style lang="scss" scoped></style>
