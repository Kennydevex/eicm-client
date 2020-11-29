<template>
  <footer class="bg-gray-100">
    <div
      class="flex flex-row justify-center px-3 py-3 items-start border-b-2 border-gray-300"
    >
      <div
        class="flex justify-center items-center group mx-5 p-2 shadow-2xl rounded-full bg-gray-300 hover:bg-primary w-10 h-10"
      >
        <a
          href="https://web.facebook.com/escolatecnicadomindeloGDC"
          target="_blank"
          class="text-primary group-hover:text-white"
        >
          <Icon size="18" type="logo-facebook" />
        </a>
      </div>
      <div
        class="flex justify-center items-center group mx-5 p-2 shadow-2xl rounded-full bg-gray-300 hover:bg-primary w-10 h-10"
      >
        <a href="#" class="text-primary group-hover:text-white">
          <Icon size="18" type="logo-twitter" />
        </a>
      </div>
      <div
        class="flex justify-center items-center group mx-5 p-2 shadow-2xl rounded-full bg-gray-300 hover:bg-primary w-10 h-10"
      >
        <a href="#" class="text-primary group-hover:text-white">
          <Icon size="18" type="logo-linkedin" />
        </a>
      </div>
    </div>
    <div class="container mx-auto px-6 pt-10 pb-6">
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/4 text-center md:text-left">
          <h5 class="uppercase mb-6 font-bold text-gray-800">Contactos</h5>
          <ul class="mb-4">
            <li class="mt-2">
              <a
                href="#"
                class="hover:underline text-gray-600 hover:text-primary"
              >
                <span><Icon size="18" type="ios-call" /> (+238) 232 32 45</span>
              </a>
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="hover:underline text-gray-600 hover:text-primary"
              >
                <span
                  ><Icon size="18" type="ios-mail" /> eicm-gdc@gmail.com</span
                >
              </a>
            </li>

            <li class="mt-2">
              <a
                href="#"
                class="hover:underline text-gray-600 hover:text-primary"
              >
                <span
                  ><Icon size="18" type="ios-map" /> Cabo Verde, São Vicente,
                  Mindelo</span
                >
              </a>
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/4 text-center md:text-left">
          <h5 class="uppercase mb-6 font-bold text-gray-800">
            Cursos da Via Técnica
          </h5>
          <ul class="mb-4">
            <li class="mt-2" v-for="(course, c) in courses" :key="c">
              <a
                href="#"
                class="hover:underline text-gray-600 hover:text-primary leading-tight"
                >{{ course.name }}</a
              >
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/4 text-center md:text-left">
          <h5 class="uppercase mb-6 font-bold text-gray-800">Instituição</h5>
          <ul class="mb-4">
            <li class="mt-2">
              <nuxt-link
                :to="{ name: 'institution-about' }"
                class="hover:underline text-gray-600 hover:text-primary"
                >Sobre a Instituição</nuxt-link
              >
            </li>
            <li class="mt-2">
              <nuxt-link
                :to="{ name: 'institution-histories' }"
                class="hover:underline text-gray-600 hover:text-primary"
                >História e marcos históricos</nuxt-link
              >
            </li>
            <li class="mt-2">
              <nuxt-link
                :to="{ name: 'institution-team' }"
                class="hover:underline text-gray-600 hover:text-primary"
                >Corpo Diretivo</nuxt-link
              >
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/4 text-center md:text-left">
          <h5 class="uppercase mb-6 font-bold text-gray-800">
            Ligações Externas
          </h5>
          <ul class="mb-4">
            <li class="mt-2">
              <a
                href="#"
                class="hover:underline text-gray-600 hover:text-primary"
                >Sistema Nacional de Qualificações</a
              >
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="hover:underline text-gray-600 hover:text-primary"
                >UNICV</a
              >
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="hover:underline text-gray-600 hover:text-primary"
                >Ministério de Educação</a
              >
            </li>
          </ul>
        </div>
        <div class="w-full md:w-1/4 text-center md:text-left">
          <h5 class="uppercase mb-6 font-bold text-gray-800">Parceiros</h5>
          <ul class="mb-4">
            <li class="mt-2" v-for="partner in partners" :key="partner.id">
              <a
                :href="partner.link"
                target="_blank"
                class="hover:underline text-gray-600 hover:text-primary"
                >{{ partner.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      courses: "courses/courses_by_type",
      partners: "partners/partners"
    })
  }
};
</script>

<style lang="scss" scoped></style>
