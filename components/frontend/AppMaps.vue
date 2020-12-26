<template>
  <div>
    <client-only>
      <GmapMap
        :center="center"
        :zoom="9"
        map-type-id="roadmap"
        style="width: 100%; height: 300px"
      >
        <!--<gmap-cluster>-->
        <GmapMarker
          v-for="(m, index) in markers"
          :position="m.location"
          :key="index"
          :clickable="false"
          :draggable="false"
          @click="center = m.location"
        />
        <!--</gmap-cluster>-->
      </GmapMap>
    </client-only>
  </div>
</template>

<script>
// import GmapCluster from "gmap-vue/dist/components/cluster"; // replace dist with src if you have Babel issues

export default {
  data() {
    return {
      center: {
        lat: 16.892725,
        lng: -24.990694
      },
      markers: []
    };
  },

  async mounted() {
    await this.$gmapApiPromiseLazy();
    this.markers = [
      {
        location: new google.maps.LatLng({ lat: 16.892725, lng: -24.990694 }),
        weight: 100
      }
    ];
  }

  //   components: {
  //     GmapCluster
  //   }
};
</script>

<style lang="scss" scoped></style>
