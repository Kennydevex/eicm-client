<template>
  <div class="container m-auto">
    <Row>
      <Col :xs="24" :md="12"> <contact-map /></Col>
      <Col :xs="24" :md="12">teste</Col>
    </Row>
  </div>
</template>

<script>
import ContactMap from "@/views/sections/ContactMap";
export default {
  name: "ContactPage",
  layout: "landing",
  components: {
    ContactMap
  }
};
</script>

<style lang="scss" scoped></style>
