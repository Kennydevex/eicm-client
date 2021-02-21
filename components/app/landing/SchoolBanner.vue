<template>
  <div class="overflow-x-hidden bg-white">
    <div class="container m-auto">
      <el-row align="middle" :gutter="20" class="flex flex-col md:flex-row">
        <el-col :md="12" class="md:order-2">
          <div data-aos="fade-up-left">
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
              Lorem ipsum dolor sit amet consectetur adipiscing elit vehicula
              urna fermentum facilisis, orci dictumst gravida sociosqu nibh
              tempor suscipit fames semper. Ridiculus imperdiet turpis donec
              sociosqu cum euismod,
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
