<template>
  <div
      :class="darkColor ? 'text-gray-100' : 'text-gray-700'"

    class="text-center text-2xl leading-tight tracking-wide font-sans uppercase"
  >
    <span :class="darkColor ? 'text-gray-300' : ' border-primary'" class="border-l-2 px-4 rounded-b-lg">
      <slot></slot>
    </span>
    <!--<div class="border-b-4 border-gray-500 w-1/12 m-auto mt-4"></div>--></div>
  </div>
</template>

<script>
export default {
  props: {
    darkColor: {
      type: Boolean,
      default: false
    }
  }
};
</script>

