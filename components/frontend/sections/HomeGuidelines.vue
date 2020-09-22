<template>
  <Row>
    <Col span="24">
      <div
        class="container mx-auto flex flex-col md:flex-row py-8 items-center justify-evenly"
      >
        <div>
          <div class="bg-transparent p-6">
            <div class="flex justify-center">
              <Icon size="70" color="grey" type="ios-briefcase-outline" />
            </div>
            <div class="text-center">
              <div class="my-3">
                <h2 class="text-lg text-green-900">Missão</h2>
              </div>
              <div class="text-grey-800">Descrição deste diretriz</div>
            </div>
          </div>
        </div>

        <div>
          <div class="bg-transparent p-6">
            <div class="flex justify-center">
              <Icon size="70" type="ios-eye" />
            </div>
            <div class="text-center">
              <div class="my-3">
                <h2 class="text-lg text-green-900">Missão</h2>
              </div>
              <div class="text-grey-800">Descrição deste diretriz</div>
            </div>
          </div>
        </div>

        <div>
          <div class="bg-transparent p-6">
            <div class="flex justify-center">
              <Icon size="70" color type="ios-heart-outline" />
            </div>
            <div class="text-center">
              <div class="my-3">
                <h2 class="text-lg text-green-900">Missão</h2>
              </div>
              <div class="text-grey-800">Descrição deste diretriz</div>
            </div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
</template>

<script>
export default {
  name: "HomeGuidelines",
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>
