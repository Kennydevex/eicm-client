<template>
  <div>
    <div class="my-8 ">
      <div class="container m-auto">
        <div class="overflow-hidden bg-white rounded-lg shadow-lg">
          <el-row>
            <el-col>
              <coreMaps />
            </el-col>
          </el-row>
          <el-row class="p-8 mt-5">
            <el-col class="order-2 md:order-1" :xs="24" :md="12">
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
            </el-col>
            <el-col class="order-2 md:order-1" :xs="24" :md="12">
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
                  <coreFormsToContact />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContactPage",
  layout: "landing",
  computed: {
    ...mapGetters({
      contacts: "schools/contacts",
      location: "schools/location"
    })
  }
};
</script>

<style lang="scss" scoped></style>
