<template>
  <div class="relative group">
    <a
      href="#"
      class="block uppercase text-normal mt-1 text-gray-800 font-semibold rounded-full group-hover:text-primary group-hover:bg-gray-300 active:bg-gray-300 active:text-primary hover:bg-gray-300 hover:text-primary sm:ml-2"
      @click="toggleVisibility"
      @keydown.space.exact.prevent="toggleVisibility"
      @keydown.esc.exact="hideDropdown"
      @keydown.shift.tab="hideDropdown"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
    >
      <Avatar size="small" icon="ios-person" />
    </a>

    <transition name="dropdown-fade">
      <ul
        v-on-clickaway="hideDropdown"
        v-if="isVisible"
        ref="dropdown"
        class="z-10 absolute normal-case font-normal xs:left-0 lg:right-0 bg-white shadow-2xl overflow-hidden rounded-sm w-32 border mt-2 py-1 lg:z-20"
      >
        <li @click.prevent="hideDropdown">
          <nuxt-link
            :to="'/user/perfil'"
            class="flex items-center px-2 py-2 text-gray-800 text-sm tracking-wide hover:bg-primary hover:text-white"
            @keydown.up.exact.prevent="i == 0 ? '' : focusPrevious(true)"
            @keydown.tab.exact="focusNext(false)"
            @keydown.shift.tab="i == 0 ? '' : focusPrevious(false)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="hideDropdown"
          >
            <span class="ml-2">
              <Icon size="16" type="ios-person" /> PERFIL</span
            ></nuxt-link
          >

          <nuxt-link
            :to="'/Admin'"
            class="flex items-center px-2 py-2 text-gray-800 text-sm tracking-wide hover:bg-primary hover:text-white"
            @keydown.up.exact.prevent="i == 0 ? '' : focusPrevious(true)"
            @keydown.tab.exact="focusNext(false)"
            @keydown.shift.tab="i == 0 ? '' : focusPrevious(false)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="hideDropdown"
          >
            <span class="ml-2">
              <Icon size="16" type="ios-cog" /> ADMIN</span
            ></nuxt-link
          >

          <a
            href="#"
            @click="logout"
            class="flex items-center px-2 py-2 text-gray-800 text-sm tracking-wide hover:bg-primary hover:text-white"
            @keydown.up.exact.prevent="i == 0 ? '' : focusPrevious(true)"
            @keydown.tab.exact="focusNext(false)"
            @keydown.shift.tab="i == 0 ? '' : focusPrevious(false)"
            @keydown.down.exact.prevent="focusNext(true)"
            @keydown.esc.exact="hideDropdown"
          >
            <span class="ml-2">
              <Icon type="ios-cog" />
              LOGOUT</span
            ></a
          >
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "UserDropdown",
  mixins: [clickaway],
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
