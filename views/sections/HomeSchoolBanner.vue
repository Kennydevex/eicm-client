<template>
  <div class="bg-white">
    <div class="container m-auto">
      <Row type="flex">
      <Col span="24"  :ms="{ span: 24, order: 1 }" :md="{ span: 12, order: 2 }" class="self-end pt-24">
          <div>
            <img class="object-cover" src="banners/b1.png" alt="Nossos alunos" />
          </div>
        </Col>
        <Col span="24" :ms="{ span: 24, order: 2 }" :md="{ span: 12, order: 1 }">
          <div class="justify-center p-8">
            <base-home-title>Ensino Técnico de Qualidade</base-home-title>
            <base-home-body>
              Lorem ipsum dolor sit amet consectetur adipiscing elit vehicula
              urna fermentum facilisis, orci dictumst gravida sociosqu nibh
              tempor suscipit fames semper. Ridiculus imperdiet turpis donec
              sociosqu cum euismod, sagittis sapien arcu platea blandit id
              class, lacus sem facilisi ultrices vulputate. Rhoncus nec
              dignissim blandit torquent vestibulum sapien magnis cum quis.
            </base-home-body>
          </div>
        </Col>
        
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeSchoolBanner"
};
</script>

<style lang="scss" scoped></style>
