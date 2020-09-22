<template>
  <div>
    <div
      class="m-3 overflow-hidden  border-4 rounded-lg shadow-lg border-gray-200"
    >
      <contact-map />
    </div>

    <div class="container m-auto py-12">
      <Row>
        <Col :xs="24" :md="12">
          <div class="flex flex-col justify-center items-start p-3">
            <div class="text-2xl text-gray-800 uppercase tracking-wide mb-2">
              Contactos
            </div>
            <div class="text-sm text-gray-700 tracking-wide leading-relaxed">
              Contactar a Escola atraves das seguintes informações de contactosI
            </div>

            <Divider></Divider>

            <div class="pl-5">
              <div class="pb-4">
                <h3 class="text-base text-gray-800 tracking-wide ">
                  <Icon type="md-mail" /> eicm.gdc@gmail.com
                </h3>

                <small class="text-gray-700 tracking-wide"
                  >Esmial da escola</small
                >
              </div>

              <div class="pb-4">
                <h3 class="text-base text-gray-800 tracking-wide ">
                  <Icon type="md-call" /> +238 9657384
                </h3>

                <small class="text-gray-700 tracking-wide"
                  >Telefone da escola</small
                >
              </div>

              <div class="pb-4">
                <h3 class="text-base text-gray-800 tracking-wide ">
                  <Icon type="md-call" /> +238 9657384
                </h3>

                <small class="text-gray-700 tracking-wide"
                  >Telefone da secreteria</small
                >
              </div>

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
        <Col :xs="24" :md="12">
          <div class="text-2xl text-gray-800 uppercase tracking-wide mb-2">
            Contactar a Instituição
          </div>
          <div class="text-sm text-gray-700 tracking-wide leading-relaxed">
            Envie a mensagem diretamente para a direção da escola atraves dos
            campos apresentados a seguir
          </div>
          <Divider></Divider>

          <div class="p-3">
            <contact-form></contact-form>
          </div>
        </Col>
      </Row>
    </div>

    <PrincipalFooter />
  </div>
</template>

<script>
import ContactMap from "@/components/frontend/sections/ContactMap";
import ContactForm from "@/components/frontend/ContactForm";
import PrincipalFooter from "@/components/frontend/sections/PrincipalFooter";

export default {
  name: "ContactPage",
  layout: "landing",
  components: {
    ContactMap,
    ContactForm,
    PrincipalFooter
  }
};
</script>

<style lang="scss" scoped></style>
