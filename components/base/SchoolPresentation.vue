<template>
  <div class="bg-white shadow-xl border rounded-lg overflow-hidden">
    <img
      class="w-full h-56 object-cover object-center"
      :src="`${publicURL}/uploads/schools/covers/${school.cover}`"
      alt="Capa da escola"
    />

    <div class="flex items-center justify-end px-6 py-3 bg-gray-900">
      <Button
        @click="onUpdate(school.id)"
        type="text"
        class="mr-2 text-gray-200 hover:text-gray-800"
        icon="md-create"
      >Editar</Button>
    </div>

    <div class="py-4 px-6">
      <h1 class="text-xl font-semibold text-gray-800">{{ school.abbr }}</h1>
      <p class="py-2 text-md text-gray-700">
        {{ school.name }}
      </p>
      <div class="flex items-center mt-4 text-gray-700">
        <Icon size="24" type="ios-add" />
        <h1 class="px-2 text-sm">234 Followers</h1>
      </div>
      <div class="flex items-center mt-4 text-gray-700">
        <Icon size="24" type="ios-add" />

        <h1 class="px-2 text-sm">Locatiol</h1>
      </div>
      <div class="flex items-center mt-4 text-gray-700">
        <Icon size="24" type="ios-add" />

        <h1 class="px-2 text-sm">Link</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["school"],

  methods: {
    onUpdate(id) {
      this.$emit("onUpdate", id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
