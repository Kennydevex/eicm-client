<template>
  <div class="relative group" @mouseover="showMenu()" @mouseleave="hideMenu()">
    <a
      @focus="showMenu()"
      @keydown.shift.tab="hideMenu()"
      @keydown.esc.exact="hideMenu()"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
      class="block uppercase text-normal px-3 py-2 mt-1 text-gray-800 font-semibold rounded hover:bg-gray-300 hover:text-primary group-hover:bg-gray-300 group-hover:text-primary  sm:mt-0 sm:ml-2"
    >
      <slot></slot>
    </a>

    <div class="absolute w-full">&nbsp;</div>

    <transition name="fade">
      <div
        v-if="isVisible"
        class="mega-menu absolute normal-case font-normal bg-white shadow-lg rounded-lg overflow-hidden border w-full sm:w-160 mt-4 sm:right-0 z-10"
      >
        <div class="flex flex-col lg:flex-row p-6 border-b -mx-4">
          <template v-for="(item, i) in filterBy(items, true, 'mega')">
            <div class="w-full sm:w-1/2 p-3 sm:px-4" :key="'menu_item_' + i">
              <ul>
                <li class="mb-4" @click.prevent="hideMenu()">
                  <nuxt-link
                    class="flex group"
                    :to="item.href"
                    @keydown.esc.exact="hideMenu()"
                  >
                    <span>
                      <Icon
                        size="32"
                        class="text-primary group-hover:text-gray-900"
                        :type="item.icon"
                      />
                    </span>

                    <span class="ml-3">
                      <span
                        class="block font-bold text-gray-800 group-hover:text-gray-900 uppercase"
                        >{{ item.name }}</span
                      >
                      <span
                        class="block text-sm text-gray-500 group-hover:text-gray-600"
                        >{{ item.description }}</span
                      >
                    </span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </template>
        </div>

        <ul class="bg-gray-200 p-5">
          <li
            class="mb-4"
            v-for="(item, i) in filterBy(items, false, 'mega')"
            :key="'menu_item_' + i"
            @click.prevent="hideMenu()"
          >
            <nuxt-link class="flex items-center group" :to="item.href">
              <Icon
                size="16"
                class=" text-gray-800 group-hover:text-primary"
                type="item.icon"
              />
              <span
                class="block ml-1 font-normal text-gray-800 group-hover:text-primary"
                >{{ item.name }}</span
              >
              <span
                class="block ml-2 text-xs group-hover:text-sm text-gray-600  group-hover:text-gray-800"
                >{{ item.description }}</span
              >
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue2Filters from "vue2-filters";

export default {
  name: "MegaMenu",
  props: ["items"],
  mixins: [Vue2Filters.mixin],

  mounted() {
    this.menuItems = document.querySelectorAll(".mega-menu a");
  },
  data() {
    return {
      isVisible: false,
      menuItems: null,
      focusedIndex: 0
    };
  },

  methods: {
    goToPage(link) {
      this.redirectToPage(link);
      this.hideMenu();
    },
    showMenu() {
      this.isVisible = true;
    },

    startArrowKeys() {
      this.menuItems[0].focus();
    },

    hideMenu() {
      this.isVisible = false;
    },
    toggleMenu() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
