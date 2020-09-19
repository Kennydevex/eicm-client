<template>
  <div>
    <div>
      <course-header :course="'Cursos da Via Técnica'"></course-header>
    </div> 

    <div class="container m-auto pb-6">
      <Row>
        <Col class="p-3" :xs="24" :sm="12" :md="8" :lg="6">
          <!--<base-card></base-card>-->
          <base-general-card></base-general-card>
        </Col>
        <Col class="p-3" :xs="24" :sm="12" :md="8" :lg="6">
          <!--<base-card></base-card>-->
          <base-general-card></base-general-card>
        </Col>
        <Col class="p-3" :xs="24" :sm="12" :md="8" :lg="6">
          <!--<base-card></base-card>-->
          <base-general-card></base-general-card>
        </Col>
        <Col class="p-3" :xs="24" :sm="12" :md="8" :lg="6">
          <!--<base-card></base-card>-->
          <base-general-card></base-general-card>
        </Col>
        <Col class="p-3" :xs="24" :sm="12" :md="8" :lg="6">
          <!--<base-card></base-card>-->
          <base-general-card></base-general-card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tecnics",
  layout: "landing",

  data: function() {
    return {};
  },
  methods: {},
  components: {
    CourseHeader: () => import("@/views/sections/CourseHeader")
  }
};
</script>

<style scoped></style>
