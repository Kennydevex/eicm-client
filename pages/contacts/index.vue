<template>
  <div class="my-8 ">
    <div class="container m-auto  px-3">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <Row>
          <Col span="24">
            <contact-map />
          </Col>
        </Row>
        <Row class="mt-5 p-8">
          <Col :xs="{ span: 24, order: 2 }" :md="{ span: 12, order: 1 }">
            <div class="flex flex-col justify-center items-start p-3">
              <div class="text-xl text-primary tracking-wide">
                Contactos
              </div>
              <div
                class="my-3 text-sm text-gray-600 tracking-wide leading-relaxed"
              >
                Contacte a escola atraves das seguintes informações de
                contactos.
              </div>

              <div class="pt-8 pl-5 border-t w-full">
                <template v-for="(contact, c) in contacts">
                  <div class="pb-4" :key="'contact_' + c">
                    <h3 class="text-base text-gray-700 tracking-wide ">
                      <Icon :type="contact.type == 2 ? 'md-mail' : 'md-call'" />
                      {{ contact.contact }}
                    </h3>

                    <small class="text-gray-600 tracking-wide">{{
                      contact.description
                    }}</small>
                  </div>
                </template>

                <div class="pb-4">
                  <h3 class="text-base text-gray-800 tracking-wide ">
                    <Icon type="md-pin" /> Cabo Verde, São Vicente, Mindelo,
                    Laginha
                  </h3>

                  <small class="text-gray-700 tracking-wide"
                    >Localização Geografica</small
                  >
                </div>
              </div>
            </div>
          </Col>
          <Col :xs="{ span: 24, order: 1 }" :md="{ span: 12, order: 2 }">
            <div class="flex flex-col justify-center items-start p-3">
              <div class="text-xl text-primary tracking-wide">
                Contactar a Escola
              </div>
              <div
                class="my-3 text-sm text-gray-600 tracking-wide leading-relaxed"
              >
                Envie a mensagem diretamente para a direção da escola atraves do
                formulário apresentado a seguir
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
</template>

<script>
import ContactMap from "@/components/frontend/sections/ContactMap";
import ContactForm from "@/components/frontend/ContactForm";
import PrincipalFooter from "@/components/frontend/sections/PrincipalFooter";
import { mapGetters } from "vuex";

export default {
  name: "ContactPage",
  layout: "landing",
  components: {
    ContactMap,
    ContactForm,
    PrincipalFooter
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
