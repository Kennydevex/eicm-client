<template>
  <div class="mb-8">
    <div>
      <general-page-header :title="'Sobre a Instituição'"></general-page-header>
    </div>

    <div class="container m-auto px-3">
      <div class="flex flex-col justify-center items-center">
        <div
          class="mt-8 text-lg capitalize font-semibold text-gray-800 tracking-wide text-center leading-tight"
        >
          Escola industrial e Comercial do Mindelo -
          <span>Guilherme Dias Chantre</span>
        </div>
        <div
          class="mb-8 p-3 bg-gray-300 w-32 rounded-full text-center font-bold text-gray-700 text-sm uppercase tracking-widest"
        >
          EICM-GDC
        </div>

        <Divider size="small"></Divider>

        <div>
          <p
            class="text-center px-4 md:px-24 text-base leading-relaxed tracking-wide text-gray-800"
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit lacinia leo,
            integer nunc condimentum arcu malesuada lectus fringilla vestibulum,
            parturient viverra a fusce nulla nisl velit turpis. Justo parturient
            quis fusce congue pretium ultrices nisi odio auctor accumsan, aenean
            semper ac elementum porta conubia vulputate non in euismod, nam
            aliquet dis mus tellus inceptos praesent cum dapibus. Vel nisi
            volutpat diam mauris rutrum imperdiet, morbi molestie felis
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  layout: "landing",

  data: function() {
    return {};
  },
  methods: {},
  components: {
    GeneralPageHeader: () => import("@/views/sections/GeneralPageHeader")
  }
};
</script>

<style scoped></style>
