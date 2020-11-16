<template>
  <div
    class="h-screen object-cover w-full bg-gray-600 flex justify-end items-center"
    style="background-image: url('/background/login_cover.jpg');"
  >
    <div
      class="p-8 flex flex-col justify-center  w-96 bg-white m-5 rounded-lg shadow-lg"
    >
      <div class="pb-5 text-center">
        <p
          class="text-center font-semibold tracking-wider text-primary text-base"
        >
          Autenticar
        </p>
      </div>
      <div class="w-full mb-3" v-if="auth_401_errors">
        <Alert type="error" show-icon>{{auth_401_errors}}</Alert>
      </div>
      <div>
        <login-form :formData="formData"></login-form>
      </div>
      <div class="flex justify-between">
        <div>
          <Button
            :to="'/'"
            type="text"
            class="text-xs text-left text-primary p-0"
            ghost
            >Home</Button
          >
        </div>
        <div>
          <Button
            :to="'/register'"
            type="text"
            class="text-xs text-left text-primary tracking-wide p-0"
            ghost
            >Registar</Button
          >
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
  },

  components: {
    LoginForm: () => import("@/components/forms/LoginForm")
  }
};
</script>
