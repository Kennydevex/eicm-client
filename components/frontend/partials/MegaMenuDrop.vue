<template>
  <div class="relative">
    <a
      href="#"
      class="block uppercase text-normal px-3 py-2 mt-1 text-gray-800 font-semibold rounded active:bg-gray-300 active:text-primary hover:bg-gray-300 hover:text-primary sm:mt-0 sm:ml-2"
      @click="toggleVisibility"
      @keydown.space.exact.prevent="toggleVisibility"
      @keydown.esc.exact="hideMenu"
      @keydown.shift.tab="hideMenu"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
    >
      <slot></slot>
      <Icon :type="isVisible ? 'ios-arrow-up' : 'ios-arrow-down'" />
    </a>
    <transition name="fade">
      <div
        v-on-clickaway="hideMenu"
        v-if="isVisible"
        ref="dropdown"
        class="absolute normal-case font-normal bg-white shadow-lg rounded-lg overflow-hidden border w-full sm:w-160 mt-1 sm:right-0 z-10"
      >
        <div class="flex flex-col lg:flex-row p-6 border-b -mx-4">
          <template
            v-for="(item, i) in filterBy(mega_menu_items, true, 'mega')"
          >
            <div class="w-full sm:w-1/2 p-3 sm:px-4" :key="'menu_item_' + i">
              <ul>
                <li class="mb-4" @click.prevent="hideMenu()">
                  <nuxt-link
                    class="flex group"
                    :to="item.href"
                    @keydown.up.exact.prevent="
                      i == 0 ? '' : focusPrevious(true)
                    "
                    @keydown.tab.exact="focusNext(false)"
                    @keydown.shift.tab="i == 0 ? '' : focusPrevious(false)"
                    @keydown.down.exact.prevent="focusNext(true)"
                    @keydown.esc.exact="hideMenu"
                  >
                    <span>
                      <Icon
                        size="44"
                        class="text-primary group-hover:text-gray-900"
                        :type="item.icon"
                      />
                    </span>

                    <span class="ml-3">
                      <span
                        class="block text-base font-bold text-primary group-hover:text-gray-700 uppercase"
                        >{{ item.name }}</span
                      >
                      <span
                        class="mt-2 block text-md text-gray-500 group-hover:text-gray-600"
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
            v-for="(item, i) in filterBy(mega_menu_items, false, 'mega')"
            :key="'menu_item_' + i"
            @click.prevent="hideMenu()"
          >
            <nuxt-link class="flex items-center group" :to="item.href">
              <Icon
                size="16"
                class=" text-gray-800 group-hover:text-primary"
                :type="item.icon"
              />
              <span
                class="block ml-1 font-normal text-gray-800 group-hover:text-primary"
                >{{ item.name }}</span
              >
              <span
                class="block ml-2 text-xs text-gray-600  group-hover:text-gray-700"
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
import { mixin as clickaway } from "vue-clickaway";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [clickaway, Vue2Filters.mixin],
  props: ["mega_menu_items"],
  data() {
    return {
      isVisible: false,
      focusedIndex: 0
    };
  },
  methods: {
    goToPage(link) {
      this.redirectToPage(link);
      this.hideMenu();
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    hideMenu() {
      this.isVisible = false;
      this.focusedIndex = 0;
    },
    startArrowKeys() {
      if (this.isVisible) {
        // this.$refs.account.focus()
        this.$refs.dropdown.children[0].children[0].focus();
      }
    },
    focusPrevious(isArrowKey) {
      this.focusedIndex = this.focusedIndex - 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusNext(isArrowKey) {
      this.focusedIndex = this.focusedIndex + 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusItem() {
      this.$refs.dropdown.children[this.focusedIndex].children[0].focus();
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
