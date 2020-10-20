<template>
  <Form
    ref="form"
    :model="formData"
    :rules="registerValidation"
    @keydown.enter.native="register('form')"
  >
    <FormItem prop="name" :error="showFormErrors('name')">
      <Input v-model="formData.name" placeholder="Nome de Utilizador">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="email" :error="showFormErrors('email')">
      <Input v-model="formData.email" placeholder="Email">
        <span slot="prepend">
          <Icon :size="16" type="ios-mail"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password" :error="showFormErrors('password')">
      <Input
        type="password"
        password
        v-model="formData.password"
        placeholder="Palavra Passe"
      >
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button :loading="sending" @click="register('form')" type="primary" long>
        <span v-if="!sending">Registar</span>
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
          name: "",
          email: "",
          password: ""
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

                this.successNotify(
                  "Conta Criada",
                  "A sua conta foi criada com sucesso, aguarde a sua ativação"
                );
                this.resetFormFields("form");
                this.$router.push({
                  path: "/"
                });
              })
              .catch(err => {
                this.errorMsg("Algo Correu mal");
                this.sending = false;
              });
          } catch (error) {
            this.sending = false;

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
