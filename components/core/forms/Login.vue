<template>
  <el-form
    ref="formData"
    :model="formData"
    :rules="loginValidation"
    @keydown.enter.native="login('formData')"
  >
    <el-form-item prop="email">
      <el-input
        size="medium"
        prefix-icon="el-icon-user"
        placeholder="Email"
        v-model="formData.email"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        size="medium"
        prefix-icon="el-icon-unlock"
        clearable
        show-password
        placeholder="Palavra Passe"
        v-model.trim="formData.password"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        class="w-full"
        size="mini"
        :loading="sending"
        @click="login('formData')"
        type="primary"
      >
        <span v-if="!sending">Login</span>
        <span v-else>Enviando...</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "LoginForm",

  props: {
    formData: {
      type: Object,
      default: () => {
        return {
          email: "",
          password: ""
        };
      }
    }
  },

  data() {
    return {
      sending: false,

      loginValidation: {
        email: [
          {
            required: true,
            message: "É necessário introduzir um email",
            trigger: "blur"
          },
          {
            type: "email",
            message: "O formato do email é inválido",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Não pode faltar a palavra passe",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    async login(formRef) {
      await this.$refs[formRef].validate(valid => {
        if (valid) {
          this.sending = true;
          try {
            this.$auth
              .loginWith("local", {
                data: this.formData
              })
              .then(() => {
                this.$router.push({
                  path: "/admin"
                  // path: this.$router.query.redirect || "/admin"
                });
                this.actionMsg("Dados enviados com sucesso");
                this.sending = false;
              })
              .catch(err => {
                this.actionMsg("Algo Correu mal", "error");
                this.sending = false;
              });
            // this.resetFormFields(formRef);
          } catch (error) {
            this.actionMsg("Algo Correu mal", "error");
            this.sending = false;
          }
        } else {
          this.actionMsg("Verefique os campos!", "warning");
        }
      });
    }
  }
};
</script>
