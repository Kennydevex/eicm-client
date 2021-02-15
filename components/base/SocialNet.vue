<template>
  <div>
    <ShareNetwork
      v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :url="siteURL + $route.path"
      :title="title"
      :description="description"
      :quote="'EICM-GDC'"
      :hashtags="hashtags"
      :twitterUser="'eicm_gdc'"
    >
      <span class="mr-2">
        <el-button
          :style="{ backgroundColor: network.color }"
          class="my-1 text-gray-100 rounded-lg"
          :size="button"
          :icon="network.icon"
          >{{ network.name }}</el-button
        >
      </span>
    </ShareNetwork>
  </div>
</template>

<script>
import networks from "@/api/networks";

export default {
  props: {
    title: {
      type: String
    },

    description: {
      type: String
    },
    hashtags: {
      type: String
    },
    button: {
      type: String,
      default: "large"
    }
  },

  data() {
    return {
      networks: networks
    };
  }
};
</script>

<style lang="scss" scoped></style>
