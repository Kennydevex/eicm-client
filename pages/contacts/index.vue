<template>
  <div>
    <div class="my-8 ">
      <div class="container m-auto">
        <div class="overflow-hidden bg-white rounded-lg shadow-lg">
          <Row>
            <Col span="24">
              <contact-map />
            </Col>
          </Row>
          <Row class="p-8 mt-5">
            <Col :xs="{ span: 24, order: 2 }" :md="{ span: 12, order: 1 }">
              <div class="flex flex-col items-start justify-center p-3">
                <div class="text-xl tracking-wide text-primary">
                  Contactos
                </div>
                <div
                  class="my-3 text-sm leading-relaxed tracking-wide text-gray-600"
                >
                  Contacte a escola atraves das seguintes informações de
                  contactos.
                </div>

                <div class="w-full pt-8 pl-5 border-t">
                  <template v-for="(contact, c) in contacts">
                    <div class="pb-4" :key="'contact_' + c">
                      <h3 class="text-base tracking-wide text-gray-700 ">
                        <Icon
                          :type="contact.type == 2 ? 'md-mail' : 'md-call'"
                        />
                        {{ contact.contact }}
                      </h3>

                      <small class="tracking-wide text-gray-600">{{
                        contact.description
                      }}</small>
                    </div>
                  </template>

                  <div class="pb-4">
                    <h3 class="text-base tracking-wide text-gray-800 ">
                      <Icon type="md-pin" /> Cabo Verde, São Vicente, Mindelo,
                      Laginha
                    </h3>

                    <small class="tracking-wide text-gray-700"
                      >Localização Geografica</small
                    >
                  </div>
                </div>
              </div>
            </Col>
            <Col :xs="{ span: 24, order: 1 }" :md="{ span: 12, order: 2 }">
              <div class="flex flex-col items-start justify-center p-3">
                <div class="text-xl tracking-wide text-primary">
                  Contactar a Escola
                </div>
                <div
                  class="my-3 text-sm leading-relaxed tracking-wide text-gray-600"
                >
                  Envie a mensagem diretamente para a direção da escola atraves
                  do formulário apresentado a seguir
                </div>

                <div class="pt-8 border-t ">
                  <contact-form></contact-form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <home-footer :bgColor="'#F3F4F6'"></home-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContactPage",
  layout: "landing",
  components: {
    ContactForm: () => import("@/components/frontend/ContactForm"),
    ContactMap: () => import("@/components/frontend/sections/ContactMap"),
    HomeFooter: () => import("@/components/frontend/sections/HomeFooter")
  },
  computed: {
    ...mapGetters({
      contacts: "schools/contacts",
      location: "schools/location"
    })
  }
};
</script>

<style lang="scss" scoped></style>
