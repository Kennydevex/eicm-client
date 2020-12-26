<template>
  <div>
    <div class="container m-auto">
      <Row class="-mx-3" v-if="featured_courses.length > 0">
        <Col span="24" class="mt-5">
          <div class="overflow-hidden rounded-lg">
            <FeaturedCoursesSlider
              :courses="featured_courses"
            ></FeaturedCoursesSlider>
          </div>
        </Col>
      </Row>

      <Row :gutter="16" class="p-8 mt-5 mb-8 bg-white rounded-lg">
        <Col span="24" :xs="24" :lg="16">
          <div class="flex items-center justify-start w-full mb-8">
            <div
              class="text-xl antialiased font-semibold leading-relaxed tracking-wider text-gray-600 uppercase"
            >
              <span> {{ cousesType }} </span>
              <div
                class="w-1/3 mt-2 text-center border-b-4 border-primary"
              ></div>
            </div>
          </div>

          <template v-if="courses.length > 0">
            <template v-for="course in courses">
              <div class="my-4" :key="course.id">
                <base-course :course="course" />
              </div>
            </template>
          </template>

          <template v-else>
            <div>
              <Alert show-icon class="shadow-xl">
                Sem registo de cursos
                <template slot="desc"
                  >Nenhum cursos desta categoria registado.
                </template>
              </Alert>
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
              <social-network
                :button="'small'"
                :title="cousesType"
                :description="'Cursos da via técnica'"
                :hashtags="'Cursos e formações profissionais'"
              ></social-network>
            </div>
          </div>
        </Col>

        <Col span="24" :xs="24" :lg="8" class="mt-5 lg:mt-0">
          <div class="p-5 text-gray-700 bg-gray-200 rounded-lg shadow-lg">
            Publicidades
          </div>
        </Col>
      </Row>

      <!--<Row class="p-5 m-2 mb-8 bg-white rounded-lg" v-if="courses.length > 0">
      <Col span="24">
        <div>
          <h2
            class="font-semibold tracking-wide text-center text-gray-600 md:text-left"
          >
            Partilha estes cursos com os amigos ou familiares
          </h2>
        </div>
        <div class="py-5 text-center md:text-left">
          <social-network
            :title="cousesType"
            :description="'Cursos da via técnica'"
            :hashtags="'Cursos e formações profissionais'"
          ></social-network>
        </div>
      </Col>
    </Row>-->
    </div>
    <home-footer :bgColor="'#F3F4F6'"></home-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CoursesInfo",
  layout: "landing",

  head() {
    return {
      title: this.cousesType,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "Cursos oferecidos pela EICM-GDC"
        },
        { hid: "og:title", name: "og:title", content: this.cousesType },
        {
          hid: "og:description",
          name: "og:description",
          content: "Cursos oferecidos pela EICM-GDC"
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "/sliders/slide.jpg"
        },
        { hid: "og:type", name: "og:type", content: "article" },
        {
          hide: "twitter:card",
          name: "twitter:card",
          content: "summary"
          // content: this.article.cover ? "summary_large_image" : "summary"
        }
      ].filter(x => x.content)
    };
  },

  async fetch({ store, params }) {
    await store.dispatch("courses/getActivedCourses");
    await store.dispatch("courses/getFeaturedCourses");
    await store.dispatch(
      "courses/getCoursesByType",
      params.courses == "acp"
        ? 3
        : params.courses == "formacoes_profissionais"
        ? 2
        : params.courses == "cursos_via_tecnica"
        ? 1
        : 4
    );
  },

  data: function() {
    return {};
  },

  computed: {
    ...mapGetters({
      courses: "courses/courses_by_type",
      featured_courses: "courses/featured_courses"
    }),

    slug() {
      return this.$route.params.courses;
    },
    cousesType() {
      return this.slug == "acp"
        ? "ACP"
        : this.slug == "formacoes_profissionais"
        ? "Formações Profissionais"
        : this.slug == "cursos_via_tecnica"
        ? "Cursos da Via Técnica"
        : "Outros";
    },

    cousesId() {
      return this.slug == "acp"
        ? 3
        : this.slug == "formacoes_profissionais"
        ? 2
        : this.slug == "cursos_via_tecnica"
        ? 1
        : 4;
    },
    slug() {
      return this.$route.params.courses;
    }
  },
  methods: {},

  components: {
    FeaturedCoursesSlider: () =>
      import("@/components/frontend/sections/FeaturedCoursesSlider"),
    HomeFooter: () => import("@/components/frontend/sections/HomeFooter"),
    SocialNetwork: () => import("@/components/frontend/sections/SocialNetwork")
  }
};
</script>

<style scoped></style>
