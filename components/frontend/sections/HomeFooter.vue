<template>
  <footer class="bg-gray-800">
    <svg
      class="-mb-12 wave-top"
      viewBox="0 0 1439 147"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-1.000000, -10.000000)" fill-rule="nonzero">
          <g class="wave" :fill="bgColor">
            <path
              d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
            ></path>
          </g>
          <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
            <g
              transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) "
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                opacity="0.200000003"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>

    <div class="container px-6 pt-10 pb-6 mx-auto">
      <div
        class="flex flex-row items-center justify-center py-5 border-b-2 border-gray-700"
      >
        <div
          class="flex items-center justify-center w-10 h-10 p-2 mx-5 bg-gray-400 rounded-full shadow-2xl group hover:bg-gray-100"
        >
          <a
            href="https://web.facebook.com/escolatecnicadomindeloGDC"
            target="_blank"
            class="text-primary group-hover:text-gray-700"
          >
            <Icon size="18" type="logo-facebook" />
          </a>
        </div>
        <div
          class="flex items-center justify-center w-10 h-10 p-2 mx-5 bg-gray-400 rounded-full shadow-2xl group hover:bg-gray-100"
        >
          <a href="#" class="text-primary group-hover:text-gray-700">
            <Icon size="18" type="logo-twitter" />
          </a>
        </div>
        <div
          class="flex items-center justify-center w-10 h-10 p-2 mx-5 bg-gray-400 rounded-full shadow-2xl group hover:bg-gray-100"
        >
          <a href="#" class="text-primary group-hover:text-gray-700">
            <Icon size="18" type="logo-linkedin" />
          </a>
        </div>
      </div>
      <div class="flex flex-wrap mt-5">
        <div class="w-full text-center md:w-1/4 md:text-left">
          <h5 class="mb-6 font-bold text-gray-400 uppercase">Contactos</h5>
          <ul class="mb-4">
            <li class="mt-2">
              <a
                href="#"
                class="text-gray-600 hover:underline hover:text-primary"
              >
                <span><Icon size="18" type="ios-call" /> (+238) 232 32 45</span>
              </a>
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="text-gray-600 hover:underline hover:text-primary"
              >
                <span
                  ><Icon size="18" type="ios-mail" /> eicm-gdc@gmail.com</span
                >
              </a>
            </li>

            <li class="mt-2">
              <a
                href="#"
                class="text-gray-600 hover:underline hover:text-primary"
              >
                <span
                  ><Icon size="18" type="ios-map" /> Cabo Verde, São Vicente,
                  Mindelo</span
                >
              </a>
            </li>
          </ul>
        </div>
        <div class="w-full text-center md:w-1/4 md:text-left">
          <h5 class="mb-6 font-bold text-gray-400 uppercase">
            Cursos da Via Técnica
          </h5>
          <ul class="mb-4">
            <li class="mt-2" v-for="(course, c) in courses" :key="c">
              <a
                href="#"
                class="leading-tight text-gray-600 hover:underline hover:text-gray-300"
                >{{ course.name }}</a
              >
            </li>
          </ul>
        </div>
        <!--<div class="w-full text-center md:w-1/4 md:text-left">
          <h5 class="mb-6 font-bold text-gray-400 uppercase">Instituição</h5>
          <ul class="mb-4">
            <li class="mt-2">
              <nuxt-link
                :to="{ name: 'institution-about' }"
                class="text-gray-600 hover:underline hover:text-gray-300"
                >Sobre a Instituição</nuxt-link
              >
            </li>
            <li class="mt-2">
              <nuxt-link
                :to="{ name: 'institution-histories' }"
                class="text-gray-600 hover:underline hover:text-gray-300"
                >História e marcos históricos</nuxt-link
              >
            </li>
            <li class="mt-2">
              <nuxt-link
                :to="{ name: 'institution-team' }"
                class="text-gray-600 hover:underline hover:text-gray-300"
                >Corpo Diretivo</nuxt-link
              >
            </li>
          </ul>
        </div>-->
        <div class="w-full text-center md:w-1/4 md:text-left">
          <h5 class="mb-6 font-bold text-gray-400 uppercase">
            Ligações Externas
          </h5>
          <ul class="mb-4">
            <li class="mt-2">
              <a
                href="#"
                class="text-gray-600 hover:underline hover:text-gray-300"
                >Sistema Nacional de Qualificações</a
              >
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="text-gray-600 hover:underline hover:text-gray-300"
                >UNICV</a
              >
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="text-gray-600 hover:underline hover:text-gray-300"
                >Ministério de Educação</a
              >
            </li>
          </ul>
        </div>
        <div class="w-full text-center md:w-1/4 md:text-left">
          <h5 class="mb-6 font-bold text-gray-400 uppercase">Parceiros</h5>
          <ul class="mb-4">
            <li class="mt-2" v-for="partner in partners" :key="partner.id">
              <a
                :href="partner.link"
                target="_blank"
                class="text-gray-600 hover:underline hover:text-gray-300"
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
  props: {
    bgColor: {
      type: String,
      default: "#ffffff"
    },

  },
  computed: {
    ...mapGetters({
      courses: "courses/courses_by_type",
      partners: "partners/partners"
    })
  }
};
</script>

<style lang="scss" scoped></style>
