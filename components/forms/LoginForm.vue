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
      <Button @click="login('form')" type="primary" long>Login</Button>
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
              });
            // this.resetFormFields(formRef);
          } catch (error) {
            this.errorMsg("Algo Correu mal");
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
