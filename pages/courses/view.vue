<template>
  <div>
    <el-row>
      <el-col>
        <div class="container m-auto">
          <el-row :gutter="16">
            <el-col>
              <div class="mt-8 overflow-hidden rounded-lg shadow-lg">
                <CourseInfoHeader :course="course" />
              </div>
            </el-col>

            <el-col :span="24" :xs="24" :md="16">
              <div class="p-8 my-8 bg-white border rounded-lg">
                <div
                  :style="{ color: course.color }"
                  class="pb-3 mb-5 font-semibold leading-tight tracking-wide uppercase border-b text-md sm:text-lg"
                >
                  Descrição Geral
                </div>
                <div
                  class="pb-2 text-xs font-normal text-gray-400 uppercase rounded-lg sm:font-semibold"
                >
                  <span class="inline-block py-1 mb-2 mr-2 "
                    ><el-icon size="14" class="el-calendar" />
                    {{ $moment(course.release).format("ll") }}</span
                  >
                  <span class="inline-block py-1 mb-2 mr-2"
                    ><el-icon size="14" class="el-icon-folder" />
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
                  <span class="inline-block py-1 mb-2 mr-2"
                    ><el-icon size="14" class="el-clock" />
                    {{ course.duration }}
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
                  <div class="mb-3">
                    <p
                      class="pl-3 text-sm antialiased leading-loose tracking-wide text-justify text-gray-700 border-l border-gray-300"
                    >
                      {{ course.presentation }}
                    </p>
                  </div>
                </div>

                <div
                  :style="{ color: course.color }"
                  class="pt-3 pb-3 mb-5 font-semibold leading-tight tracking-wide uppercase border-b text-md sm:text-lg"
                >
                  Perfil
                </div>

                <div class="mb-3 ml-0 sm:ml-8">
                  <el-collapse accordion v-model="requirements">
                    <el-collapse-item name="requirements">
                      <template slot="title">
                        <div>
                          <span
                            class="text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-sm"
                          >
                            Condições de Acesso
                          </span>
                        </div>
                      </template>

                      <div>
                        <div
                          class="m-1 text-sm leading-loose tracking-wide text-gray-700"
                        >
                          {{ course.requirement }}
                        </div>
                      </div>
                    </el-collapse-item>

                    <el-collapse-item name="outcomes">
                      <template slot="title">
                        <div>
                          <span
                            class="text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-sm"
                          >
                            Perfil de saída
                          </span>
                        </div>
                      </template>

                      <div>
                        <el-collapse accordion class="ml-5">
                          <el-collapse-item name="profissional">
                            <template slot="title">
                              <div>
                                <span
                                  class="text-xs font-medium tracking-wide text-gray-600 sm:text-sm"
                                >
                                  Saída Profissional
                                </span>
                              </div>
                            </template>

                            <div>
                              <ul>
                                <li
                                  class="mb-8"
                                  v-for="(outcome, i) in filterBy(
                                    course.outcomes,
                                    2,
                                    'type'
                                  )"
                                  :key="i"
                                >
                                  <div>
                                    <div
                                      class="text-sm font-semibold tracking-wide text-gray-600"
                                    >
                                      {{ outcome.name }}
                                    </div>
                                    <div
                                      class="mt-2 text-sm leading-relaxed tracking-wide text-gray-600"
                                    >
                                      {{ outcome.description }}
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </el-collapse-item>

                          <el-collapse-item name="academics">
                            <template slot="title">
                              <div>
                                <span
                                  class="text-xs font-medium tracking-wide text-gray-600 sm:text-sm"
                                >
                                  Saída Académica
                                </span>
                              </div>
                            </template>

                            <div>
                              <ul>
                                <li
                                  class="mb-5"
                                  v-for="(outcome, i) in filterBy(
                                    course.outcomes,
                                    1,
                                    'type'
                                  )"
                                  :key="i"
                                >
                                  <div>
                                    <div
                                      class="text-sm font-semibold tracking-wide text-gray-600"
                                    >
                                      {{ outcome.name }}
                                    </div>
                                    <div
                                      class="mt-2 text-sm leading-relaxed tracking-wide text-gray-600"
                                    >
                                      {{ outcome.description }}
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </el-collapse-item>
                        </el-collapse>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>

                <template v-if="course.disciplines.length > 0">
                  <div
                    :style="{ color: course.color }"
                    class="pt-3 pb-3 mb-5 font-semibold leading-tight tracking-wide uppercase border-b text-md sm:text-lg"
                  >
                    Disciplinas
                  </div>

                  <div class="mb-5 ml-8">
                    <div
                      class="mb-3 text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-sm"
                    >
                      Disciplinas Gerais
                    </div>
                    <el-collapse accordion v-model="course_geral_disciplines">
                      <template
                        v-for="(discipline, d) in orderBy(
                          filterBy(course.disciplines, 1, 'type'),
                          'attribution.academic_year'
                        )"
                      >
                        <el-collapse-item :name="`${discipline.id}`" :key="d">
                          <div slot="title">
                            <span
                              class="text-xs font-semibold tracking-wide text-gray-500 sm:text-sm"
                            >
                              {{ discipline.name }}
                            </span>
                            <span
                              class="px-2 py-1 ml-2 text-xs font-semibold text-gray-400 bg-gray-100 rounded-md"
                              >{{ discipline.attribution.academic_year }}º
                              Ano</span
                            >
                          </div>
                          <div>
                            <div class="flex flex-col justify-center p-2">
                              <div
                                class="text-sm leading-relaxed tracking-wide text-justify text-gray-600"
                              >
                                {{
                                  discipline.description
                                    ? discipline.description
                                    : "Sem descrição"
                                }}
                              </div>
                            </div>
                          </div>
                        </el-collapse-item>
                      </template>
                    </el-collapse>

                    <div
                      class="mt-4 mb-3 text-xs font-semibold tracking-wide text-gray-600 uppercase sm:text-sm"
                    >
                      Disciplinas Técnicas
                    </div>
                    <el-collapse accordion v-model="course_tecnics_disciplines">
                      <template
                        v-for="(discipline, d) in orderBy(
                          filterBy(course.disciplines, 2, 'type'),
                          'attribution.academic_year'
                        )"
                      >
                        <el-collapse-item :name="`${discipline.id}`" :key="d">
                          <div slot="title">
                            <span
                              class="text-xs font-semibold tracking-wide text-gray-500 sm:text-sm"
                            >
                              {{ discipline.name }}
                            </span>
                            <span
                              class="px-2 py-1 ml-2 text-xs font-semibold text-gray-400 bg-gray-100 rounded-md"
                              >{{ discipline.attribution.academic_year }}º
                              Ano</span
                            >
                          </div>
                          <div>
                            <div class="flex flex-col justify-center p-2">
                              <div
                                class="text-sm leading-relaxed tracking-wide text-justify text-gray-600"
                              >
                                {{ discipline.description }}
                              </div>
                            </div>
                          </div>
                        </el-collapse-item>
                      </template>
                    </el-collapse>
                  </div>
                </template>

                <Divider></Divider>

                <div>
                  <div class="mb-3">
                    <h2
                      class="text-sm tracking-wide text-center text-gray-600 md:text-left"
                    >
                      Partilhe com os amigos e familiares
                    </h2>
                  </div>
                  <div class="text-center md:text-left">
                    <SocialNet
                      :button="'small'"
                      :title="course.name"
                      :description="course.presentation"
                      :hashtags="'Cursos e formações profissionais'"
                    ></SocialNet>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="24" :xs="24" :md="8">
              <el-row class="mt-0 mb-5 md:mt-8">
                <el-col span="24">
                  <div class="p-5 text-gray-600 bg-white rounded-lg shadow-md">
                    Publicidades
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
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
  }
};
</script>

