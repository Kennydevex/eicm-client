<template>
  <div class="justify-center w-full py-12 overflow-x-hidden bg-white">
    <div class="container px-3 mx-auto ">
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
                class="overflow-hidden bg-white border-4 border-white rounded-lg shadow-xl "
              >
                <AppMaps />
              </div>
            </Col>
            <Col :xs="{ span: 24, order: 1 }" :md="{ span: 12, order: 2 }">
              <div
                class="p-5 mt-3 transition duration-500 ease-in-out transform border rounded-lg shadow-lg rotate-6 hover:rotate-3 hover:shadow-2xl md:m-5"
              >
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
