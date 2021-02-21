<template>
  <header
    class="z-10 w-full bg-white shadow-md sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-5"
  >
    <div class="flex items-center justify-between px-4 py-5 sm:p-0">
      <!--Nav left-->
      <div>
        <nuxt-link to=""
          ><span
            class="self-end text-2xl font-bold tracking-wide uppercase text-primary"
            >EICM-GDC</span
          ></nuxt-link
        >
      </div>

      <!--Nav right-->
      <div class="sm:hidden">
        <el-button
          @click="isOpen = !isOpen"
          class="block px-2 py-1 text-gray-700 border-2 rounded focus:border-gray-700 hover:text-primary hover:border-primary"
        >
          <i
            :class="isOpen ? 'el-icon-close' : 'el-icon-s-fold'"
            class="text-lg text-gray-600 hover:text-primary"
          ></i>
        </el-button>
      </div>
    </div>

    <div
      :class="!isOpen ? 'hidden' : 'block'"
      class="px-1 pt-2 pb-6 sm:p-0 sm:flex"
    >
      <div>
        <nuxt-link
          class="block px-3 py-2 font-semibold text-gray-800 uppercase rounded text-normal hover:bg-gray-300 hover:text-primary active:bg-gray-300 active:text-primary"
          to="/"
          >Início</nuxt-link
        >
      </div>

      <div>
        <coreLandingSimpleDropdown :dropdown_items="institutions"
          >Instituição</coreLandingSimpleDropdown
        >
      </div>

      <div>
        <coreLandingMegaDropdown :mega_menu_items="courses"
          >Cursos e Formações</coreLandingMegaDropdown
        >
      </div>

      <div>
        <nuxt-link
          class="block px-3 py-2 mt-1 font-semibold text-gray-800 uppercase rounded text-normal hover:bg-gray-300 hover:text-primary sm:mt-0 sm:ml-2"
          :to="{ name: 'contacts' }"
          >Contactos</nuxt-link
        >
      </div>

      <div>
        <nuxt-link
          class="block px-3 py-2 mt-1 font-semibold text-gray-800 uppercase rounded text-normal hover:bg-gray-300 hover:text-primary sm:mt-0 sm:ml-2"
          :to="{ name: 'blog' }"
          >EICM Blog</nuxt-link
        >
      </div>

      <div v-if="authenticated">
        <coreLandingAccountMenu></coreLandingAccountMenu>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",

  data() {
    return {
      menuOpen: false,
      isOpen: false,

      institutions: [
        { name: "Sobre", href: "/instituicao/sobre", divider: false },
        { name: "História", href: "/instituicao/historias", divider: false },
        {
          name: "Corpo Diretivo",
          href: "/instituicao/equipe",
          divider: false
        }
      ],
      courses: [
        {
          name: "Cursos da Via Tecnica",
          description:
            "Curso para quem pretende comcluir o ensino secubdário, com dupla certificação, podendo prosseguir com o ensino superior ou empregar-se",
          icon: "ios-school",
          href: {
            name: "courses-courses",
            params: { courses: "cursos_via_tecnica" }
          },
          mega: true
        },
        {
          name: "Formação Profissional",
          description:
            "Destinado para quem pretente adequirir e/ou aprofeiçoar as competências para melhor responder aos desafios do mercado de trabalho",
          icon: "ios-build",
          href: {
            name: "courses-courses",
            params: { courses: "formacoes_profissionais" }
          },
          mega: true
        },
        {
          name: "ACP",
          description: "Ano Compementar Profissionalizante",
          icon: "md-briefcase",
          href: { name: "courses-courses", params: { courses: "acp" } },

          mega: false
        },
        {
          name: "Outros",
          description: "Outros cursos de curta/média duração",
          icon: "ios-pricetag",
          href: { name: "courses-courses", params: { courses: "outros" } },

          mega: false
        }
      ]
    };
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style lang="scss" scoped></style>
