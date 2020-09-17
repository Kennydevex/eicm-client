<template>
  <div>
    <div>
      <course-header :course="course.name"></course-header>
    </div>

    <div class="container m-auto px-3">
      <div
        class="pt-3 pb-8 text-xl text-gray-700 tracking-wide leading-tight uppercase"
      >
        Apresentação Geral do Curso
      </div>

      <div class="pl-8 pb-2">
        <span
          class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 capitalize"
          ><Icon type="ios-calendar-outline" />
          {{ $moment(course.release).format("ll") }}</span
        >
        <span
          class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          ><Icon type="ios-folder-open-outline" />
          {{
            course.category === 1
              ? "Curso Via Técnica"
              : course.category == 2
              ? "Formação Profissional"
              : course.category == 3
              ? "ACP"
              : "Outros"
          }}</span
        >
        <span
          class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          ><Icon type="ios-clock-outline" /> {{ course.duration }} Anos</span
        >
      </div>

      <div>
        <div class="ml-8 mr-3 mb-5">
          <p
            class="text-gray-700 leading-loose border-l-2 border-gray-500 pl-3 text-justify tracking-wide antialiased text-base select-none"
          >
            {{ course.description }}
          </p>
        </div>
      </div>

      <div
        class="pt-3 pb-8 text-xl text-gray-700 tracking-wide leading-tight uppercase"
      >
        Requisitos
      </div>

      <div class="ml-8 mb-5">
        <Collapse accordion v-model="value1">
          <Panel name="1">
            <span class="uppercase font-semibold text-md">
              Condições de Acesso ao Curso
            </span>
            <p slot="content" class="tracking-wide antialiased leading-loose">
              {{ course.requirement }}
            </p>
          </Panel>
          <Panel name="2">
            <span class="uppercase font-semibold text-md">
              Saídas
            </span>
            <div slot="content">
              <Collapse accordion v-model="value4">
                <Panel name="2-1">
                  Saídas Profissionais
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
                <Panel name="2-2">
                  Saídas Académicas
                  <div slot="content" class="mx-3">
                    <ul class="list-disc">
                      <li
                        class="mb-3"
                        v-for="(outcome, i) in filterBy(
                          course.outcomes,
                          1,
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
              </Collapse>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";

export default {
  name: "CourseInfo",
  layout: "landing",
  mixins: [Vue2Filters.mixin],

  data: function() {
    return {
      value1: "1",
      value3: "2",
      value4: "2-1"
    };
  },
  methods: {},

  //   created() {
  //     console.log(this.$store.getters.courses);
  //   },

  computed: {
    ...mapGetters({
      courses: "courses/courses"
    }),

    course() {
      if (this.courses.length > 0)
        return this.courses.find(
          course => course.slug === this.$route.params.slug
        );
      return;
    }
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

<style scoped></style>
