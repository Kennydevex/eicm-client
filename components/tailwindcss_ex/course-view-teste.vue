<template>
  <div class="container m-auto px-3">
    <!-- component -->
    <div class="mx-auto">
      <!-- header -->

      <div
        class="mb-4 md:mb-0 w-full mx-auto relative"
        style="height: 24em;"
      >
        <div
          class="absolute left-0 bottom-0 w-full h-full z-10"
          style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"
        ></div>
        <img
          src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          class="absolute left-0 top-0 w-full h-full z-0 object-cover"
        />
        <div class="p-4 absolute bottom-0 left-0 z-20">
          <a
            href="#"
            class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
            >Nutrition</a
          >
          <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
            Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales,
            massa et auctor.
          </h2>
          <div class="flex mt-3">
            <img
              src="https://randomuser.me/api/portraits/men/97.jpg"
              class="h-10 w-10 rounded-full mr-2 object-cover"
            />
            <div>
              <p class="font-semibold text-gray-200 text-sm">Mike Sullivan</p>
              <p class="font-semibold text-gray-400 text-xs">14 Aug</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5">
      <div class="mx-auto bg-gray-200">
        <!-- Carousel Body -->
        <div
          class="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl h-96"
          style="min-height: 19rem;"
        >
          <div
            class="relative w-full md:w-3/4 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            style="min-height: 19rem;"
          >
            <img
              class="absolute inset-0 w-full h-full object-cover object-center"
              :src="`${publicURL}/uploads/courses/covers/${course.cover}`"
              alt=""
            />
            <div
              class="absolute inset-0 w-full h-ful opacity-25"
              :style="{ backgroundColor: course.color }"
            ></div>
            <div
              class="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white"
            >
              <div
                class="font-bold text-4xl uppercase tracking-tight transform scale-y-125"
              >
                {{ course.name }}
              </div>
            </div>
          </div>
          <div
            class="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg"
          >
            <div class="p-12 md:pr-24 md:pl-16 md:py-12">
              <p class="text-gray-600 text-base">
                <strong class="text-gray-900" :style="{ color: course.color }"
                  >({{ course.abbr }})</strong
                >
                {{ course.presentation }}
              </p>
            </div>
            <svg
              class="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->

    <div class="">
      <div
        :style="{ color: course.color }"
        class="pt-3 pb-3 mb-5 text-xl tracking-wide leading-tight uppercase font-semibold border-b-2"
      >
        Descrição Geral do Curso
      </div>
      <div class="pl-8 pb-2 uppercase">
        <span
          class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          ><Icon size="18" type="md-calendar" />
          {{ $moment(course.release).format("ll") }}</span
        >
        <span
          class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          ><Icon size="18" type="md-folder" />
          {{
            course.type === 1
              ? "Curso Via Técnica"
              : course.type == 2
              ? "Formação Profissional"
              : course.type == 3
              ? "ACP"
              : "Outros"
          }}</span
        >
        <span
          class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          ><Icon size="18" type="md-clock" /> {{ course.duration }}
          {{
            course.duration_type == 1
              ? "Dias"
              : course.duration_type == 2
              ? "meses"
              : "Anos"
          }}</span
        >
      </div>

      <div>
        <div class="ml-8 mr-3 mb-5">
          <p
            class="text-gray-700 leading-loose border-l-2 border-gray-500 pl-3 text-justify tracking-wide antialiased text-base select-none"
          >
            {{ course.presentation }}
          </p>
        </div>
      </div>

      <div
        :style="{ color: course.color }"
        class="pt-3 pb-3 mb-5 text-xl tracking-wide leading-tight uppercase font-semibold border-b-2"
      >
        Requisitos
      </div>

      <div class="ml-8 mb-5">
        <Collapse accordion v-model="requirements" class="shadow-xl">
          <Panel name="requirements" class="bg-white py-3">
            <span class="uppercase font-semibold text-md">
              Condições de Acesso ao Curso
            </span>
            <div slot="content">
              <div
                class="flex flex-col justify-center  m-2 p-5 rounded-lg shadow-2xl"
              >
                <div
                  class="text-base tracking-wide pb-2 leading-relaxed text-gray-700"
                >
                  {{ course.requirement }}
                </div>
              </div>
            </div>
          </Panel>
          <Panel name="outcomes" class="bg-white py-3">
            <span class="uppercase font-semibold text-md">
              Saídas
            </span>
            <div slot="content">
              <Collapse accordion v-model="course_outcomes">
                <Panel name="profissional" class="bg-white py-3">
                  <span class="uppercase text-sm font-semibold"
                    >Saídas Profissionais</span
                  >
                  <div slot="content" class="mx-3">
                    <ul class="list-disc">
                      <li
                        class="mb-3"
                        v-for="(outcome, i) in filterBy(
                          course.outcomes,
                          2,
                          'type'
                        )"
                        :key="i"
                      >
                        <div class="font-semibold">
                          {{ outcome.name }}
                        </div>
                        <div>
                          {{ outcome.description }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </Panel>
                <Panel name="academics" class="bg-white py-3">
                  <span class="uppercase text-sm font-semibold"
                    >Saídas Académicas</span
                  >
                  <div slot="content" class="mx-3">
                    <List>
                      <ListItem
                        v-for="(outcome, i) in filterBy(
                          course.outcomes,
                          1,
                          'type'
                        )"
                        :key="i"
                      >
                        <div>
                          <div
                            class="text-gray-800 text-base font-semibold tracking-wide"
                          >
                            {{ outcome.name }}
                          </div>
                          <div
                            class="text-gray-500 text-sm leading-relaxed tracking-wide"
                          >
                            {{ outcome.description }}
                          </div>
                        </div>
                      </ListItem>
                    </List>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </Panel>
        </Collapse>
      </div>

      <template v-if="course.disciplines.length > 0">
        <div
          :style="{ color: course.color }"
          class="pt-3 pb-3 mb-5 text-xl tracking-wide leading-tight uppercase font-semibold border-b-2"
        >
          Disciplinas
        </div>

        <div class="ml-8 mb-5">
          <div class="font-semibold text-gray-700 tracking-wide pb-2 text-xl">
            Disciplinas Gerais
          </div>
          <Collapse
            simple
            accordion
            v-model="course_geral_disciplines"
            class="shadow-xl"
          >
            <template
              v-for="(discipline, d) in orderBy(
                filterBy(course.disciplines, 1, 'type'),
                'attribution.academic_year'
              )"
            >
              <Panel :name="`${discipline.id}`" :key="d" class="bg-white py-3">
                <span class="uppercase font-semibold text-md text-gray-800">
                  {{ discipline.name }}
                </span>
                <span
                  class="text-xs px-3 font-semibold py-1 uppercase ml-2 bg-gray-500 text-gray-100 rounded-full"
                  >{{ discipline.attribution.academic_year }} Ano</span
                >
                <div slot="content">
                  <div
                    class="flex flex-col justify-center  m-2 p-5 rounded-lg shadow-2xl"
                  >
                    <div
                      class="text-base tracking-wide pb-2 leading-relaxed text-gray-700 border-b"
                    >
                      {{ discipline.description }}
                    </div>
                    <div class="pt-3">
                      <div>tipo</div>
                    </div>
                  </div>
                </div>
              </Panel>
            </template>
          </Collapse>

          <div
            class="font-semibold text-gray-700 tracking-wide pb-2 pt-8 text-xl"
          >
            Disciplinas Técnicas
          </div>
          <Collapse
            accordion
            v-model="course_tecnics_disciplines"
            class="shadow-xl"
          >
            <template
              v-for="(discipline, d) in orderBy(
                filterBy(course.disciplines, 2, 'type'),
                'attribution.academic_year'
              )"
            >
              <Panel :name="`${discipline.id}`" :key="d" class="bg-white py-3">
                <span class="uppercase font-semibold text-md text-gray-800">
                  {{ discipline.name }}
                </span>
                <span
                  class="text-xs px-3 font-semibold py-1 uppercase ml-2 bg-gray-500 text-gray-100 rounded-full"
                  >{{ discipline.attribution.academic_year }} Ano</span
                >
                <div slot="content">
                  <div
                    class="flex flex-col justify-center  m-2 p-5 rounded-lg shadow-2xl"
                  >
                    <div
                      class="text-base tracking-wide pb-2 leading-relaxed text-gray-700 border-b"
                    >
                      {{ discipline.description }}
                    </div>
                    <div class="pt-3">
                      <div>tipo</div>
                    </div>
                  </div>
                </div>
              </Panel>
            </template>
          </Collapse>
        </div>
      </template>
    </div>

    <!-- component -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";

export default {
  name: "CourseInfo",
  layout: "landing",
  mixins: [Vue2Filters.mixin],

  async fetch({ store, params }) {
    await store.dispatch("courses/getCourse", params.slug);
  },

  // async created () {
  //   await this.$store.dispatch("courses/getCourse", this.$route.params.slug);

  // },

  data: function() {
    return {
      requirements: "1",
      course_outcomes: "profissional",
      course_disciplines: "",
      course_tecnics_disciplines: "",
      course_geral_disciplines: ""
    };
  },

  computed: {
    ...mapGetters({
      course: "courses/course"
    })
  },

  components: {
    CourseHeader: () => import("@/views/sections/CourseHeader")
  }

  //   computed: {
  //     courses() {
  //       return this.$store.getters.courses.courses;
  //     }
  //   }
};
</script>

<style scoped>
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 22px;
  margin-right: -50px;
  margin-top: 15px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Safari prior 9.0 */
  transform: rotate(45deg); /* Standard syntax */
}
</style>





















