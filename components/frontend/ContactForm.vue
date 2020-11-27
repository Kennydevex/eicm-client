<template>
  <Form
    ref="formData"
    :model="formData"
    :rules="validation"
    label-position="top"
  >
    <Row :gutter="16">
      <Col span="24" :md="12">
        <FormItem label="Nome" prop="name">
          <Input
            v-model="formData.name"
            placeholder="Introduza o seu nome"
          ></Input>
        </FormItem>
      </Col>
      <Col span="24" :md="12">
        <FormItem label="E-mail" prop="mail">
          <Input
            v-model="formData.mail"
            placeholder="Introduza o seu meail"
          ></Input>
        </FormItem>
      </Col>
      <Col span="24">
        <FormItem label="Mensagem" prop="message">
          <Input
            v-model="formData.message"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="Escreva a sua mensagem..."
          ></Input>
        </FormItem>
      </Col>

      <Col span="24">
        <FormItem>
          <Button type="primary" @click="handleSubmit('formData')"
            >Enviar</Button
          >
          <Button @click="handleReset('formData')" class="ml-4">Limpar</Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        mail: "",
        message: ""
      },
      validation: {
        name: [
          {
            required: true,
            message: "É necessário introduzir um nome",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "É obrigatório indicar o seu email",
            trigger: "blur"
          },
          {
            type: "email",
            message: "O formato do email não é valido",
            trigger: "blur"
          }
        ],

        message: [
          {
            required: true,
            message: "Não possivel enviar os dados em a sua mensagem",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Esta mensagem é muito curta",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped></style>
