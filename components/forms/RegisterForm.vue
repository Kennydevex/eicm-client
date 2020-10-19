<template>
  <Form
    ref="form"
    :model="formData"
    :rules="registerValidation"
    @keydown.enter.native="register('form')"
  >
    <FormItem prop="name">
      <Input v-model="formData.name" placeholder="Nome de Utilizador">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="email">
      <Input v-model="formData.email" placeholder="Email">
        <span slot="prepend">
          <Icon :size="16" type="ios-mail"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input
        type="password"
        v-model="formData.password"
        placeholder="Palavra Passe"
      >
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="register('form')" type="primary" long>Registar</Button>
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
          name: "",
          email: "",
          password: ""
        };
      }
    }
  },

  data() {
    return {
      registerValidation: {
        name: [
          {
            required: true,
            message: "Campo necessário",
            trigger: "blur"
          }
        ],
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
    async register(formRef) {
      await this.$refs[formRef].validate(valid => {
        if (valid) {
          try {
            this.$axios.post("auth/register", this.formData);
            this.successMsg("Conta registada com sucesso");
            this.resetFormFields("form");
            this.$router.push({
              path: "/"
            });
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
