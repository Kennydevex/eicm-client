<template>
  <div class="overflow-x-hidden bg-white">
    <div class="container m-auto">
      <el-row align="middle" :gutter="20" class="flex flex-col md:flex-row">
        <el-col :md="12" class="md:order-2">
          <div data-aos="fade-up-left justify-center items-end">
            <img
              class="object-cover"
              src="banners/banner1.jpg"
              alt="Nossos alunos"
            />
          </div>
        </el-col>

        <el-col :md="12" class="md:order-1">
          <div class="justify-center p-8">
            <base-title>Ensino Técnico de Qualidade</base-title>
            <base-body>
              Escola Industrial e Comercial do Mindelo-Guilherme Dias Chantre, uma referência no ensino técnico profissional a nível nacional e internacional, que desde a sua criação,  tem vindo a contribuir progressivamente  na formação de quadros técnicos especializados em varias áreas, com uma excelente aceitação no mercado de trabalho. 
            </base-body>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeSchoolBanner"
};
</script>

<style lang="scss" scoped></style>
