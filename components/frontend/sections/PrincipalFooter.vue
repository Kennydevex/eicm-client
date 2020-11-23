<template>
  <div class="bg-gray-700">
    <div class="container m-auto px-3">
      <Row>
        <Col :xs="24" :md="8" class="p-6">
          <div>
            <div
              class="pb-5 mb-3 text-gray-400 font-medium text-center uppercase tracking-widest font-sans"
            >
              <span class="text-lg">Contactos</span>
            </div>
            <div
              class="flex flex-col text-gray-300 m-auto text-center md:text-left"
            >
              <div
                class="border-b-2 border-gray-600 pb-3 mb-3 text-justify text-gray-500 font-sans text-sm antialiased font-normal tracking-tight leading-relaxed"
              >
                {{ courses }} cursos Lorem ipsum dolor sit amet consectetur
                adipiscing elit dictumst, turpis nullam pulvinar metus nostra
                posuere donec convallis.
              </div>

              <div class="text-base pb-3 text-gray-400">
                <Icon class="pr-1" size="16" type="md-mail" />
                <span class="font-normal font-serif font-italic tracking-wide"
                  >eicmgdc@gmail.com</span
                >
              </div>

              <div class="text-base pb-3 text-gray-400">
                <Icon class="pr-1" size="16" type="md-call" />
                <span class="font-normal font-serif font-italic tracking-wide"
                  >(+238) 232 25 64</span
                >
              </div>

              <div class="text-base pb-3 text-gray-400">
                <Icon class="pr-1" size="16" type="md-map" />
                <span class="font-normal font-serif font-italic tracking-wide"
                  >Cabo Verde, SV, Mindelo, Laginha</span
                >
              </div>
            </div>
          </div>
        </Col>

        <Col :xs="24" :md="8" class="p-6">
          <div>
            <div
              class="pb-5 mb-3 text-gray-400 font-medium text-center uppercase tracking-widest font-sans"
            >
              <span class="text-lg">Cursos</span>
            </div>
            <div>
              <div class="text-center flex flex-col ">
                <ul>
                  <li class="pb-1">
                    <nuxt-link
                      class=" text-gray-500 text-xs tracking-widest font-sans"
                      to=""
                      >Contabilidade</nuxt-link
                    >

                    <nuxt-link
                      class=" text-gray-500 text-xs tracking-widest font-sans"
                      to=""
                      >Electricidade</nuxt-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>

        <Col :xs="24" :md="8" class="p-6">
          <div>
            <div
              class="pb-5 mb-3 text-gray-400 font-medium text-center uppercase tracking-widest font-sans"
            >
              <span class="text-lg">Ligações externas</span>
            </div>
            <div>
              <div class="text-center flex flex-col ">
                <ul>
                  <li class="pb-1">
                    <nuxt-link
                      class=" text-gray-500 text-xs tracking-widest font-sans"
                      to=""
                      >Ministério de Educação</nuxt-link
                    >
                  </li>
                  <li class="pb-1">
                    <nuxt-link
                      class=" text-gray-500 text-xs tracking-widest font-sans"
                      to=""
                      >Ministério de Educação</nuxt-link
                    >
                  </li>
                  <li class="pb-1">
                    <nuxt-link
                      class=" text-gray-500 text-xs tracking-widest font-sans"
                      to=""
                      >Ministério de Educação</nuxt-link
                    >
                  </li>
                  <li class="pb-1">
                    <nuxt-link
                      class=" text-gray-500 text-xs tracking-widest font-sans"
                      to=""
                      >Ministério de Educação</nuxt-link
                    >
                  </li>
                  <li class="pb-1">
                    <nuxt-link
                      class=" text-gray-500 text-xs tracking-widest font-sans"
                      to=""
                      >Ministério de Educação</nuxt-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrincipalFooter"
};
</script>

<style lang="scss" scoped></style>
