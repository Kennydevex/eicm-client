<template>
  <div class="relative group">
    <a
      href="#"
      class="block px-3 py-2 mt-1 text-gray-800 uppercase rounded text-normal border-transparent border-b-2 group-hover:text-primary group-hover:border-primary active:border-primary active:text-primary transition duration-500 ease-in-out hover:border-primary hover:text-primary sm:mt-0 sm:ml-2"
      @click="toggleVisibility"
      @keydown.space.exact.prevent="toggleVisibility"
      @keydown.esc.exact="hideDropdown"
      @keydown.shift.tab="hideDropdown"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
    >
      <slot></slot>
      <i :class="isVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
    </a>
    <transition name="dropdown-fade">
      <ul
        v-on-clickaway="hideDropdown"
        v-if="isVisible"
        ref="dropdown"
        class="absolute z-10 w-64 py-2 pr-3 mt-2 overflow-hidden uppercase bg-gray-100 rounded-b shadow-2xl xs:left-0 lg:right-0 -pl-1 lg:z-20"
      >
        <li
          v-for="(item, i) in dropdown_items"
          :key="i"
          :class="item.divider ? 'border-b border-gray-400' : ''"
          @click.prevent="hideDropdown"
        >
          <nuxt-link
            :to="item.href"
            class="flex items-center p-3 text-sm font-semibold tracking-wide text-gray-800 hover:bg-primary hover:text-white hover:rounded-r-lg"
            @keydown.up.exact.prevent="i == 0 ? '' : focusPrevious(true)"
            @keydown.tab.exact="focusNext(false)"
            @keydown.shift.tab="i == 0 ? '' : focusPrevious(false)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="hideDropdown"
          >
            <span class="ml-2">
              <i v-if="item.icon" :class="item.icon"></i>
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
  name: "MyDropdownMenu",
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
