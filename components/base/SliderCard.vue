<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img
      class="w-full"
      :src="`${publicURL}/uploads/sliders/background/${slider.background}`"
      alt="Sunset in the mountains"
    />
    <div class="px-6 py-3 border-b">
      <div class="font-bold text-sm mb-2">{{ slider.title }}</div>
      <!--<p class="text-gray-700 text-base">{{ description | truncate(100) }}</p>-->
    </div>
    <div class="p-4 flex justify-end">
      <div>
        <Tooltip
          :content="slider.status ? 'Desativar Slider' : 'Ativar Slider?'"
        >
          <Button
            :type="slider.status ? 'success' : 'warning'"
            ghost
            @click="onSliderActivation()"
            :loading="activating[slider.id]"
            size="small"
            >{{ slider.status ? "Publicado" : "Desativado" }}</Button
          >
        </Tooltip>

        <Button
          @click="onUpdate()"
          :loading="updating[slider.id]"
          size="small"
          icon="md-create"
          type="primary"
        ></Button>

        <Button
          @click="onDelete()"
          :loading="deleting[slider.id]"
          size="small"
          icon="md-trash"
          type="error"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slider: {
      type: Object,
      default: () => {
        return {};
      }
    },

    deleting: {
      type: Object,
      default: () => {
        return {};
      }
    },

    updating: {
      type: Object,
      default: () => {
        return {};
      }
    },
    activating: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  methods: {
    onUpdate() {
      this.$emit("onUpdate");
    },
    onDelete() {
      this.$emit("onDelete");
    },

    onSliderActivation() {
      this.$emit("onSliderActivation");
    }
  }
};
</script>

<style lang="scss" scoped></style>
