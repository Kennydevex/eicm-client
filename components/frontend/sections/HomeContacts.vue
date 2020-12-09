<template>
  <div class="bg-gray-200 w-full py-12 justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex" :gutter="16">
        <Col span="24" class="mb-5">
          <base-home-section-title>Contactos</base-home-section-title>
        </Col>

        <Col span="24" class="mt-3">
          <!--<div data-aos="fade-right">
            Contactos
          </div>-->
          <Row type="flex" justify="center" align="middle" :gutter="16">
            <Col :xs="{ span: 24, order: 2 }" :md="{ span: 12, order: 1 }">
              <div
                class=" rounded-lg bg-white shadow-xl overflow-hidden border-4 border-white"
              >
                <AppMaps />
              </div>
            </Col>
            <Col :xs="{ span: 24, order: 1 }" :md="{ span: 12, order: 2 }">
              <div class=" p-5 rounded-lg border  mt-3  md:m-5">
                <ContactForm />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeContacts",
  data() {
    return {
      pauseOnHover: true,
      internalAutoPlaying: true
    };
  },
  components: {
    AppMaps: () => import("@/components/frontend/AppMaps"),
    ContactForm: () => import("@/components/frontend/ContactForm")
  }
};
</script>
