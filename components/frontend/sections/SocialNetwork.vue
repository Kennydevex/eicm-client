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
      <span class="mr-4">
        <Button
          :style="{ backgroundColor: network.color }"
          class="text-gray-100 rounded-lg shadow-xl my-1"
          size="large"
          :icon="network.icon"
          >{{ network.name }}</Button
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
