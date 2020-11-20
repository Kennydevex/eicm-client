<template>
  <div>
    <Row>
      <!-- Cabeçalho -->
      <Col span="24">
        <div class="relative mx-auto overflow-hidden shadow-2xl border-b">
          <!--<div
            class="ribbon z-10 flex items-center justify-center bg-red-500 text-sm whitespace-no-wrap px-2"
          >
            NOVO
          </div>-->

          <div class="h-96 mb-4 md:mb-0 w-full mx-auto relative">
            <div
              class="absolute left-0 bottom-0 w-full h-full"
              style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"
            ></div>
            <img
              :src="`${publicURL}/uploads/courses/covers/${course.cover}`"
              class="w-full h-full z-0 object-cover object-center"
            />

            <div
              class="absolute bottom-0 w-full flex-col justify-center pb-10"
            >
              <div class="w-full text-center">
                <span
                  class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2 rounded-sm font-semibold"
                  >{{ course.family.name }}</span
                >
                <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
                  {{ course.name }}
                </h2>

                <div class="mt-3" v-if="course.teachers.length > 0">
                  <Tooltip placement="right" content="Cordenador do curso">
                    <img
                      src="/teams/default.png"
                      class="h-10 w-10 rounded-full mr-2 object-cover bg-white p-2"
                    />
                  </Tooltip>

                  <div>
                    <p class="font-semibold text-gray-200 text-sm">
                      {{ course.teachers[0].employee.person.name }}
                    </p>
                    <p class="font-semibold text-gray-400 text-xs">
                      Cordenador
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>

      <!-- Course Description -->
      <Col span="24">
        <div class="container m-auto px-3">
          <div class="my-8 bg-white p-8 rounded-lg shadow-xl border">
            <div
              :style="{ color: course.color }"
              class="pt-3 pb-3 mb-5 text-xl tracking-wide leading-tight uppercase font-semibold border-b-2"
            >
              Descrição Geral
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
              class="pt-3 pb-3 text-xl tracking-wide leading-tight uppercase font-semibold"
            >
              Perfil
            </div>

            <div class="ml-8 mb-5">
              <Collapse accordion v-model="requirements" class="border">
                <Panel name="requirements" class="bg-white py-3">
                  <span class="uppercase font-semibold text-md text-gray-800">
                    Condições de Acesso
                  </span>
                  <div slot="content">
                    <div
                      class="text-base tracking-wide m-5 leading-relaxed text-gray-700"
                    >
                      {{ course.requirement }}
                    </div>
                  </div>
                </Panel>
                <Panel name="outcomes" class="bg-white py-3">
                  <span class="uppercase font-semibold text-md text-gray-800">
                    Perfil de saída
                  </span>
                  <div slot="content">
                    <Collapse accordion v-model="course_outcomes">
                      <Panel name="profissional" class="bg-white py-3">
                        <span class="uppercase text-sm font-semibold"
                          >Saídas Profissionais</span
                        >
                        <div slot="content" class="mx-3">
                          <List>
                            <ListItem
                              v-for="(outcome, i) in filterBy(
                                course.outcomes,
                                2,
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
                class="pt-3 pb-3 text-xl tracking-wide leading-tight uppercase font-semibold"
              >
                Disciplinas
              </div>

              <div class="ml-8 mb-5">
                <div
                  class="font-semibold text-gray-700 tracking-wide pb-2 text-xl"
                >
                  Disciplinas Gerais
                </div>
                <Collapse accordion v-model="course_geral_disciplines">
                  <template
                    v-for="(discipline, d) in orderBy(
                      filterBy(course.disciplines, 1, 'type'),
                      'attribution.academic_year'
                    )"
                  >
                    <Panel
                      :name="`${discipline.id}`"
                      :key="d"
                      class="bg-white py-3"
                    >
                      <span
                        class="uppercase font-semibold text-md text-gray-800"
                      >
                        {{ discipline.name }}
                      </span>
                      <span
                        class="text-xs px-3 font-semibold py-1 uppercase ml-2 bg-gray-500 text-gray-100 rounded-full"
                        >{{ discipline.attribution.academic_year }} Ano</span
                      >
                      <div slot="content">
                        <div class="flex flex-col justify-center p-2">
                          <div
                            class="text-base tracking-wide leading-relaxed text-gray-700"
                          >
                            {{ discipline.description?discipline.description:'Sem descrição' }}
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
                <Collapse accordion v-model="course_tecnics_disciplines">
                  <template
                    v-for="(discipline, d) in orderBy(
                      filterBy(course.disciplines, 2, 'type'),
                      'attribution.academic_year'
                    )"
                  >
                    <Panel
                      :name="`${discipline.id}`"
                      :key="d"
                      class="bg-white py-3"
                    >
                      <span
                        class="uppercase font-semibold text-md text-gray-800"
                      >
                        {{ discipline.name }}
                      </span>
                      <span
                        class="text-xs px-3 font-semibold py-1 uppercase ml-2 bg-gray-500 text-gray-100 rounded-full"
                        >{{ discipline.attribution.academic_year }} Ano</span
                      >
                      <div slot="content">
                        <div class="flex flex-col justify-center p-5">
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

            <div
              :style="{ color: course.color }"
              class="pt-3 pb-3 mb-5 text-xl tracking-wide leading-tight uppercase font-semibold border-b-2"
            >
              Outras Informações
            </div>

            <div class="ml-8 mb-5 flex justify-between">
              <div>
                <span class="text-gray-700 font-semibold "
                  >Data de lançamento:</span
                >
                <span class="font-bold text-lg tracking-wider">{{
                  $moment(course.release).format("ll")
                }}</span>
              </div>

              <div>
                <span class="text-gray-700 font-semibold ">Grupo:</span>
                <span class="font-bold text-lg tracking-wider">
                  {{ course.departament.name }}
                </span>
              </div>

              <div>
                <span class="text-gray-700 font-semibold "
                  >Familia Profissional</span
                >
                <span class="font-bold text-lg tracking-wider">
                  {{ course.family.name }}
                </span>
              </div>
              <div>
                <span class="text-gray-700 font-semibold ">Duração:</span>
                <span class="font-bold text-lg tracking-wider"
                  >{{ course.duration }}
                  {{
                    course.duration_type == 1
                      ? "Dias"
                      : course.duration_type == 2
                      ? "Meses"
                      : "Anos"
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col span="24">
        <div class="container m-auto px-3">
          <div
            class="p-5 rounded-lg bg-white shadow-xl border flex flex-col justify-center mb-8"
          >
            <div
              class="text-2xl leading-snug tracking-wide text-gray-700 border-b w-full text-center pb-5"
            >
              Partilhar com amigos e familiares
            </div>
            <div class="py-5 text-center">
              <social-network
                :title="course.name"
                :description="course.presentation"
                :hashtags="course.family.name"
              ></social-network>
            </div>
          </div>
        </div>
      </Col>
    </Row>

    <!-- component -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue2Filters from "vue2-filters";
import SocialNetwork from "@/components/frontend/sections/SocialNetwork";

export default {
  name: "CourseInfo",
  layout: "landing",
  mixins: [Vue2Filters.mixin],

  async fetch({ store, params }) {
    await store.dispatch("courses/getCourse", params.slug);
  },

  head() {
    return {
      title: this.course.name,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.course.presentation
        },
        { hid: "og:title", name: "og:title", content: this.course.name },
        {
          hid: "og:description",
          name: "og:description",
          content: this.course.presentation
        },
        {
          hid: "og:image",
          name: "og:image",
          content: `${process.env.PUBLIC_URL}/uploads/courses/couvers/${this.course.cover}`
        },
        { hid: "og:type", name: "og:type", content: "article" },
        {
          hide: "twitter:card",
          name: "twitter:card",
          content: this.course.cover ? "summary_large_image" : "summary"
        }
      ].filter(x => x.content)
    };
  },

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
    CourseHeader: () => import("@/views/sections/CourseHeader"),
    SocialNetwork
  }
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
