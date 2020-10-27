<template>
  <div>
    <div class="m-2 overflow-hidden">
      <div class="float-right">
        <Page ref="pag" @on-change="changePage()" :total="100" :current="current_page"></Page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["data_source"],
  data() {
    return {
      current_page: this.data_source.meta.current_page,
      last_page: this.data_source.meta.last_page
    };
  },

  watch: {
    current_page(newVal, oldVal) {
    //   console.log("veja la"+this.refs.pag);
      //   this.$emit("paginate", newVal);
    }
  },

  methods: {
    changePage(p) {
      console.log("yesye" + p);
      console.log("veja la"+this.$refs.pag.current);

    }
  }
};
</script>

<style lang="scss" scoped></style>
