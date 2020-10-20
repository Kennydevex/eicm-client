<template>
  <Form
    ref="form"
    :model="formData"
    :rules="loginValidation"
    @keydown.enter.native="login('form')"
  >
    <FormItem prop="email">
      <Input v-model.trim="formData.email" placeholder="Email" autofocus>
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input
        type="password"
        v-model.trim="formData.password"
        placeholder="Palavra Passe"
      >
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button :loading="sending" @click="login('form')" type="primary" long>
        <span v-if="!sending">Login</span>
        <span v-else>Enviando...</span>
      </Button>
    </FormItem>
  </Form>
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
            message: "Campo necessário",
            trigger: "blur"
          },
          { type: "email", message: "Email Inválido", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "Campo necessário",
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
                this.successMsg("Dados enviados com sucesso");
                this.sending = false;
              })
              .catch(err => {
                this.errorMsg("Algo Correu mal");
                this.sending = false;
              });
            // this.resetFormFields(formRef);
          } catch (error) {
            this.errorMsg("Algo Correu mal");
            this.sending = false;
          }
        } else {
          this.errorMsg("Verefique os campos!");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
