<template>
  <div
    class="flex items-center justify-end object-cover w-full h-screen bg-gray-600 "
    style="background-image: url('/background/bg_login.jpg');"
  >
    <div
      class="flex flex-col justify-center p-8 m-5 bg-white border rounded-lg shadow-2xl w-96"
    >
      <div class="pb-5 text-center">
        <p
          class="text-base font-light tracking-wider text-center uppercase text-primary"
        >
          Autenticar
        </p>
      </div>
      <div class="w-full mb-3" v-if="auth_401_errors">
        <el-alert
          title="Verefique os dados inseridos"
          :description="auth_401_errors"
          type="error"
          show-icon
        >
        </el-alert>
      </div>
      <div>
        <coreFormsLogin :formData="formData"></coreFormsLogin>
      </div>
      <el-divider class="py-0 my-0"></el-divider>
      <div>
        <div>
          <router-link to="/">
            <el-button
              :to="'/'"
              type="text"
              class="p-0 text-xs text-left text-primary hover:outline-none"
              plain
              >Início</el-button
            >
          </router-link>
        </div>

        <div>
          <router-link :to="'/registar'">
            <el-button
              type="text"
              class="p-0 text-xs tracking-wide text-left text-primary hover:outline-none"
              plain
              >Quero registar uma conta</el-button
            >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  }
};
</script>
