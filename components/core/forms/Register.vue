<template>
  <el-form
    ref="formData"
    :model="formData"
    :rules="registerValidation"
    @keydown.enter.native="register('formData')"
  >
    <el-form-item prop="name" :error="showFormErrors('name')">
      <el-input
      
        size="medium"
        prefix-icon="el-icon-user"
        placeholder="Username"
        v-model="formData.name"
      ></el-input>
    </el-form-item>

    <el-form-item prop="email" :error="showFormErrors('email')">
      <el-input
        size="medium"
        prefix-icon="el-icon-message"
        placeholder="Email"
        v-model="formData.email"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password" :error="showFormErrors('password')">
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
        @click="register('formData')"
        type="primary"
      >
        <span v-if="!sending">Registar</span>
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
          id: "",
          name: "",
          email: "",
          password: "",
          person: {
            id: "",
            name: "",
            phone: "",
            birthday: "",
            gender: ""
          }
        };
      }
    }
  },

  data() {
    return {
      sending: false,

      registerValidation: {
        name: [
          {
            required: true,
            message: "É necessário ter um nome de utilizador",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "É preciso inserir um email para autenticação",
            trigger: "blur"
          },
          {
            type: "email",
            message: "O formato do email não é válido",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Por favor proteja a sua conta com uma palavra passe",
            trigger: "change"
          },
          {
            type: "string",
            min: 8,
            message: "A palavra passe deve ter no mínimo 8 caracteres",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    async register(formRef) {
      await this.$refs[formRef].validate(valid => {
        if (valid) {
          this.sending = true;
          try {
            this.$axios
              .post("auth/register", this.formData)
              .then(() => {
                this.sending = false;

                this.actionNotify(
                  "Conta Criada",
                  "A sua conta foi criada com sucesso, aguarde a sua ativação"
                );
                this.resetFormFields("formData");
                this.$router.push({
                  path: "/"
                });
              })
              .catch(err => {
                this.actionMsg("Algo Correu mal", "error");
                this.sending = false;
              });
          } catch (error) {
            this.sending = false;
            this.actionMsg("Algo Correu mal", "error");
          }
        } else {
          this.actionMsg("Algo Correu mal", "warning");
        }
      });
    }
  }
};
</script>
