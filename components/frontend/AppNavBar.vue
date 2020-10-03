<template>
  <header
    class="border-t-4 border-primary bg-white z-10 w-full shadow-md sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-5"
  >
    <div class=" flex justify-between items-center px-4 py-5 sm:p-0">
      <!--Nav left-->
      <div>
        <nuxt-link to=""
          ><span
            class="uppercase text-primary self-end text-2xl tracking-wide font-bold"
            >EICM-GDC</span
          ></nuxt-link
        >
      </div>

      <!--Nav right-->
      <div class="sm:hidden">
        <button
          @click="isOpen = !isOpen"
          class="block px-2 py-1 border-2 rounded text-gray-700 focus:border-gray-700 hover:text-primary hover:border-primary"
        >
          <Icon
            size="32"
            class="text-gray-600 hover:text-primary"
            :type="isOpen ? 'md-close' : 'md-menu'"
          />
        </button>
      </div>
    </div>

    <div
      :class="!isOpen ? 'hidden' : 'block'"
      class="px-1 pt-2 pb-6 sm:p-0 sm:flex"
    >
      <div>
        <nuxt-link
          class="block uppercase text-normal px-3 py-2 text-gray-800 font-semibold rounded hover:bg-gray-300 hover:text-primary active:bg-gray-300 active:text-primary"
          to="/"
          >Início</nuxt-link
        >
      </div>

      <div>
        <dropdown-menu :dropdown_items="institutions"
          >Instituição</dropdown-menu
        >
      </div>
      <div>
        <mega-menu :items="courses">Cursos e Formações</mega-menu>
      </div>
      <div>
        <nuxt-link
          class="block uppercase text-normal px-3 py-2 mt-1 text-gray-800 font-semibold rounded hover:bg-gray-300 hover:text-primary sm:mt-0 sm:ml-2"
          to=""
          >Contactos</nuxt-link
        >
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
      menuOpen: false,
      isOpen: false,
      institutions: [
        { name: "Sobre", href: "/institution/about", divider: false },
        { name: "História", href: "/institution/histories", divider: false },
        {
          name: "Corpo Diretivo",
          href: "/institution/team",
          divider: false
        }
      ],
      courses: [
        {
          name: "Cursos da Via Tecnica",
          description:
            "Curso para quem pretende comcluir o ensino secubdário, com dupla certificação, podendo prosseguir com o ensino superior ou empregar-se",
          icon: "ios-school-outline",
          href: "/courses/tecnics",
          mega: true
        },
        {
          name: "Formação Profissional",
          description:
            "Destinado para quem pretente adequirir e/ou aprofeiçoar as competências para melhor responder aos desafios do mercado de trabalho",
          icon: "ios-build-outline",
          href: "/courses/profissional",
          mega: true
        },
        {
          name: "ACP",
          description: "Ano Compementar Profissionalizante",
          icon: "md-briefcase",
          href: "/courses/acp",
          mega: false
        },
        {
          name: "Outros",
          description: "Outros cursos de curta/média duração",
          icon: "ios-pricetag",
          href: "/courses/others",
          mega: false
        }
      ]
    };
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  },

  components: {
    MegaMenu: () => import("@/components/frontend/partials/MegaMenu"),
    DropdownMenu: () => import("@/components/frontend/partials/DropdownMenu")
  }
};
</script>

<style lang="scss" scoped></style>
