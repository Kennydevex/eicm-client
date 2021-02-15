<template>
  <div>
    <div>
      <core-landing-page-header>História da Escola</core-landing-page-header>
    </div>
    <div class="container m-auto">
      <div class="flex flex-col mt-8" v-if="history">
        <div class="p-6 bg-white">
          <div
            class="pb-3 mb-3 text-xl font-bold tracking-wide text-center text-gray-700 uppercase border-b"
          >
            História da EICM-GDC
          </div>
          <div
            class="text-base leading-relaxed tracking-wide text-justify text-gray-800"
          >
            {{ history }}
          </div>
        </div>

        <div class="p-6">
          <div
            class="pb-3 mb-3 text-xl font-bold tracking-wide text-center text-gray-700 uppercase"
          >
            Marcos Históricos
          </div>

          <div
            v-if="marks.length > 0"
            class="flex items-center justify-center "
          >
            <div class="max-w-xl">
              <el-timeline>
                <el-timeline-item
                  v-for="(mark, m) in marks"
                  color="#3E4095"
                  :timestamp="
                    `${$moment(mark.begin).format('L')} - ${$moment(
                      mark.end
                    ).format('L')}`
                  "
                  placement="top"
                  size="large"
                  :key="m"
                >
                  <el-card>
                    <h3 class="pb-2 text-md text-primary">
                      {{ mark.designation }}
                    </h3>
                    <p
                      class="antialiased leading-normal tracking-wide text-justify text-gray-700 text-md"
                    >
                      {{ mark.content }}
                    </p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
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

  methods: {}
};
</script>
