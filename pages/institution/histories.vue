<template>
  <div>
    <div>
      <history-header :title="'Sobre a Instituição'"></history-header>
    </div>
    <div class="container m-auto px-3">
      <div class="mt-8 flex flex-col">
        <div class=" bg-white shadow-xl rounded-lg p-6">
          <div
            class="pb-5 text-gray-800 uppercase text-3xl font-semibold tracking-wider"
          >
            História da EICM-GDC
          </div>
          <div
            class="text-gray-800 text-base tracking-wide leading-relaxed text-justify"
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit, fringilla
            sapien ullamcorper faucibus consequat nullam nisl magnis, netus
            aenean tristique gravida suspendisse morbi. At penatibus duis
            parturient aptent enim orci molestie ridiculus, auctor accumsan
            imperdiet ullamcorper vulputate turpis augue etiam leo, diam lacus
            praesent pellentesque posuere fermentum quis. Habitasse curabitur
            libero ante dictum fames ullamcorper porttitor nulla tempor egestas,
            facilisi purus vivamus fusce massa congue platea blandit duis
            mauris,
          </div>
        </div>

        <div class=" my-12 bg-white shadow-xl rounded-lg p-6">
          <div
            class="pb-5 text-gray-800 uppercase text-3xl font-semibold tracking-wider"
          >
            Marcos Históricos
          </div>
          <div>
            <Timeline>
              <TimelineItem v-for="(mark, m) in marks" :key="m" color="green">
                <div class="ml-6">
                  <p
                    class="font-bold text-base tracking-tight text-gray-600 mb-3 capitalize"
                  >
                    {{ $moment(mark.begin).format("ll") }} -
                    {{ $moment(mark.end).format("ll") }}
                  </p>
                  <div class="p-4 border rounded-lg">
                    <h3
                      class="font-semibold pb-2 text-base uppercase text-gray-800"
                    >
                      {{ mark.designation }}
                    </h3>
                    <p class="text-lg tracking-wide leading-snug">
                      {{ mark.description }}
                    </p>
                  </div>
                </div>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Histories",
  layout: "landing",

  data: function() {
    return {
      marks: [
        {
          designation: "Ultima direção",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit massa nullam ultrices praesent ullamcorper posuere, et vel felis vehicula ornare",
          begin: "2000-04-04",
          end: "2000-04-04"
        },
        {
          designation: "Ultima direção",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit massa nullam ultrices praesent ullamcorper posuere, et vel felis vehicula ornare",
          begin: "2000-04-04",
          end: "2000-04-04"
        },
        {
          designation: "Ultima direção",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit massa nullam ultrices praesent ullamcorper posuere, et vel felis vehicula ornare",
          begin: "2000-04-04",
          end: "2000-04-04"
        },
        {
          designation: "Ultima direção",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit massa nullam ultrices praesent ullamcorper posuere, et vel felis vehicula ornare",
          begin: "2000-04-04",
          end: "2000-04-04"
        },
        {
          designation: "Ultima direção",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit massa nullam ultrices praesent ullamcorper posuere, et vel felis vehicula ornare",
          begin: "2000-04-04",
          end: "2000-04-04"
        }
      ]
    };
  },
  components: {
    HistoryHeader: () => import("@/components/frontend/sections/HistoryHeader")
  },
  methods: {}
};
</script>
