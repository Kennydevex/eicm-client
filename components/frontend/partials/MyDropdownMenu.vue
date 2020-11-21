<template>
  <div class="relative group">
    <a
      href="#"
      class="block uppercase text-normal px-3 py-2 mt-1 text-gray-800 font-semibold rounded group-hover:text-primary group-hover:bg-gray-300 active:bg-gray-300 active:text-primary hover:bg-gray-300 hover:text-primary sm:mt-0 sm:ml-2"
      @click="toggleVisibility"
      @keydown.space.exact.prevent="toggleVisibility"
      @keydown.esc.exact="hideDropdown"
      @keydown.shift.tab="hideDropdown"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
    >
      <slot></slot>
      <Icon :type="isVisible ? 'ios-arrow-up' : 'ios-arrow-down'" />
    </a>
    <transition name="dropdown-fade">
      <ul
        v-on-clickaway="hideDropdown"
        v-if="isVisible"
        ref="dropdown"
        class="z-10 absolute uppercase xs:left-0 lg:right-0 bg-gray-100 shadow-2xl overflow-hidden w-64 mt-2 -pl-1 py-2 pr-3 lg:z-20 rounded-b"
      >
        <li
          v-for="(item, i) in dropdown_items"
          :key="i"
          :class="item.divider ? 'border-b border-gray-400' : ''"
          @click.prevent="hideDropdown"
        >
          <nuxt-link
            :to="item.href"
            class="flex items-center p-3 text-gray-800 text-sm tracking-wide font-semibold hover:bg-primary hover:text-white hover:rounded-r-lg"

            @keydown.up.exact.prevent="i == 0 ? '' : focusPrevious(true)"
            @keydown.tab.exact="focusNext(false)"
            @keydown.shift.tab="i == 0 ? '' : focusPrevious(false)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="hideDropdown"
          >
            <span class="ml-2"
              ><Icon v-if="item.icon" size="18" :type="item.icon" />
              {{ item.name }}</span
            ></nuxt-link
          >
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  name:'MyDropdownMenu',
  mixins: [clickaway],
  props: ["dropdown_items"],
  data() {
    return {
      isVisible: false,
      focusedIndex: 0
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    hideDropdown() {
      console.log("esta tudo aqui");
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
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.1s ease-in-out;
}
.dropdown-fade-enter,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
