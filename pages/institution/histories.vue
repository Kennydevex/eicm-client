<template>
  <div>
    <div>
      <history-header :title="'História da Escola'"></history-header>
    </div>
    <div class="container m-auto">
      <div class="mt-8 flex flex-col" v-if="history">
        <div class=" bg-white shadow-xl rounded-lg p-6">
          <div
            class="pb-3 mb-3 text-primary uppercase text-xl font-bold text-justify tracking-wide border-b"
          >
            História da EICM-GDC
          </div>
          <div
            class="text-gray-800 text-base tracking-wide leading-relaxed text-justify"
          >
            {{ history }}
          </div>
        </div>

        <div class=" my-8 bg-white shadow-xl rounded-lg p-6">
          <div
            class="pb-3 mb-3 text-primary uppercase text-xl font-bold tracking-wide"
          >
            Marcos Históricos
          </div>
          <div v-if="marks.length > 0">
            <Timeline>
              <TimelineItem v-for="(mark, m) in marks" :key="m" color="#3E4095">
                <Icon type="ios-cube" slot="dot"></Icon>
                <div class="ml-6">
                  <p
                    class="font-bold text-base tracking-tight text-gray-600 mb-3"
                  >
                    {{ $moment(mark.begin).format("LL") }}
                    <Icon
                      class=" text-gray-600 mx-2"
                      type="md-arrow-round-forward"
                    />
                    {{ $moment(mark.end).format("LL") }}
                  </p>
                  <div class="p-6 border-2 border-gray-300 rounded-lg">
                    <h3 class="font-semibold pb-2 text-lg text-gray-700">
                      {{ mark.designation }}
                    </h3>
                    <p
                      class="text-base text-gray-700 text-justify antialiased tracking-wide leading-snug"
                    >
                      {{ mark.content }}
                    </p>
                  </div>
                </div>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
    <home-footer :bgColor="'#F3F4F6'"></home-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Histories",
  layout: "landing",

  computed: {
    ...mapGetters({
      marks: "schools/marks",
      history: "schools/history"
    })
  },
  components: {
    HistoryHeader: () => import("@/components/frontend/sections/HistoryHeader"),
    HomeFooter: () => import("@/components/frontend/sections/HomeFooter")
  },
  methods: {}
};
</script>
