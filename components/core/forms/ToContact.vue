<template>
  <el-form
    ref="formData"
    :rules="toContactRules"
    :model="formData"
    label-position="left"
    size="medium"
  >
    <el-row :gutter="20">
      <el-col :md="12" class="m-0">
        <el-form-item label="Nome Completo" prop="name">
          <el-input placeholder="Insira o seu nome completo" v-model="formData.name"></el-input>
        </el-form-item>
      </el-col>

      <el-col :md="12">
        <el-form-item label="Endereço de Email" prop="mail">
          <el-input placeholder="Informme um indereço de email" v-model="formData.mail"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="Mensagem" prop="message">
          <el-input placeholder="Escreva a qui a sua mensagem" type="textarea" v-model="formData.message"></el-input>
        </el-form-item>
      </el-col>

      <el-col>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('formData')"
            >Enviar</el-button
          >
          <el-button @click="handleReset('formData')">Limpar</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
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
      toContactRules: {
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
          this.$message({
            message: "Email enviado",
            type: "success"
          });
        } else {
          this.$message({
            message: "Erros de validações",
            type: "error"
          });
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
