<template>
  <div>
    <Row>
      <Col span="24">
        <p>
          {{ description }}
        </p>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    description: String
  }
};
</script>