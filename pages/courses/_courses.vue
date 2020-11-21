<template>
  <div class="container m-auto px-3">
    <Row>
      <Col span="24" class="my-5">
        <div class="rounded-lg overflow-hidden shadow-xl border-white border-4">
          <FeaturedCoursesSlider
            :courses="featured_courses"
          ></FeaturedCoursesSlider>
        </div>
      </Col>
    </Row>

    <Row :gutter="16" class="p-5 mb-8 m-2 bg-white shadow-xl rounded-lg">
      <Col span="24" :xs="24" :md="16">
        <div class="flex justify-start items-center w-full mb-8">
          <div
            class="text-gray-600 text-xl uppercase tracking-wider leading-relaxed font-semibold antialiased"
          >
            <span> {{ cousesType }} </span>
            <div class="text-center border-b-4 border-primary w-1/3 mt-2"></div>
          </div>
        </div>

        <template v-for="course in courses">
          <div class="my-4" :key="course.id">
            <GeneralCourseCard :course="course" />
          </div>
        </template>
      </Col>

      <Col span="24" :xs="24" :md="8">
        <div class="bg-gray-200 p-2 rounded-lg">
          Aside
        </div>
      </Col>
    </Row>

    <Row class="p-5 mb-8 m-2 bg-white shadow-xl rounded-lg">
      <Col span="24">
        <div>
          <h2 class="text-gray-600 font-semibold tracking-wide text-center md:text-left">
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
    </Row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SocialNetwork from "@/components/frontend/sections/SocialNetwork";

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
    SocialNetwork
  }
};
</script>

<style scoped></style>
